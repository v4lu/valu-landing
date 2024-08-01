import WebDesign from './web-design.svelte';
import Softwer from './softwer.svelte';
import Seo from './seo.svelte';
import UI from './ui.svelte';
import SocialMedia from './social-media.svelte';
import DigitalMarketing from './digital-marketing.svelte';
import Logo from './logo.svelte';

export type IconProps = {
	color?: string;
	size?: number | string;
	strokeWidth?: number | string;
	absoluteStrokeWidth?: boolean;
	class?: string;
} & Partial<SVGSVGElement>;

export const Icons = {
	Softwer,
	WebDesign,
	Seo,
	UI,
	SocialMedia,
	DigitalMarketing,
	Logo
};
