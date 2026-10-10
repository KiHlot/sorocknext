import { HTMLString, ValueOfT } from '@/types/common';

export interface AboutStatIF {
    value: string;
    label: string;
}

export interface AboutBusinessIF {
    name: string;
    tagline: string;
    siteLabel: string;
    siteUrl: string;
    phone: string;
    phoneHref: string;
    email: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
    mapUrl: string;
    hours: string;
    hoursDateTime: string;
    mapEmbedUrl: string;
}

export interface AboutPromoIF {
    title: string;
    description: HTMLString;
    reviewUrl: string;
    stats: AboutStatIF[];
    business: AboutBusinessIF;
}

export interface AboutTimelineItemIF {
    label: HTMLString;
    title: HTMLString;
    text: HTMLString;
}

export const ABOUT_TEAM_SOC_MODE = {
    Vk: 'vk',
    Instagram: 'in',
    Facebook: 'fb',
    Twitter: 'tw',
    Linkedin: 'li',
    Tiktok: 'tt',
} as const;

export type AboutTeamSocModeT = ValueOfT<typeof ABOUT_TEAM_SOC_MODE>;

export interface AboutTeamSocIF {
    mode: AboutTeamSocModeT;
    link: string;
}

export interface AboutTeamMemberIF {
    fullName: string;
    position: string;
    description: string;
    avatar: string | null;
    uri: string | null;
    soclist: AboutTeamSocIF[] | null;
}

export interface AboutPartnerIF {
    title: string;
    url: string;
}

export interface AboutPartnersIF {
    lead: string;
    items: AboutPartnerIF[];
}

export interface AboutPageDataIF {
    promo: AboutPromoIF;
    history: AboutTimelineItemIF[];
    facts: AboutTimelineItemIF[];
    team: AboutTeamMemberIF[];
    partners: AboutPartnersIF;
}
