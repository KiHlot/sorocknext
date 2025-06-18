export const createPaginationData = (
    currentPage: number,
    pagesCount: number,
) => {
    const result: Record<
        string,
        {
            label: number;
            isCurrent: boolean;
        }[]
    > = {
        firstBlock: [],
        centralBlock: [],
        lastBlock: [],
    };

    if (pagesCount <= 10) {
        for (let i = 1; i <= pagesCount; i++) {
            result.firstBlock.push({
                label: i,
                isCurrent: i === currentPage,
            });
        }

        return result;
    }

    if (currentPage <= 5) {
        for (let i = 1; i <= Math.min(currentPage + 2, pagesCount); i++) {
            result.firstBlock.push({
                label: i,
                isCurrent: i === currentPage,
            });
        }
    } else {
        result.firstBlock.push(
            { label: 1, isCurrent: false },
            { label: 2, isCurrent: false },
        );
    }

    if (currentPage >= pagesCount - 1) {
        for (let i = pagesCount - 1; i <= pagesCount; i++) {
            result.lastBlock.push({
                label: i,
                isCurrent: i === currentPage,
            });
        }
    } else {
        result.lastBlock.push(
            { label: pagesCount - 1, isCurrent: false },
            { label: pagesCount, isCurrent: false },
        );
    }

    if (currentPage > 5 && currentPage < pagesCount - 1) {
        result.centralBlock.push(
            { label: currentPage - 1, isCurrent: false },
            { label: currentPage, isCurrent: true },
            { label: currentPage + 1, isCurrent: false },
        );
    }

    return result;
};
