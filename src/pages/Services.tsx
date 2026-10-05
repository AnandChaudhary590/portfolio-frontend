import { useEffect, useState } from "react";
import api from "../services/api";
import {
  ArrowUpRight,
  Code2,
  Database,
  Globe2,
  Layers3,
  Server,
  Sparkles,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceIcon = (title: string) => {
    const value = title.toLowerCase();

    if (
      value.includes("frontend") ||
      value.includes("react") ||
      value.includes("ui")
    ) {
      return Code2;
    }

    if (
      value.includes("backend") ||
      value.includes("api") ||
      value.includes("server")
    ) {
      return Server;
    }

    if (
      value.includes("database") ||
      value.includes("data")
    ) {
      return Database;
    }

    if (
      value.includes("full") ||
      value.includes("web")
    ) {
      return Globe2;
    }

    if (
      value.includes("design") ||
      value.includes("architecture")
    ) {
      return Layers3;
    }

    return Sparkles;
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="h-5 w-32 animate-pulse rounded bg-white/10" />
          <div className="mt-5 h-12 w-64 animate-pulse rounded bg-white/10" />
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
              What I Do
            </p>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            Services
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            I build modern, scalable, and user-focused web applications
            using reliable full-stack technologies.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-gray-500">
              No services available.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = getServiceIcon(service.title);

              return (
                <article
                  key={service.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  {/* Number */}
                  <div className="absolute right-6 top-6 text-xs font-medium tracking-widest text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] transition group-hover:bg-white/10">
                    <Icon
                      size={22}
                      className="text-gray-300"
                    />
                  </div>

                  {/* Custom icon label */}
                  {service.icon && (
                    <p className="mt-5 text-xs uppercase tracking-wider text-gray-600">
                      {service.icon}
                    </p>
                  )}

                  {/* Content */}
                  <h2 className="mt-3 text-xl font-semibold text-white md:text-2xl">
                    {service.title}
                  </h2>

                  <p className="mt-4 leading-7 text-gray-400">
                    {service.description}
                  </p>

                  {/* Bottom */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-xs uppercase tracking-[0.18em] text-gray-600">
                      Development Service
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gray-300"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Approach */}
        <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                01
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Understand
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Understand the product, requirements, users, and
                business goals before building.
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                02
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Build
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Build clean, responsive, and maintainable full-stack
                applications.
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                03
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Improve
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Test, refine, optimize, and continuously improve the
                final product.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Have an idea?
            </p>

            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Let&apos;s build something useful.
            </h2>
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
    </section>
  );
};

export default Services;