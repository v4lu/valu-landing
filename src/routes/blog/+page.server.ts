import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { PageServerLoad } from './$types';

type Post = {
	slug: string;
	title: string;
	date: string;
	desc: string;
};

export const load: PageServerLoad = async () => {
	const postsDirectory = join(process.cwd(), 'src/blogs');
	const files = await readdir(postsDirectory);

	const posts: Post[] = await Promise.all(
		files.map(async (file) => {
			const filePath = join(postsDirectory, file);
			await readFile(filePath, 'utf-8');
			const { metadata } = (await import(`../../blogs/${file}`)) as {
				metadata: { title: string; date: string; desc: string };
			};
			return {
				slug: file.replace('.md', ''),
				title: metadata.title,
				date: metadata.date,
				desc: metadata.desc
			};
		})
	);

	return {
		posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	};
};
