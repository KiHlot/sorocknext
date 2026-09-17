interface PaginationItemIF {
    label: number;
    isCurrent: boolean;
}

const EDGE_PAGES_COUNT = 3;

export const createPaginationData = (
    currentPage: number,
    pagesCount: number,
): PaginationItemIF[][] => {
    const visiblePages = new Set<number>();

    for (let page = 1; page <= Math.min(EDGE_PAGES_COUNT, pagesCount); page++) {
        visiblePages.add(page);
    }

    for (
        let page = Math.max(1, currentPage - 1);
        page <= Math.min(pagesCount, currentPage + 1);
        page++
    ) {
        visiblePages.add(page);
    }

    for (
        let page = Math.max(1, pagesCount - EDGE_PAGES_COUNT + 1);
        page <= pagesCount;
        page++
    ) {
        visiblePages.add(page);
    }

    const sortedPages = [...visiblePages].sort(
        (firstPage, secondPage) => firstPage - secondPage,
    );
    const blocks: PaginationItemIF[][] = [];

    for (const page of sortedPages) {
        const lastBlock = blocks.at(-1);
        const previousPage = lastBlock?.at(-1)?.label;
        const item = {
            label: page,
            isCurrent: page === currentPage,
        };

        if (
            lastBlock !== undefined &&
            previousPage !== undefined &&
            page === previousPage + 1
        ) {
            lastBlock.push(item);
        } else {
            blocks.push([item]);
        }
    }

    return blocks;
};
