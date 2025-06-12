"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navItems } from "./nav-items";
import {
  getActiveStates,
  getMainNavClasses,
  getDropdownItemClasses,
} from "./nav-utils";

interface TabletNavProps {
  isMobileMenuOpen: boolean;
  onMenuClick: () => void;
}

const TabletNav = ({ isMobileMenuOpen, onMenuClick }: TabletNavProps) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex lg:hidden items-center space-x-4">
      {navItems.slice(0, 4).map((item, index) => {
        const { isMainSectionActive, activeDropdownItem } = getActiveStates(
          pathname,
          item
        );

        return (
          <div key={index} className="relative group">
            <Link
              href={item.href}
              className={getMainNavClasses(
                isMainSectionActive,
                "text-[14px] font-semibold text-[#414651] flex items-center whitespace-nowrap relative transition-colors duration-300"
              )}
            >
              {item.label}
              {item.dropdownItems && (
                <ChevronDown
                  className="ml-1 w-3 h-3 transition-transform group-hover:rotate-180"
                  color={isMainSectionActive ? "#EB821D" : "#A4A7AE"}
                  size={12}
                />
              )}
            </Link>

            {item.dropdownItems && (
              <motion.div
                className="absolute left-0 mt-2 w-56 bg-[#FAFAFA] shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="py-2">
                  {item.dropdownItems.map((dropdownItem, dropdownIndex) => {
                    const Icon = dropdownItem.icon;
                    const isDropdownItemActive =
                      activeDropdownItem?.href === dropdownItem.href;

                    return (
                      <Link
                        key={dropdownIndex}
                        href={dropdownItem.href}
                        className={getDropdownItemClasses(
                          isDropdownItemActive,
                          "flex items-center px-4 py-2 text-sm text-[#181D27] font-semibold transition-colors duration-200 relative"
                        )}
                      >
                        <Icon
                          className={`w-4 h-4 mr-3 ${
                            isDropdownItemActive
                              ? "text-sunset-200"
                              : "text-sunset-200"
                          }`}
                        />
                        {dropdownItem.label}
                        {/* Active indicator for dropdown items */}
                        {isDropdownItemActive && (
                          <motion.div
                            className="absolute right-2 w-1.5 h-1.5 bg-sunset-200 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        );
      })}

      <button
        className="p-2 text-[#414651] z-[60] relative"
        onClick={onMenuClick}
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default TabletNav;
