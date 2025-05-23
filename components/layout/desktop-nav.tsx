import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { navItems } from "./nav-items";

const DesktopNav = () => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      {navItems.map((item, index) => (
        <div key={index} className="relative group">
          <Link
            href={item.href}
            className="text-[16px] font-semibold text-[#414651] hover:text-sunset-200 flex items-center whitespace-nowrap"
          >
            {item.label}
            {item.dropdownItems && (
              <ChevronDown
                className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180"
                color="#A4A7AE"
                size={16}
              />
            )}
          </Link>

          {item.dropdownItems && (
            <motion.div
              className="absolute left-0 mt-2 w-64 bg-[#FAFAFA] shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="py-2">
                {item.dropdownItems.map((dropdownItem, dropdownIndex) => {
                  const Icon = dropdownItem.icon;
                  return (
                    <Link
                      key={dropdownIndex}
                      href={dropdownItem.href}
                      className="flex items-center px-4 py-2 text-sm text-[#181D27] hover:bg-sunset-50 hover:text-sunset-200 font-semibold"
                    >
                      <Icon className="w-5 h-5 mr-3 text-sunset-200" />
                      {dropdownItem.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesktopNav;
