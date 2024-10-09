import { readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PageServerLoad } from './$types';
import type { Metadata, Post } from '$lib/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const load: PageServerLoad = async () => {
	const postsDirectory = join(__dirname, '..', 'src', 'blogs');
	console.log('Posts directory:', postsDirectory);

	const files = await readdir(postsDirectory);
	console.log('Files:', files);

	const posts: Post[] = await Promise.all(
		files.map(async (file) => {
			const filePath = join(postsDirectory, file);
			await readFile(filePath, 'utf-8');
			const { metadata } = (await import(`../blogs/${file}`)) as { metadata: Metadata };
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
