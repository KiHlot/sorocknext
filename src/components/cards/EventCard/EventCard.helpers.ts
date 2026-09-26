export const toExcerpt = (content: string): string =>
    content
        .replaceAll(/<[^>]*>/g, ' ')
        .replaceAll(/\s+/g, ' ')
        .trim();
