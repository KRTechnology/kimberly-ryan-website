import {
  BookOpen,
  Building2,
  FileText,
  GraduationCap,
  History,
  Laptop,
  LayoutGrid,
  PlayCircle,
  User,
  UserCircle,
  Users,
  LifeBuoy,
} from "lucide-react";

export interface DropdownItem {
  label: string;
  href: string;
  icon: any;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "#",
    dropdownItems: [
      {
        label: "HR Advisory",
        href: "/services/hr-advisory",
        icon: BookOpen,
        description: "Strategic HR guidance for business growth",
      },
      {
        label: "Learning & Development",
        href: "/services/learning-development",
        icon: GraduationCap,
        description: "Upskill your workforce with tailored training programs",
      },
      {
        label: "Recruitment & Selection",
        href: "/services/recruitment",
        icon: Users,
        description: "Find and hire the right talent for your organization",
      },
      {
        label: "Outsourcing",
        href: "/services/outsourcing",
        icon: Building2,
        description: "Streamline operations with our expert services",
      },
      // {
      //   label: "HR Management Templates",
      //   href: "/services/templates",
      //   icon: FileText,
      //   description: "Ready-to-use HR documents and templates",
      // },
    ],
  },
  {
    label: "Insights",
    href: "#",
    dropdownItems: [
      {
        label: "Blogs",
        href: "/insights/blogs",
        icon: BookOpen,
        description:
          "The latest industry news and guides curated by our expert team.",
      },
      {
        label: "Case Studies",
        href: "/insights/case-studies",
        icon: History,
        description: "Real-world success stories and client achievements.",
      },
      {
        label: "HR Management Templates",
        href: "/insights/hr-templates",
        icon: FileText,
        description:
          "Ready-to-use HR documents and templates for your organization.",
      },
    ],
  },
  {
    label: "Digital Solutions",
    href: "#",
    dropdownItems: [
      {
        label: "Kracada",
        href: "https://www.kracada.com/",
        icon: Laptop,
        description: "Comprehensive digital platform for modern businesses",
      },
      {
        label: "Kracada TV",
        href: "https://www.youtube.com/@kracada01",
        icon: PlayCircle,
        description: "Interactive learning and entertainment platform",
      },
    ],
  },
  {
    label: "About Us",
    href: "#",
    dropdownItems: [
      {
        label: "Who we are",
        href: "/about/who-we-are",
        icon: User,
        description: "Learn about our mission and values",
      },
      {
        label: "Customer stories",
        href: "/about/customer-stories",
        icon: History,
        description: "Success stories from our valued clients",
      },
      {
        label: "Our People",
        href: "/about/our-people",
        icon: UserCircle,
        description: "Meet the experts behind our success",
      },
      {
        label: "Gallery",
        href: "/about/gallery",
        icon: LayoutGrid,
        description: "Visual showcase of our work and events",
      },
    ],
  },
];
