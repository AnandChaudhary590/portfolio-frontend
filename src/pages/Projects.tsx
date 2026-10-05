// import { useEffect, useState } from "react";
// import api from "../services/api";

// interface Project {
//   id: string;
//   title: string;
//   description: string;
//   image?: string | null;
//   liveUrl?: string | null;
//   githubUrl?: string | null;
//   technologies: string[];
//   featured: boolean;
// }

// const Projects = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get("/projects");

//         setProjects(response.data?.data || []);
//       } catch (error) {
//         console.error("Failed to fetch projects:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   if (loading) {
//     return (
//       <section className="min-h-[80vh] px-6 py-20">
//         <div className="mx-auto max-w-7xl">
//           <p className="text-gray-400">Loading projects...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-[80vh] px-6 py-20">
//       <div className="mx-auto max-w-7xl">
//         <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
//           My Work
//         </p>

//         <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
//           Projects
//         </h1>

//         <p className="mt-4 max-w-2xl text-gray-400">
//           A selection of projects I have built using modern web
//           technologies.
//         </p>

//         {projects.length === 0 ? (
//           <p className="mt-10 text-gray-500">
//             No projects available.
//           </p>
//         ) : (
//           <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {projects.map((project) => (
//               <article
//                 key={project.id}
//                 className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
//               >
//                 {project.image && (
//                   <img
//                     src={project.image}
//                     alt={project.title}
//                     className="h-48 w-full object-cover"
//                   />
//                 )}

//                 <div className="p-6">
//                   {project.featured && (
//                     <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-900">
//                       Featured
//                     </span>
//                   )}

//                   <h2 className="mt-3 text-2xl font-semibold text-white">
//                     {project.title}
//                   </h2>

//                   <p className="mt-3 leading-7 text-gray-400">
//                     {project.description}
//                   </p>

//                   <div className="mt-5 flex flex-wrap gap-2">
//                     {project.technologies.map((technology) => (
//                       <span
//                         key={technology}
//                         className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300"
//                       >
//                         {technology}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="mt-6 flex gap-3">
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
//                       >
//                         Live Demo
//                       </a>
//                     )}

//                     {project.githubUrl && (
//                       <a
//                         href={project.githubUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Projects;




import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
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
      <main className="min-h-screen bg-gray-950 px-6 py-32 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <p className="mt-4 text-sm text-gray-400">
              Loading projects...
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
            Selected Work
          </div>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl">
            Projects &{" "}
            <span className="text-gray-400">
              Applications
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">
            A collection of full-stack applications and modern web
            experiences built with real-world technologies.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {projects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-gray-500">
                No projects available.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-64 w-full object-cover transition duration-700 group-hover:scale-105 md:h-72"
                      />
                    ) : (
                      <div className="flex h-64 items-center justify-center bg-white/[0.04] md:h-72">
                        <span className="text-6xl font-bold text-white/10">
                          &lt;/&gt;
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />

                    {project.featured && (
                      <div className="absolute left-5 top-5">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gray-950/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                          Featured
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-5 right-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gray-950/80 text-white backdrop-blur transition group-hover:bg-white group-hover:text-gray-900">
                        <ArrowUpRight size={19} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <h2 className="text-2xl font-bold text-white md:text-3xl">
                      {project.title}
                    </h2>

                    <p className="mt-4 leading-7 text-gray-400">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
                        >
                          Live Demo
                          <ExternalLink size={16} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
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

      {/* Bottom CTA */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
              More to explore
            </p>

            <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl">
                  Interested in my work?
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                  Feel free to explore my projects or get in touch
                  to discuss an opportunity.
                </p>
              </div>

              <a
                href="https://github.com/AnandChaudhary590"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-200"
              >
               
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;