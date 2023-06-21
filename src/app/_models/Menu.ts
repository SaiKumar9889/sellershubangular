import { AllMenuTabs, InventoryTabs, OrderTabs, ReportTabs } from "./Tabs";

export class Menu {
    routerLink?: string;
    icon?: string;
    menuname?: string;
    haschildrens?: boolean;
    pmenu?: string;
    chaildrens?: Menu[];
    tab?: AllMenuTabs;
    isPremium?: boolean;
    isComingSoon?: boolean;
    isBeta?: boolean;
}