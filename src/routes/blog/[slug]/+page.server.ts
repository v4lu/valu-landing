import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { PageServerLoad } from './$types';

type MockPayload = {
	out: string;
	push_element: (payload: MockPayload, tag: string, line: number, col: number) => void;
	pop_element: () => void;
};

type MockImport = {
	push: () => void;
	pop: () => void;
};

type PostModule = {
	metadata: {
		title: string;
		date: string;
		desc: string;
		cover?: string;
	};
	default: (payload: MockPayload, props: Record<string, unknown>, importObject: MockImport) => void;
};

export const load: PageServerLoad = async ({ params }) => {
	const postsDirectory = join(process.cwd(), 'build', 'src', 'blogs');
	const filePath = join(postsDirectory, `${params.slug}.md`);

	const fileContent = await readFile(filePath, 'utf-8');
	const post: PostModule = {
		metadata: JSON.parse(fileContent.split('---')[1]),
		default: new Function('payload', 'props', 'importObject', fileContent.split('---')[2]) as any
	};

	const { title, date, desc, cover } = post.metadata;

	const mockPayload: MockPayload = {
		out: '',
		push_element: (payload: MockPayload, tag: string, line: number, col: number) => {
			if (tag === 'h2' || tag === 'h3') {
				const id = payload.out.split('>').pop()?.toLowerCase().replace(/\W+/g, '-') || '';
				payload.out += `id="${id}" `;
			}
		},
		pop_element: () => {}
	};

	const mockImport: MockImport = {
		push: () => {},
		pop: () => {}
	};

	post.default(mockPayload, {}, mockImport);

	return {
		title,
		date,
		desc,
		content: mockPayload.out,
		cover
	};
};
