import { useEffect, useState } from "react";
import api from "../services/api";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="min-h-[80vh] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-400">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          What I Do
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Services
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Services I provide for modern web application development.
        </p>

        {services.length === 0 ? (
          <p className="mt-10 text-gray-500">
            No services available.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                {service.icon && (
                  <div className="mb-5 inline-flex rounded-lg bg-white/10 px-3 py-2 text-sm text-gray-300">
                    {service.icon}
                  </div>
                )}

                <h2 className="text-2xl font-semibold text-white">
                  {service.title}
                </h2>

                <p className="mt-4 leading-7 text-gray-400">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;