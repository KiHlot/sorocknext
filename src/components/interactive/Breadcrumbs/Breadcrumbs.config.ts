export const getArchiveLabel = (slug: string, title?: string) => {
    switch (slug) {
        case 'news':
            return 'Новости';
        case 'video':
            return 'Видео';
        default:
            return title || 'Архив';
    }
};
