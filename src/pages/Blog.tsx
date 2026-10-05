import { useEffect, useState } from "react";
import api from "../services/api";
import { ArrowUpRight, CalendarDays, FileText } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blogs");

        const publishedBlogs = (response.data?.data || []).filter(
          (blog: BlogPost) => blog.published
        );

        setBlogs(publishedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="h-5 w-32 animate-pulse rounded bg-white/10" />
          <div className="mt-5 h-12 w-60 animate-pulse rounded bg-white/10" />
          <div className="mt-5 h-5 w-full max-w-xl animate-pulse rounded bg-white/10" />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-white/40" />

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
              Knowledge & Insights
            </p>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            Blog
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Thoughts, tutorials, and practical insights from my journey
            building modern web applications.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-500" />

              <p className="text-gray-500">
                No published blog posts available.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
              >
                {/* Cover Image */}
                <div className="relative overflow-hidden">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-white/[0.04]">
                      <FileText
                        size={40}
                        strokeWidth={1.2}
                        className="text-gray-600"
                      />
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                    <CalendarDays size={14} />

                    <span>
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </span>
                  </div>

                  <h2 className="mt-4 line-clamp-2 text-xl font-semibold leading-7 text-white transition group-hover:text-gray-200">
                    {blog.title}
                  </h2>

                  {blog.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                      {blog.excerpt}
                    </p>
                  )}

                  <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition"
                  >
                    Read More
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                Stay curious
              </p>

              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                Building, learning, and sharing.
              </h2>

              <p className="mt-3 max-w-2xl text-gray-400">
                I believe that sharing what I learn is one of the best ways
                to grow as a developer.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Let&apos;s Connect
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;