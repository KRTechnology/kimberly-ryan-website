import BlogDetail from "@/components/specific/blog-detail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// This would typically come from a database or CMS
const blogArticles = [
  {
    id: 1,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image: "/images/blog-image-one.jpg",
    author: "Olivia Rhye",
    date: "20 Jan 2025",
    category: "Design",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis. At samyuern felis aliquam felis, scelerisque aliquam pellentesque posuere lorem amet, natoque nulla duis. At samyuern felis rutrum etiam a fugit.",
      sections: [
        {
          title: "Introduction",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis. At samyuern felis aliquam felis, scelerisque aliquam pellentesque posuere lorem amet, natoque nulla duis. At samyuern felis rutrum etiam a fugit.",
          image: "/images/blog-info-image-one.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Software and tools",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
        },
        {
          title: "Other resources",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-two.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
      ],
      quote: {
        text: "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.",
        author: "Olivia Rhye",
        title: "Product Designer",
      },
    },
  },
  {
    id: 2,
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    image: "/images/blog-image-two.jpg",
    author: "Phoenix Baker",
    date: "19 Jan 2025",
    category: "Design",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "Getting Started",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-one.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Migration Process",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "Linear has transformed how we manage our development workflow and improved our team's productivity significantly.",
        author: "Phoenix Baker",
        title: "Software Engineer",
      },
    },
  },
  {
    id: 3,
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    image: "/images/blog-image-three.png",
    author: "Lana Steiner",
    date: "18 Jan 2025",
    category: "Design",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "API Design Principles",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-two.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Testing and Documentation",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "A well-designed API is the foundation of any modern application architecture.",
        author: "Lana Steiner",
        title: "API Architect",
      },
    },
  },
  {
    id: 4,
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Learn ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/blog-image-four.jpg",
    author: "Alec Whitten",
    date: "17 Jan 2025",
    category: "Design",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis. At samyuern felis aliquam felis, scelerisque aliquam pellentesque posuere lorem amet, natoque nulla duis. At samyuern felis rutrum etiam a fugit.",
      sections: [
        {
          title: "Introduction",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis. At samyuern felis aliquam felis, scelerisque aliquam pellentesque posuere lorem amet, natoque nulla duis. At samyuern felis rutrum etiam a fugit.",
          image: "/images/blog-info-image-one.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Software and tools",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
        },
        {
          title: "Other resources",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-three.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
      ],
      quote: {
        text: "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.",
        author: "Olivia Rhye",
        title: "Product Designer",
      },
    },
  },
  {
    id: 5,
    title: "PM mental models",
    description:
      "Mental models are simple expressions of complex processes or relationships.",
    image: "/images/blog-image-five.jpg",
    author: "Demi Wilkinson",
    date: "16 Jan 2025",
    category: "Design",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "Understanding Mental Models",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-one.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Practical Applications",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "The best product managers use mental models to simplify complex decisions and communicate effectively.",
        author: "Demi Wilkinson",
        title: "Product Manager",
      },
    },
  },
  {
    id: 6,
    title: "What is wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    image: "/images/blog-image-six.jpg",
    author: "Candice Wu",
    date: "15 Jan 2025",
    category: "Design",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "Wireframing Basics",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-two.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Best Practices",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "Wireframes are the blueprint of digital experiences, providing structure before visual design.",
        author: "Candice Wu",
        title: "UX Designer",
      },
    },
  },
  {
    id: 7,
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.",
    image: "/images/blog-image-seven.jpg",
    author: "Natali Craig",
    date: "14 Jan 2025",
    category: "Design",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "Building Team Culture",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-three.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Collaboration Tools",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "Great design happens when diverse perspectives come together with a shared vision.",
        author: "Natali Craig",
        title: "Design Lead",
      },
    },
  },
  {
    id: 8,
    title: "Our top 10 Javascript frameworks to use",
    description:
      "JavaScript frameworks make development easier with extensive features and functionalities.",
    image: "/images/blog-image-eight.jpg",
    author: "Drew Cano",
    date: "13 Jan 2025",
    category: "Design",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "Framework Comparison",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-one.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Performance Considerations",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "The right framework choice can make or break your development experience and project success.",
        author: "Drew Cano",
        title: "Frontend Developer",
      },
    },
  },
  {
    id: 9,
    title: "Advanced React Patterns",
    description:
      "Explore advanced React patterns and techniques for building scalable applications.",
    image: "/images/blog-image-one.jpg",
    author: "Sarah Johnson",
    date: "12 Jan 2025",
    category: "Software Development",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "Component Patterns",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-two.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "State Management",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "Advanced React patterns help us build more maintainable and scalable applications.",
        author: "Sarah Johnson",
        title: "React Developer",
      },
    },
  },
  {
    id: 10,
    title: "Customer Success Strategies",
    description:
      "Proven strategies to increase customer satisfaction and retention rates.",
    image: "/images/blog-image-two.jpg",
    author: "Michael Chen",
    date: "11 Jan 2025",
    category: "Customer Success",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "Customer Onboarding",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-three.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Retention Metrics",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "Customer success is not a department, it's a company-wide commitment to customer value.",
        author: "Michael Chen",
        title: "Customer Success Manager",
      },
    },
  },
  {
    id: 11,
    title: "Product Management Best Practices",
    description:
      "Essential practices every product manager should know and implement.",
    image: "/images/blog-image-three.png",
    author: "Emily Rodriguez",
    date: "10 Jan 2025",
    category: "Product",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "Product Strategy",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-one.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "User Research",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "Great products are built on deep customer understanding and clear strategic vision.",
        author: "Emily Rodriguez",
        title: "Product Manager",
      },
    },
  },
  {
    id: 12,
    title: "Design System Implementation",
    description:
      "How to build and maintain consistent design systems across teams.",
    image: "/images/blog-image-four.jpg",
    author: "Alex Thompson",
    date: "09 Jan 2025",
    category: "Design",
    content: {
      introduction:
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
      sections: [
        {
          title: "System Architecture",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, natoque nulla duis.",
          image: "/images/blog-info-image-two.jpg",
          imageCaption: "Image courtesy of Unsplash from the Ziploc",
        },
        {
          title: "Team Adoption",
          content:
            "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.",
        },
      ],
      quote: {
        text: "A well-implemented design system is the foundation of consistent and scalable user experiences.",
        author: "Alex Thompson",
        title: "Design Systems Lead",
      },
    },
  },
];

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const article = blogArticles.find(
    (article) => article.id === parseInt(params.id)
  );

  if (!article) {
    return {
      title: "Blog Not Found - Kimberly-Ryan Limited",
    };
  }

  return {
    title: `${article.title} - Kimberly-Ryan Limited`,
    description: article.description,
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const article = blogArticles.find(
    (article) => article.id === parseInt(params.id)
  );

  if (!article) {
    notFound();
  }

  return (
    <main>
      <BlogDetail article={article} />
    </main>
  );
}
