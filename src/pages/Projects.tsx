import { useEffect, useState } from "react";
import api from "../services/api";

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  featured: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");

        setProjects(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="min-h-[80vh] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          My Work
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Projects
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          A selection of projects I have built using modern web
          technologies.
        </p>

        {projects.length === 0 ? (
          <p className="mt-10 text-gray-500">
            No projects available.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  {project.featured && (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-900">
                      Featured
                    </span>
                  )}

                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    {project.title}
                  </h2>

                  <p className="mt-3 leading-7 text-gray-400">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                      >
                        Live Demo
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;