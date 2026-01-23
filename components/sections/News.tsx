"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, ArrowRight, RefreshCw } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Image from "next/image";

// Type Definitions
interface WPFeaturedMedia {
  source_url: string;
  alt_text?: string;
}

interface WPEmbedded {
  "wp:featuredmedia"?: WPFeaturedMedia[];
}

interface OGImage {
  width: number;
  height: number;
  url: string;
  type: string;
}

interface YoastHeadJson {
  title: string;
  description: string;
  og_image?: OGImage[];
  og_title?: string;
  og_description?: string;
}

interface WPPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  featured_media: number;
  _embedded?: WPEmbedded;
  yoast_head_json?: YoastHeadJson;
}

// Main News Section Component
const NewsSection: React.FC = () => {
  const [publications, setPublications] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://igamingafrika.com/wp-json/wp/v2/posts?tags=3229&categories=20&page=1&per_page=10",
      );
      if (!response.ok) throw new Error("Failed to fetch publications");
      const data: WPPost[] = await response.json();
      setPublications(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stripHtml = (html: string): string => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const loadMore = (): void => {
    setVisibleCount((prev) => Math.min(prev + 3, publications.length));
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16 px-8 bg-green-50 bg-green-50 dark:bg-green-950 border-b-5 border-green-600">
      <div className="container mx-auto">
        <SectionHeader
          title="Event News & Blogs"
          subtitle="Stay updated with the latest news and articles about iGaming AFRIKA Summit 2026 and the industry."
        />

        {loading && (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="w-8 h-8 text-green-600 dark:text-green-500 animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-red-600 dark:text-red-400 mb-4">
              Error loading publications: {error}
            </p>
            <Button onClick={fetchPublications}>Try Again</Button>
          </div>
        )}

        {!loading && !error && (
          <>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              initial="hidden"
              animate="visible"
            >
              {publications.slice(0, visibleCount).map((post) => {
                // Get image URL with fallback priority: yoast_head_json > _embedded
                const imageUrl =
                  post.yoast_head_json?.og_image?.[0]?.url ||
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const imageAlt =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
                  stripHtml(post.title.rendered);

                return (
                  <motion.article
                    key={post.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="group cursor-pointer h-full"
                    onClick={() =>
                      window.open(post.link, "_blank", "noopener,noreferrer")
                    }
                  >
                    <Card key={post.id} className="flex flex-col h-full">
                      {imageUrl && (
                        <div className="w-full h-65 overflow-hidden">
                          <Image
                            width={400}
                            height={250}
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                      )}

                      <div className="p-6 flex flex-col grow">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(post.date)}
                        </div>

                        <h3
                          className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 grow line-clamp-3">
                          {stripHtml(post.excerpt.rendered)}
                        </p>

                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 dark:text-green-500 font-semibold text-sm flex items-center hover:text-green-700 dark:hover:text-green-400 transition-colors"
                        >
                          Read article <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    </Card>
                  </motion.article>
                );
              })}
            </motion.div>

            {visibleCount < publications.length && (
              <motion.div
                className="text-center mt-16 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Button onClick={loadMore} className="flex items-center gap-2">
                  Load More Stories <RefreshCw className="w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {visibleCount >= publications.length && publications.length > 0 && (
              <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center text-gray-500 dark:text-gray-400">
                  <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 mr-3"></div>
                  <span className="text-xs md:text-sm font-medium">
                    You&apos;re all caught up
                  </span>
                  <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 ml-3"></div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
