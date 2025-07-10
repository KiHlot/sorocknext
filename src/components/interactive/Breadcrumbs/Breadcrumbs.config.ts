export const getArchiveLabel = (slug: string, title?: string) => {
    switch (slug) {
        case 'news':
            return 'Новости';
        case 'video':
            return 'Видео';
        case 'calendar':
            return 'Календарь';
        case 'music':
            return 'Музыка';
        default:
            return title || 'Архив';
    }
};
