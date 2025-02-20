import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { load as yamlLoad } from 'js-yaml';
import { Resend } from 'resend';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Metadata, Post } from '$lib/types';
import { SECRET_RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(SECRET_RESEND_API_KEY);

export const load: PageServerLoad = async () => {
	const postsDirectory = join(process.cwd(), 'build', 'src', 'blogs');
	// const postsDirectory = join('src', 'blogs');

	const files = await readdir(postsDirectory);

	const posts: Post[] = await Promise.all(
		files.map(async (file) => {
			const filePath = join(postsDirectory, file);
			const content = await readFile(filePath, 'utf-8');
			const [, frontmatter] = content.split('---');
			const metadata = yamlLoad(frontmatter.trim()) as Metadata;
			return {
				slug: file.replace('.md', ''),
				title: metadata.title,
				date: metadata.date,
				desc: metadata.desc,
				path: `/blog/${file.slice(0, -3)}`,
				coverImage: metadata.cover
			};
		})
	);

	const sortedPosts = posts
		.sort((a, b) => {
			const parseDate = (dateString: string) => {
				const [day, month, year] = dateString.split('.').map(Number);
				return new Date(year, month - 1, day).getTime();
			};
			return parseDate(b.date) - parseDate(a.date);
		})
		.slice(0, 5);

	return {
		posts: sortedPosts
	};
};

export const actions = {
	contact: async ({ request }) => {
		try {
			const data = await request.formData();

			const firstName = data.get('first-name');
			const lastName = data.get('last-name');
			const email = data.get('email');
			const message = data.get('message');

			await resend.emails.send({
				from: 'Work <newoffer@valu-media.com>',
				to: ['lukabrkovic@proton.me'],
				subject: email?.toString() || 'New message from website',
				text: `Message from ${firstName} (${lastName}):
            ${message}`
			});

			await resend.emails.send({
				from: 'Thank you for contacting us <info@valu-media.com>',
				to: [email?.toString() || ''],
				subject: 'Thank you for contacting us',
				text: `Hello ${firstName} ${lastName},\n\nThank you for contacting us. We will get back to you as soon as possible.\n\nBest regards,\nValu Media`
			});

			return { success: true };
		} catch (error) {
			console.error('Form submission error:', error);
			return fail(500, {
				success: false,
				message: 'Failed to submit form'
			});
		}
	},
	newsletter: async ({ request }) => {
		try {
			const data = await request.formData();

			const email = data.get('email');

			resend.contacts.create({
				email: email?.toString() || '',
				firstName: 'Steve',
				lastName: 'Wozniak',
				unsubscribed: false,
				audienceId: 'cf5982f4-cd44-47e9-acd7-6c28b1ae7103'
			});
		} catch (error) {
			console.error('Form submission error:', error);
			return fail(500, {
				success: false,
				message: 'Failed to submit form'
			});
		}
	}
} satisfies Actions;
