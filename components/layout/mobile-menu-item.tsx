"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem } from "./nav-items";
import { getActiveStates } from "./nav-utils";

interface MobileMenuItemProps {
  item: NavItem;
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick: () => void;
}

const MobileMenuItem = ({
  item,
  isExpanded,
  onToggle,
  onItemClick,
}: MobileMenuItemProps) => {
  const pathname = usePathname();
  const { isMainSectionActive, activeDropdownItem } = getActiveStates(
    pathname,
    item
  );

  return (
    <div className="border-b border-gray-100 pb-4">
      {item.dropdownItems ? (
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={onToggle}
        >
          <span
            className={`text-lg font-semibold ${
              isMainSectionActive ? "text-sunset-200" : "text-[#181D27]"
            }`}
          >
            {item.label}
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-180" : ""
            } ${isMainSectionActive ? "text-sunset-200" : "text-gray-400"}`}
          />
        </button>
      ) : (
        <Link
          href={item.href}
          className={`text-lg font-semibold block ${
            isMainSectionActive ? "text-sunset-200" : "text-[#181D27]"
          }`}
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      )}

      <AnimatePresence>
        {item.dropdownItems && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pl-4 pt-4">
              {item.dropdownItems.map((dropdownItem, dropdownIndex) => {
                const Icon = dropdownItem.icon;
                const isDropdownItemActive =
                  activeDropdownItem?.href === dropdownItem.href;

                return (
                  <Link
                    key={dropdownIndex}
                    href={dropdownItem.href}
                    className={`flex items-start text-sm transition-colors duration-200 relative ${
                      isDropdownItemActive
                        ? "text-sunset-200"
                        : "text-[#181D27] hover:text-sunset-200"
                    }`}
                    onClick={onItemClick}
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                        isDropdownItemActive
                          ? "text-sunset-200"
                          : "text-sunset-200"
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          isDropdownItemActive ? "text-sunset-200" : ""
                        }`}
                      >
                        {dropdownItem.label}
                      </p>
                      <p className="text-[#4B5563] mt-1 text-xs">
                        {dropdownItem.description}
                      </p>
                    </div>
                    {/* Active indicator for dropdown items */}
                    {isDropdownItemActive && (
                      <motion.div
                        className="w-2 h-2 bg-sunset-200 rounded-full mt-1.5 ml-2 flex-shrink-0"
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
      </AnimatePresence>
    </div>
  );
};

export default MobileMenuItem;
