import { useEffect, useState } from "react";
import api from "../services/api";

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
      <section className="min-h-[80vh] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-400">Loading experience...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          Career
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Experience
        </h1>

        <p className="mt-4 text-gray-400">
          My professional experience and development journey.
        </p>

        {experiences.length === 0 ? (
          <p className="mt-10 text-gray-500">
            No experience available.
          </p>
        ) : (
          <div className="mt-10 space-y-6">
            {experiences.map((experience) => (
              <article
                key={experience.id}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      {experience.position}
                    </h2>

                    <p className="mt-1 text-lg text-gray-300">
                      {experience.company}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 md:text-right">
                    <p>
                      {formatDate(experience.startDate)} —{" "}
                      {formatDate(experience.endDate)}
                    </p>

                    {experience.location && (
                      <p className="mt-1">
                        {experience.location}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-5 leading-7 text-gray-400">
                  {experience.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;