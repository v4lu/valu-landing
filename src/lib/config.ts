import { Icons } from './components/icons';

export const features = [
	{
		Icon: Icons.WebDesign,
		title: 'Web Design',
		desc: 'Create stunning websites that adapt seamlessly to all devices, ensuring an optimal user experience.'
	},
	{
		Icon: Icons.Softwer,
		title: 'Custom Software Solutions',
		desc: 'Develop tailor-made software applications to streamline your business processes and boost efficiency.'
	},
	{
		Icon: Icons.SocialMedia,
		title: 'Social Media Management',
		desc: 'Strategically manage and grow your social media presence to enhance brand awareness and customer engagement.'
	},
	{
		Icon: Icons.Seo,
		title: 'SEO Optimization',
		desc: 'Improve your online visibility and drive organic traffic with our expert search engine optimization strategies.'
	},
	{
		Icon: Icons.DigitalMarketing,
		title: 'Digital Marketing',
		desc: 'Create and execute comprehensive digital marketing campaigns to enhance your brand presence and engage customers.'
	},
	{
		Icon: Icons.UI,
		title: 'UI/UX Design',
		desc: 'Craft intuitive and visually appealing user interfaces to enhance user engagement and satisfaction.'
	}
];

type Project = {
	image: string;
	title: string;
	description: string;
	link: string;
};

export const projects: Project[] = [
	{
		title: 'Vemeet Vegan Social Media',
		description:
			'Connect with fellow vegans and discover new plant-based recipes,restraunts, be part of the vegan community.',
		image: './projects/vemeet.webp',
		link: 'https://vemeet.me'
	},
	{
		title: 'Developer Portfolio',
		description: 'Personal portfolio website showcasing projects, skills, and experience.',
		image: './projects/portfolio.webp',
		link: 'https://lukabrx.dev'
	},
	{
		title: 'TBD Issue Automation Tool',
		description:
			'Currently in development, tool which alows users to be more productive by automating repetitive tasks.',
		image: './projects/project.webp',
		link: 'https://app.valu-media.com'
	},
	{
		title: 'Elysian Eden Vegan Blog',
		description: 'Persoonal blog about veganism, plant-based recipes, and vegan lifestyle.',
		link: 'https://elysianeden.de',
		image: './projects/ee.webp'
	}
];
