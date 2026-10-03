import { useEffect, useState } from "react";
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

        console.log("About API response:", response.data);

        setAbout(response.data.data);
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
      <section className="min-h-[80vh] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  if (!about) {
    return (
      <section className="min-h-[80vh] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-400">About information not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            About Me
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {about.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            {about.description}
          </p>

          {about.resumeUrl && (
            <a
              href={about.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg bg-white px-5 py-3 font-medium text-gray-900 transition hover:bg-gray-200"
            >
              View Resume
            </a>
          )}
        </div>

        {about.profileImage && (
          <div className="flex justify-center">
            <img
              src={about.profileImage}
              alt={about.title}
              className="h-72 w-72 rounded-2xl object-cover shadow-xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default About;