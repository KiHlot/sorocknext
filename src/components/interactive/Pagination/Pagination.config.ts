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
        for (let index = 1; index <= pagesCount; index++) {
            result.firstBlock.push({
                label: index,
                isCurrent: index === currentPage,
            });
        }

        return result;
    }

    if (currentPage <= 5) {
        for (
            let index = 1;
            index <= Math.min(currentPage + 2, pagesCount);
            index++
        ) {
            result.firstBlock.push({
                label: index,
                isCurrent: index === currentPage,
            });
        }
    } else {
        result.firstBlock.push(
            { label: 1, isCurrent: false },
            { label: 2, isCurrent: false },
        );
    }

    if (currentPage >= pagesCount - 1) {
        for (let index = pagesCount - 1; index <= pagesCount; index++) {
            result.lastBlock.push({
                label: index,
                isCurrent: index === currentPage,
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
