import { ReactElement } from 'react';
import {
    IoAlbumsOutline,
    IoAmericanFootballOutline,
    IoBulbOutline,
    IoCalendarOutline,
    IoCreateOutline,
    IoDiscOutline,
    IoFilmOutline,
    IoFlameOutline,
    IoFlashOutline,
    IoGameControllerOutline,
    IoHappyOutline,
    IoListOutline,
    IoMegaphoneOutline,
    IoMicOutline,
    IoMusicalNoteOutline,
    IoPeopleOutline,
    IoPlayCircleOutline,
    IoRadioOutline,
    IoStarOutline,
    IoTicketOutline,
} from 'react-icons/io5';
import {
    PostTypeTermConfigIF,
    PostTypeTermsConfigIF,
} from '@/configs/postTypeTerms/postTypeTerms.types';
import { PostTypeT } from '@/configs/postTypes.config';
import { CUSTOM_TAXONOMIES } from '@/configs/taxonomies.config';

const articleTerms = CUSTOM_TAXONOMIES.article_cat.terms;
const musicTerms = CUSTOM_TAXONOMIES.music_cat.terms;
const newsTerms = CUSTOM_TAXONOMIES.news_cat.terms;
const videoTerms = CUSTOM_TAXONOMIES.video_cat.terms;

const createPostTypeTerm = (
    postType: PostTypeT,
    slug: string,
    label: string,
    icon: ReactElement,
): PostTypeTermConfigIF => ({
    link: {
        label,
        url: `/${postType}/${slug}`,
    },
    icon,
});

export const POST_TYPE_TERMS: PostTypeTermsConfigIF = {
    article: {
        interview: createPostTypeTerm(
            'article',
            'interview',
            articleTerms.interview,
            <IoMicOutline />,
        ),
        review: createPostTypeTerm(
            'article',
            'review',
            articleTerms.review,
            <IoCreateOutline />,
        ),
        sport: createPostTypeTerm(
            'article',
            'sport',
            articleTerms.sport,
            <IoAmericanFootballOutline />,
        ),
        game: createPostTypeTerm(
            'article',
            'game',
            articleTerms.game,
            <IoGameControllerOutline />,
        ),
        fact: createPostTypeTerm(
            'article',
            'fact',
            articleTerms.fact,
            <IoBulbOutline />,
        ),
        entertaining: createPostTypeTerm(
            'article',
            'entertaining',
            articleTerms.entertaining,
            <IoHappyOutline />,
        ),
        event: createPostTypeTerm(
            'article',
            'event',
            articleTerms.event,
            <IoCalendarOutline />,
        ),
        advertising: createPostTypeTerm(
            'article',
            'advertising',
            articleTerms.advertising,
            <IoMegaphoneOutline />,
        ),
    },
    music: {
        album: createPostTypeTerm(
            'music',
            'album',
            musicTerms.album,
            <IoDiscOutline />,
        ),
        single: createPostTypeTerm(
            'music',
            'single',
            musicTerms.single,
            <IoMusicalNoteOutline />,
        ),
        ep: createPostTypeTerm(
            'music',
            'ep',
            musicTerms.ep,
            <IoAlbumsOutline />,
        ),
        playlist: createPostTypeTerm(
            'music',
            'playlist',
            musicTerms.playlist,
            <IoListOutline />,
        ),
        live: createPostTypeTerm(
            'music',
            'live',
            musicTerms.live,
            <IoRadioOutline />,
        ),
    },
    news: {
        society: createPostTypeTerm(
            'news',
            'society',
            newsTerms.society,
            <IoPeopleOutline />,
        ),
        sport: createPostTypeTerm(
            'news',
            'sport',
            newsTerms.sport,
            <IoAmericanFootballOutline />,
        ),
        celebrities: createPostTypeTerm(
            'news',
            'celebrities',
            newsTerms.celebrities,
            <IoStarOutline />,
        ),
        interesting: createPostTypeTerm(
            'news',
            'interesting',
            newsTerms.interesting,
            <IoFlashOutline />,
        ),
        advertisement: createPostTypeTerm(
            'news',
            'advertisement',
            newsTerms.advertisement,
            <IoMegaphoneOutline />,
        ),
    },
    video: {
        clip: createPostTypeTerm(
            'video',
            'clip',
            videoTerms.clip,
            <IoPlayCircleOutline />,
        ),
        concert: createPostTypeTerm(
            'video',
            'concert',
            videoTerms.concert,
            <IoTicketOutline />,
        ),
        live: createPostTypeTerm(
            'video',
            'live',
            videoTerms.live,
            <IoRadioOutline />,
        ),
        film: createPostTypeTerm(
            'video',
            'film',
            videoTerms.film,
            <IoFilmOutline />,
        ),
        cool: createPostTypeTerm(
            'video',
            'cool',
            videoTerms.cool,
            <IoFlameOutline />,
        ),
    },
};

export const getPostTypeTerm = (
    postType: PostTypeT,
    termSlug: string,
): PostTypeTermConfigIF | null => {
    if (!(postType in POST_TYPE_TERMS)) {
        return null;
    }

    const terms = POST_TYPE_TERMS[postType as keyof PostTypeTermsConfigIF];

    if (!(termSlug in terms)) {
        return null;
    }

    return terms[termSlug as keyof typeof terms];
};
