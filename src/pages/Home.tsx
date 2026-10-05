import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Mail,
  Sparkles,
} from "lucide-react";
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
      <section className="flex min-h-screen items-center justify-center bg-gray-950 px-6">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="mt-4 text-sm text-gray-400">Loading portfolio...</p>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-gray-950 text-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 md:pb-24 md:pt-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Hero Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Available for opportunities
            </div>

            <p className="mt-7 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
              <Sparkles size={16} />
              Welcome to my portfolio
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
  Building modern
  <span className="block text-gray-400">
    full-stack applications.
  </span>
</h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
              {about?.description ||
                "I build modern, scalable, and user-friendly web applications using modern web technologies."}
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                View My Work
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                <Mail size={18} />
                Let's Talk
              </Link>

              {about?.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  View Resume
                  <ExternalLink size={17} />
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://github.com/AnandChaudhary590"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/anand-chy1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                LinkedIn
              </a>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-bold text-white">
  {projects.length}+
</p>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Projects
                </p>
              </div>

              <div>
               <p className="text-2xl font-bold text-white">Full Stack</p>
<p className="mt-1 text-xs text-gray-500 sm:text-sm">
  Developer
</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">B.Tech</p>
<p className="mt-1 text-xs text-gray-500 sm:text-sm">
  Computer Science
</p>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer rings */}
              <div className="absolute -inset-5 rounded-full border border-white/5" />
              <div className="absolute -inset-10 rounded-full border border-white/[0.03]" />

              {about?.profileImage ? (
                <img
                  src={about.profileImage}
                  alt={about.title}
                  className="relative h-72 w-72 rounded-full border-4 border-white/10 object-cover shadow-2xl md:h-96 md:w-96"
                />
              ) : (
                <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl md:h-96 md:w-96">
                  <div className="text-center">
                    <div className="text-7xl font-bold text-white">
                      &lt;/&gt;
                    </div>

                    <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-500">
                      Full Stack
                    </p>

                    <p className="mt-2 text-xl font-semibold text-white">
                      Developer
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 right-0 flex items-center gap-2 rounded-full border border-white/10 bg-gray-900/90 px-4 py-2 text-sm text-gray-300 shadow-xl backdrop-blur">
                <CheckCircle2 size={16} className="text-green-400" />
                Open to Work
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section className="border-t border-white/5 px-6 pb-24 pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
                Selected Work
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Featured Projects
              </h2>

              <p className="mt-4 max-w-2xl text-gray-400">
                A selection of full-stack applications and modern web
                experiences built with real-world technologies.
              </p>
            </div>

            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-white"
            >
              View all projects
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-gray-500">
                No featured projects available.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-white/5">
                        <span className="text-5xl font-bold text-white/20">
                          &lt;/&gt;
                        </span>
                      </div>
                    )}

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-white/10 bg-gray-950/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white">
                      {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 leading-6 text-gray-400">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-7 flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
                        >
                          Live Demo
                          <ExternalLink size={15} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                          Code
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

      {/* ================= CTA ================= */}
      <section className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-16 text-center md:px-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
                Let's build something
              </p>

              <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                Have a project in mind?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
                I'm open to software engineering opportunities, freelance
                projects, and collaborations.
              </p>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Start a Conversation
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;