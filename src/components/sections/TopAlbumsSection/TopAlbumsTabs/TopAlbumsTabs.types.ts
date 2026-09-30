export interface TopAlbumsTabsPropsIF {
    tabs: string[];
    activeIndex: number;
    baseId: string;
    onSelectTab: (index: number) => void;
}
