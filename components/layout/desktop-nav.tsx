"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { navItems } from "./nav-items";
import {
  getActiveStates,
  getMainNavClasses,
  getDropdownItemClasses,
  isExternalLink,
} from "./nav-utils";

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center space-x-8">
      {navItems.map((item, index) => {
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
                "text-[16px] font-semibold text-[#414651] flex items-center whitespace-nowrap relative transition-colors duration-300"
              )}
            >
              {item.label}
              {item.dropdownItems && (
                <ChevronDown
                  className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180"
                  color={isMainSectionActive ? "#EB821D" : "#A4A7AE"}
                  size={16}
                />
              )}
            </Link>

            {item.dropdownItems && (
              <motion.div className="absolute left-0 mt-2 w-64 bg-[#FAFAFA] shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
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
                        target={
                          isExternalLink(dropdownItem.href)
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          isExternalLink(dropdownItem.href)
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        <Icon
                          className={`w-5 h-5 mr-3 ${
                            isDropdownItemActive
                              ? "text-sunset-200"
                              : "text-sunset-200"
                          }`}
                        />
                        {dropdownItem.label}
                        {/* Active indicator for dropdown items */}
                        {isDropdownItemActive && (
                          <motion.div
                            className="absolute right-2 w-2 h-2 bg-sunset-200 rounded-full"
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
    </div>
  );
};

export default DesktopNav;
