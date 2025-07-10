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
        case 'publications':
            return 'Публикации';
        case 'sport':
            return 'Спорт';
        default:
            return title || 'Архив';
    }
};
