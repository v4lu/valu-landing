import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { load as yamlLoad } from 'js-yaml';
import type { PageServerLoad } from './$types';
import type { Metadata, Post } from '$lib/types';

export const load: PageServerLoad = async () => {
	const postsDirectory = join(process.cwd(), 'src', 'blogs');
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

	const sortedPosts = posts.sort((a, b) => {
		const parseDate = (dateString: string) => {
			const [day, month, year] = dateString.split('.').map(Number);
			return new Date(year, month - 1, day).getTime();
		};
		return parseDate(b.date) - parseDate(a.date);
	});

	return {
		posts: sortedPosts
	};
};
