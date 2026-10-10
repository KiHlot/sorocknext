import { IconType } from 'react-icons';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTiktok,
    FaVk,
    FaXTwitter,
} from 'react-icons/fa6';
import { AboutTeamSocModeT } from '@/templates/AboutTPL/AboutTPL.types';

export const ABOUT_TEAM_COPY = {
    titleId: 'about-team-title',
    title: 'Команда sorock.ru',
} as const;

export const ABOUT_TEAM_SOC_LABEL: Record<AboutTeamSocModeT, string> = {
    vk: 'ВКонтакте',
    in: 'Instagram',
    fb: 'Facebook',
    tw: 'Twitter',
    li: 'LinkedIn',
    tt: 'TikTok',
};

export const ABOUT_TEAM_SOC_ICON: Record<AboutTeamSocModeT, IconType> = {
    vk: FaVk,
    in: FaInstagram,
    fb: FaFacebookF,
    tw: FaXTwitter,
    li: FaLinkedinIn,
    tt: FaTiktok,
};
