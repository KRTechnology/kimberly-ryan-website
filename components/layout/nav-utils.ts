import { navItems, NavItem, DropdownItem } from "./nav-items";

export interface ActiveStates {
  isMainSectionActive: boolean;
  activeDropdownItem: DropdownItem | null;
}

/**
 * Determines if a main navigation section and its dropdown items are active
 * based on the current pathname
 */
export const getActiveStates = (
  pathname: string,
  navItem: NavItem
): ActiveStates => {
  // Handle exact home match
  if (navItem.href === "/" && pathname === "/") {
    return {
      isMainSectionActive: true,
      activeDropdownItem: null,
    };
  }

  // Skip home for path-based matching
  if (navItem.href === "/") {
    return {
      isMainSectionActive: false,
      activeDropdownItem: null,
    };
  }

  // Check if any dropdown item matches the current path
  if (navItem.dropdownItems) {
    const activeDropdownItem = navItem.dropdownItems.find((item) =>
      pathname.startsWith(item.href)
    );

    if (activeDropdownItem) {
      return {
        isMainSectionActive: true,
        activeDropdownItem,
      };
    }
  }

  return {
    isMainSectionActive: false,
    activeDropdownItem: null,
  };
};

/**
 * Gets the appropriate CSS classes for main navigation items
 */
export const getMainNavClasses = (
  isActive: boolean,
  baseClasses: string,
  activeClasses: string = "text-sunset-200"
): string => {
  return isActive
    ? `${baseClasses} ${activeClasses}`
    : `${baseClasses} hover:text-sunset-200`;
};

/**
 * Gets the appropriate CSS classes for dropdown items
 */
export const getDropdownItemClasses = (
  isActive: boolean,
  baseClasses: string,
  activeClasses: string = "bg-sunset-50 text-sunset-200"
): string => {
  return isActive
    ? `${baseClasses} ${activeClasses}`
    : `${baseClasses} hover:bg-sunset-50 hover:text-sunset-200`;
};
