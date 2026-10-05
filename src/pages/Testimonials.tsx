import { useEffect, useState } from "react";
import api from "../services/api";
import { ArrowUpRight, Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  message: string;
  image: string | null;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get("/testimonials");
        setTestimonials(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
          <div className="mt-5 h-12 w-80 animate-pulse rounded bg-white/10" />
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
              Recommendations
            </p>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            Testimonials
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Feedback and recommendations from people I have worked with
            throughout my development journey.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-gray-500">
              No testimonials available.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
              >
                {/* Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                    <Quote
                      size={20}
                      className="text-gray-300"
                    />
                  </div>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        fill="currentColor"
                        className="text-gray-500"
                      />
                    ))}
                  </div>
                </div>

                {/* Message */}
                <p className="mt-7 flex-1 text-base leading-7 text-gray-300">
                  “{testimonial.message}”
                </p>

                {/* Person */}
                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-gray-300">
                      {testimonial.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-white">
                      {testimonial.name}
                    </h2>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {testimonial.role}
                      {testimonial.company
                        ? ` · ${testimonial.company}`
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Hover Arrow */}
                <ArrowUpRight
                  size={18}
                  className="absolute bottom-7 right-7 text-gray-600 opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gray-300 group-hover:opacity-100"
                />
              </article>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                Let&apos;s work together
              </p>

              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                Have a project in mind?
              </h2>

              <p className="mt-3 max-w-2xl text-gray-400">
                I&apos;m always interested in building meaningful digital
                products and solving real-world problems.
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

export default Testimonials;