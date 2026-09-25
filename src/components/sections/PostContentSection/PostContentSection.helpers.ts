const MEDIA_TAG = /<(img|iframe|video|audio|embed|object)\b/i;
const TOP_HEADING = /<(\/?)h1\b/gi;

export const hasPostContent = (content?: string | null): content is string => {
    if (!content?.trim()) {
        return false;
    }

    const text = content
        .replaceAll(/<[^>]*>/g, ' ')
        .replaceAll(/&nbsp;|&#160;/gi, ' ')
        .replaceAll(/\s+/g, ' ')
        .trim();

    return Boolean(text) || MEDIA_TAG.test(content);
};

export const normalizePostContent = (content: string): string =>
    content.replaceAll(TOP_HEADING, '<$1h2');
