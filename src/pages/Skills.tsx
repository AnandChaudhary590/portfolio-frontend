import { useEffect, useState } from "react";
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

  if (loading) {
    return (
      <section className="min-h-[80vh] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-400">Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          My Expertise
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Skills
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Technologies and tools I use to build modern web applications.
        </p>

        {skills.length === 0 ? (
          <p className="mt-10 text-gray-500">
            No skills available.
          </p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    {skill.name}
                  </h2>

                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                    {skill.category}
                  </span>
                </div>

                {skill.level !== null &&
                  skill.level !== undefined && (
                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-gray-400">
                          Level
                        </span>

                        <span className="text-gray-300">
                          {skill.level}/10
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-white"
                          style={{
                            width: `${skill.level * 10}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;