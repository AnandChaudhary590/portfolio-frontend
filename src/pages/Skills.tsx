import { useEffect, useState } from "react";
import {
  Code2,
  Database,
  Server,
  Wrench,
  Layers3,
  Sparkles,
} from "lucide-react";
import api from "../services/api";

interface Skill {
  id: string;
  name: string;
  category: string;
  level?: number | null;
  icon?: string | null;
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");
        setSkills(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getCategoryIcon = (category: string) => {
    const value = category.toLowerCase();

    if (
      value.includes("frontend") ||
      value.includes("front")
    ) {
      return <Code2 size={22} />;
    }

    if (
      value.includes("backend") ||
      value.includes("back")
    ) {
      return <Server size={22} />;
    }

    if (
      value.includes("database") ||
      value.includes("db")
    ) {
      return <Database size={22} />;
    }

    if (
      value.includes("tool") ||
      value.includes("devops")
    ) {
      return <Wrench size={22} />;
    }

    return <Layers3 size={22} />;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-32 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <p className="mt-4 text-sm text-gray-400">
              Loading skills...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            <Sparkles size={16} />
            My Expertise
          </div>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl">
            Skills &{" "}
            <span className="text-gray-400">
              Technologies
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">
            Technologies and tools I use to design, develop, and
            maintain modern full-stack web applications.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {skills.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-gray-500">
                No skills available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => {
                const level =
                  skill.level !== null &&
                  skill.level !== undefined
                    ? Math.min(Math.max(skill.level, 0), 10)
                    : null;

                return (
                  <article
                    key={skill.id}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    {/* Icon + Category */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300">
                        {getCategoryIcon(skill.category)}
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-400">
                        {skill.category}
                      </span>
                    </div>

                    {/* Skill name */}
                    <h2 className="mt-6 text-2xl font-semibold text-white">
                      {skill.name}
                    </h2>

                    {/* Level */}
                    {level !== null && (
                      <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Proficiency
                          </span>

                          <span className="text-sm font-medium text-gray-300">
                            {level * 10}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-white transition-all duration-700"
                            style={{
                              width: `${level * 10}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Bottom */}
                    <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Currently using
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom section */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
              My Approach
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-4xl">
              I focus on building applications that are{" "}
              <span className="text-gray-400">
                clean, scalable, and easy to use.
              </span>
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div>
                <Code2 size={24} className="text-gray-300" />
                <h3 className="mt-4 font-semibold">
                  Modern Frontend
                </h3>
                <p className="mt-2 leading-7 text-gray-400">
                  Responsive interfaces with React, TypeScript,
                  Tailwind CSS, and modern UI patterns.
                </p>
              </div>

              <div>
                <Server size={24} className="text-gray-300" />
                <h3 className="mt-4 font-semibold">
                  Reliable Backend
                </h3>
                <p className="mt-2 leading-7 text-gray-400">
                  REST APIs, authentication, validation, and
                  structured backend architecture.
                </p>
              </div>

              <div>
                <Database size={24} className="text-gray-300" />
                <h3 className="mt-4 font-semibold">
                  Data & APIs
                </h3>
                <p className="mt-2 leading-7 text-gray-400">
                  PostgreSQL, Prisma, database design, and
                  API-driven applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Skills;