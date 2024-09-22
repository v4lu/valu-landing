import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await import(`../../../blogs/${params.slug}.md`);
	const { title, date, desc, cover } = post.metadata;

	const mockPayload = {
		out: '',
		push_element: () => {},
		pop_element: () => {}
	};

	const mockImport = {
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
