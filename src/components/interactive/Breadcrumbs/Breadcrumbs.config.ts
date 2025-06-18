export const getArchiveLabel = (slug: string, title?: string) => {
    switch (slug) {
        case 'news':
            return 'Новости';
        default:
            return title || 'Архив';
    }
};
