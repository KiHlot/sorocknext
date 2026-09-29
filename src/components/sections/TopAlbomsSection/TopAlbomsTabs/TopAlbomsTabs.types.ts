export interface TopAlbomsTabsPropsIF {
    tabs: string[];
    activeIndex: number;
    baseId: string;
    onSelectTab: (index: number) => void;
}
