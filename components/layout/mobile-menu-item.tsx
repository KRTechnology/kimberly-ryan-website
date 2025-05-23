import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NavItem } from "./nav-items";

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
  return (
    <div className="border-b border-gray-100 pb-4">
      {item.dropdownItems ? (
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={onToggle}
        >
          <span className="text-lg font-semibold text-[#181D27]">
            {item.label}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <Link
          href={item.href}
          className="text-lg font-semibold text-[#181D27] block"
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
                return (
                  <Link
                    key={dropdownIndex}
                    href={dropdownItem.href}
                    className="flex items-start text-sm text-[#181D27] hover:text-sunset-200"
                    onClick={onItemClick}
                  >
                    <Icon className="w-5 h-5 mr-3 text-sunset-200 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{dropdownItem.label}</p>
                      <p className="text-[#4B5563] mt-1 text-xs">
                        {dropdownItem.description}
                      </p>
                    </div>
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
