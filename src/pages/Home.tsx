import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

interface AboutData {
  title: string;
  description: string;
  profileImage: string | null;
  resumeUrl: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  technologies: string[];
  featured: boolean;
}

const Home = () => {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [aboutResponse, projectsResponse] = await Promise.all([
          api.get("/about"),
          api.get("/projects"),
        ]);

        setAbout(aboutResponse.data?.data || null);

        const allProjects = projectsResponse.data?.data || [];

        const featuredProjects = allProjects
          .filter((project: Project) => project.featured)
          .slice(0, 3);

        setProjects(featuredProjects);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-[80vh] items-center px-6 py-20">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="flex min-h-[80vh] items-center px-6 py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
              Welcome to my portfolio
            </p>

            <h1 className="mt-4 text-5xl font-bold text-white md:text-7xl">
              {about?.title || "Full Stack Web Developer"}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              {about?.description ||
                "I build modern, scalable, and user-friendly web applications using modern web technologies."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-200"
              >
                View Projects
              </Link>

              <Link
                to="/contact"
                className="rounded-lg border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Let's Talk
              </Link>

              {about?.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  View Resume
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://github.com/AnandChaudhary590"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/anand-chy1/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            {about?.profileImage ? (
              <img
                src={about.profileImage}
                alt={about.title}
                className="h-80 w-80 rounded-3xl object-cover shadow-2xl md:h-96 md:w-96"
              />
            ) : (
              <div className="relative flex h-80 w-80 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-2xl md:h-96 md:w-96">
                <div className="absolute inset-4 rounded-2xl border border-white/10" />

                <div className="relative text-center">
                  <div className="text-6xl font-bold text-white">
                    &lt;/&gt;
                  </div>

                  <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-400">
                    Full Stack
                  </p>

                  <p className="mt-2 text-lg font-medium text-white">
                    Developer
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            My Work
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Featured Projects
              </h2>

              <p className="mt-4 max-w-2xl text-gray-400">
                A selection of projects built using modern web technologies.
              </p>
            </div>

            <Link
              to="/projects"
              className="text-sm font-medium text-white hover:underline"
            >
              View All Projects →
            </Link>
          </div>

          {projects.length === 0 ? (
            <p className="mt-10 text-gray-500">
              No featured projects available.
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
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-900">
                      Featured
                    </span>

                    <h3 className="mt-4 text-2xl font-semibold text-white">
                      {project.title}
                    </h3>

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
    </>
  );
};

export default Home;