import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await import(`../../../blogs/${params.slug}.md`);
	const { title, date } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date
	};
};
