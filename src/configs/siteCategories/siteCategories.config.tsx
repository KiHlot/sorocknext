import CalendarIcon from '@/images/svg/ico_calendar.svg';
import ClapperIcon from '@/images/svg/ico_clapperboard.svg';
import EarthIcon from '@/images/svg/ico_earth.svg';
import HeadphonesIcon from '@/images/svg/ico_headphones.svg';
import MicrophoneIcon from '@/images/svg/ico_microphone.svg';
import PlayerIcon from '@/images/svg/ico_player_tripple.svg';
import TicketIcon from '@/images/svg/ico_ticket.svg';
import { SiteCategoriesT } from '@/configs/siteCategories/siteCategories.types';

export const SITE_CATEGORIES: SiteCategoriesT = {
    rock_date_rub: {
        link: {
            label: 'Рок-дата',
            url: '/rock-data',
        },
        icon: <CalendarIcon />,
    },
    alboms_rub: {
        link: {
            label: 'Альбомы',
            url: '/music/album',
        },
        icon: <HeadphonesIcon />,
    },
    interview_rub: {
        link: {
            label: 'Интервью',
            url: '/article/interview',
        },
        icon: <MicrophoneIcon />,
    },
    clips_rub: {
        link: {
            label: 'Клипы',
            url: '/video/clip',
        },
        icon: <PlayerIcon />,
    },
    concert_rub: {
        link: {
            label: 'Концерты',
            url: '/video/concert',
        },
        icon: <TicketIcon />,
    },
    okolorock_rub: {
        link: {
            label: 'Околорок',
            url: '/okolorock',
        },
        icon: <EarthIcon />,
    },
    rock_film: {
        link: {
            label: 'Рок-фильмы',
            url: '/video/film',
        },
        icon: <ClapperIcon />,
    },
} as const;
