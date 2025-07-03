import { Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { XIcon } from "../common/custom-icons/x";
import { FooterBlogPost } from "@/types/sanity";

interface FooterProps {
  footerBlogPosts?: FooterBlogPost[];
}

const Footer = ({ footerBlogPosts = [] }: FooterProps) => {
  const services = [
    { name: "HR Advisory", href: "/services/hr-advisory" },
    { name: "Learning & Development", href: "/services/learning-development" },
    { name: "Recruitment Solutions", href: "/services/recruitment" },
    { name: "Outsourcing", href: "/services/outsourcing" },
    { name: "Careers", href: "/services/careers" },
  ];

  const solutions = [
    { name: "Kracada Web", href: "https://www.kracada.com/" },
    { name: "KRISHR", href: "/solutions/krishr" },
    { name: "Kracada TV", href: "https://www.youtube.com/@kracada01" },
    { name: "Support", href: "/solutions/support" },
  ];

  return (
    <footer className="bg-[#1B0E03] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/kr-logo-white.svg"
                alt="Kimberly Ryan Logo"
                width={150}
                height={40}
                // className="invert"
              />
            </Link>
            <p className="text-sm text-gray-300">
              Kimberly Ryan - At the forefront of innovative HR solutions.
            </p>
            <div className="space-y-2">
              <p className="text-sm">Phone: +234(0)9135827236</p>
              <p className="text-sm">Email: info@kimberly-ryan.com</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">OUR SERVICES</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-lg font-semibold mb-4">INSIGHTS</h3>
            <ul className="space-y-2">
              {footerBlogPosts.map((post) => (
                <li key={post._id}>
                  <Link
                    href={`/insights/blogs/${post.slug.current}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {post.footerName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Digital Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">DIGITAL SOLUTIONS</h3>
            <ul className="space-y-2">
              {solutions.map((solution, index) => (
                <li key={index}>
                  <Link
                    href={solution.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 KIMBERLY RYAN LIMITED, ALL RIGHTS RESERVED
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {/* <Twitter size={20} /> */}
                <XIcon size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
