import { useEffect, useState } from "react";
import api from "../services/api";

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
      <section className="min-h-[80vh] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-400">Loading blog posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          Articles
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Blog
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Thoughts, tutorials, and insights about web development.
        </p>

        {blogs.length === 0 ? (
          <p className="mt-10 text-gray-500">
            No published blog posts available.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                {blog.coverImage && (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {formatDate(blog.publishedAt || blog.createdAt)}
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    {blog.title}
                  </h2>

                  {blog.excerpt && (
                    <p className="mt-3 leading-7 text-gray-400">
                      {blog.excerpt}
                    </p>
                  )}

                  <button
                    type="button"
                    className="mt-5 text-sm font-medium text-white hover:underline"
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;