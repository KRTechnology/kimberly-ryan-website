import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "./nav-items";
import MobileMenuItem from "./mobile-menu-item";

interface MobileMenuProps {
  isOpen: boolean;
  expandedSections: string[];
  onToggleSection: (sectionLabel: string) => void;
  onClose: () => void;
}

const MobileMenu = ({
  isOpen,
  expandedSections,
  onToggleSection,
  onClose,
}: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto"
          style={{ paddingTop: "80px" }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-6">
              {navItems.map((item, index) => (
                <MobileMenuItem
                  key={index}
                  item={item}
                  isExpanded={expandedSections.includes(item.label)}
                  onToggle={() => onToggleSection(item.label)}
                  onItemClick={onClose}
                />
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/consultation"
                className="w-full block text-center px-6 py-3 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300 font-semibold"
                onClick={onClose}
              >
                Schedule a consultation
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
