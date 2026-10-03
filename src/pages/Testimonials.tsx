import { useEffect, useState } from "react";
import api from "../services/api";

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
      <section className="min-h-[80vh] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-400">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          Client Feedback
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Testimonials
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          What people say about my work and development skills.
        </p>

        {testimonials.length === 0 ? (
          <p className="mt-10 text-gray-500">
            No testimonials available.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                )}

                <p className="mt-5 text-lg leading-8 text-gray-300">
                  “{testimonial.message}”
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <h2 className="font-semibold text-white">
                    {testimonial.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {testimonial.role}
                    {testimonial.company
                      ? ` · ${testimonial.company}`
                      : ""}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;