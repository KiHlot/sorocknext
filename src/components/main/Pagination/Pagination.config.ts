import { PaginationButtonIF } from '@/components/main/Pagination/PaginationButton/PaginationButton.types';

export const createPaginationData = (
    currentPage: number,
    pagesCount: number,
) => {
    const result: Record<string, PaginationButtonIF[]> = {
        firstBlock: [],
        centralBlock: [],
        lastBlock: [],
    };

    // Если текущая страница в начале (1-5)
    if (currentPage <= 5) {
        for (let i = 1; i <= Math.min(currentPage + 2, pagesCount); i++) {
            result.firstBlock.push({
                label: i,
                isCurrent: i === currentPage,
            });
        }
    } else {
        // Добавляем первые две страницы
        result.firstBlock.push(
            { label: 1, isCurrent: false },
            { label: 2, isCurrent: false },
        );
    }

    // Если текущая страница в конце (последние 2 страницы)
    if (currentPage >= pagesCount - 1) {
        for (let i = pagesCount - 1; i <= pagesCount; i++) {
            result.lastBlock.push({
                label: i,
                isCurrent: i === currentPage,
            });
        }
    } else {
        // Добавляем последние две страницы
        result.lastBlock.push(
            { label: pagesCount - 1, isCurrent: false },
            { label: pagesCount, isCurrent: false },
        );
    }

    // Если текущая страница в середине (больше 5 и меньше последних двух)
    if (currentPage > 5 && currentPage < pagesCount - 1) {
        result.centralBlock.push(
            { label: currentPage - 1, isCurrent: false },
            { label: currentPage, isCurrent: true },
            { label: currentPage + 1, isCurrent: false },
        );
    }

    return result;
};
