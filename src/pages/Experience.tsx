import { useEffect, useState } from "react";
import api from "../services/api";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
} from "lucide-react";

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await api.get("/experience");

        setExperiences(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const formatDate = (date: string | null) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="h-6 w-40 animate-pulse rounded bg-white/10" />
          <div className="mt-5 h-12 w-72 animate-pulse rounded bg-white/10" />
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
              Career Journey
            </p>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            Experience
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            A timeline of my professional experience, projects, and
            development journey as a software developer.
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-gray-500">No experience available.</p>
          </div>
        ) : (
          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-2 hidden h-[calc(100%-16px)] w-px bg-white/10 md:block" />

            <div className="space-y-10">
              {experiences.map((experience, index) => (
                <article
                  key={experience.id}
                  className="relative md:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-7 hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black md:flex">
                    <div className="h-2.5 w-2.5 rounded-full bg-white" />
                  </div>

                  <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] md:p-8">
                    {/* Top section */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                          <BriefcaseBusiness
                            size={21}
                            className="text-gray-300"
                          />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-xl font-semibold md:text-2xl">
                              {experience.position}
                            </h2>

                            {index === 0 && (
                              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gray-300">
                                Latest
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-base text-gray-300">
                            {experience.company}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 lg:pt-2">
                        <CalendarDays size={16} />

                        <span>
                          {formatDate(experience.startDate)} —{" "}
                          {formatDate(experience.endDate)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-7 max-w-4xl leading-7 text-gray-400">
                      {experience.description}
                    </p>

                    {/* Location */}
                    {experience.location && (
                      <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={16} />

                        <span>{experience.location}</span>
                      </div>
                    )}

                    {/* Bottom accent */}
                    <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                      <span className="text-xs uppercase tracking-[0.2em] text-gray-600">
                        Professional Experience
                      </span>

                      <ArrowUpRight
                        size={18}
                        className="text-gray-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                Looking ahead
              </p>

              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                Always learning. Always building.
              </h2>

              <p className="mt-3 max-w-2xl text-gray-400">
                I enjoy working on real-world applications and continuously
                improving my full-stack development skills.
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

export default Experience;