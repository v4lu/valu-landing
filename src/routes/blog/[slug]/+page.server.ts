import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { load as yamlLoad } from 'js-yaml';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';

type Metadata = {
	title: string;
	date: string;
	desc: string;
	cover?: string;
};

export const load: PageServerLoad = async ({ params }) => {
	const postsDirectory = join(process.cwd(), 'build', 'src', 'blogs');
	// const postsDirectory = join(process.cwd(), 'src', 'blogs');
	const filePath = join(postsDirectory, `${params.slug}.md`);

	const fileContent = await readFile(filePath, 'utf-8');
	const [, frontmatter, content] = fileContent.split('---');

	try {
		const metadata = yamlLoad(frontmatter.trim()) as Metadata;
		const { title, date, desc, cover } = metadata;

		// Parse the markdown content
		const htmlContent = marked(content.trim());

		return {
			title,
			date,
			desc,
			content: htmlContent,
			cover
		};
	} catch (error) {
		console.error('Error parsing frontmatter:', error);
		console.log('Frontmatter content:', frontmatter);
		throw error;
	}
};
