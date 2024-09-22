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
	const post: PostModule = await import(`../../../blogs/${params.slug}.md`);
	const { title, date, desc, cover } = post.metadata;

	const mockPayload: MockPayload = {
		out: '',
		push_element: (payload: MockPayload, tag: string, line: number, col: number) => {
			if (tag === 'h2' || tag === 'h3') {
				const id =
					payload.out
						.split('>')
						.pop()
						?.toLowerCase()
						.replace(/[^\w]+/g, '-') || '';
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
