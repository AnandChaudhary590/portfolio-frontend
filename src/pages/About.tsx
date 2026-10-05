import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Download, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

interface AboutData {
  id: string;
  title: string;
  description: string;
  profileImage: string | null;
  resumeUrl: string | null;
}

const About = () => {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get("/about");
        setAbout(response.data?.data || null);
      } catch (error) {
        console.error("Failed to fetch about:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-32 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <p className="mt-4 text-sm text-gray-400">
              Loading about...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!about) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-32 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-gray-400">
            About information not found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            About Me
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight text-white md:text-6xl">
            {about.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">
            Get to know more about my background, development journey,
            and the technologies I use to build modern web applications.
          </p>
        </div>
      </section>

      {/* Main About */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          
          {/* Profile */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-5 rounded-3xl border border-white/5" />
              <div className="absolute -inset-10 rounded-3xl border border-white/[0.03]" />

              {about.profileImage ? (
                <img
                  src={about.profileImage}
                  alt={about.title}
                  className="relative h-72 w-72 rounded-3xl border border-white/10 object-cover shadow-2xl md:h-96 md:w-96"
                />
              ) : (
                <div className="relative flex h-72 w-72 items-center justify-center rounded-3xl border border-white/10 bg-white/5 md:h-96 md:w-96">
                  <div className="text-center">
                    <Code2
                      size={64}
                      className="mx-auto text-gray-500"
                    />
                    <p className="mt-4 text-sm uppercase tracking-[0.25em] text-gray-500">
                      Full Stack
                    </p>
                    <p className="mt-2 text-xl font-semibold">
                      Developer
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-full border border-white/10 bg-gray-900 px-4 py-2.5 text-sm text-gray-300 shadow-xl">
                <CheckCircle2
                  size={16}
                  className="text-green-400"
                />
                Open to Work
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              My Story
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Turning ideas into{" "}
              <span className="text-gray-400">
                useful digital products.
              </span>
            </h2>

            <p className="mt-6 whitespace-pre-line text-lg leading-8 text-gray-400">
              {about.description}
            </p>

            {/* Tech Highlights */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]">
                <p className="text-sm text-gray-500">
                  Development
                </p>
                <p className="mt-2 font-semibold text-white">
                  Full Stack Web Development
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]">
                <p className="text-sm text-gray-500">
                  Focus
                </p>
                <p className="mt-2 font-semibold text-white">
                  Scalable & User-Friendly Apps
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]">
                <p className="text-sm text-gray-500">
                  Backend
                </p>
                <p className="mt-2 font-semibold text-white">
                  Node.js & REST APIs
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]">
                <p className="text-sm text-gray-500">
                  Database
                </p>
                <p className="mt-2 font-semibold text-white">
                  PostgreSQL & Prisma
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              {about.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-200"
                >
                  <Download size={18} />
                  View Resume
                </a>
              )}

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Let's Connect
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Mindset */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
              Developer Mindset
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold text-white md:text-4xl">
              I care about clean code, good user experiences, and
              building products that solve real problems.
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <p className="font-semibold text-white">
                  Clean & Maintainable
                </p>
                <p className="mt-2 leading-7 text-gray-400">
                  Writing structured code that is easier to understand,
                  test, and maintain.
                </p>
              </div>

              <div>
                <p className="font-semibold text-white">
                  Full-Stack Thinking
                </p>
                <p className="mt-2 leading-7 text-gray-400">
                  Working across frontend, backend, APIs, databases,
                  authentication, and deployment.
                </p>
              </div>

              <div>
                <p className="font-semibold text-white">
                  Always Learning
                </p>
                <p className="mt-2 leading-7 text-gray-400">
                  Continuously improving my skills and exploring better
                  ways to build modern applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;