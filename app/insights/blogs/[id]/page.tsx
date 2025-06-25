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
