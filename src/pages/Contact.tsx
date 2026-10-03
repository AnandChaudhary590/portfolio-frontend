import { FormEvent, useState } from "react";
import api from "../services/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await api.post("/contact", form);

      setSuccess(
        "Your message has been sent successfully. Thank you for contacting me!"
      );

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send message:", error);

      setError(
        "Failed to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          Get In Touch
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Contact Me
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Have a project, opportunity, or question? Feel free to
          get in touch with me.
        </p>

        <div className="mt-10 max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6 md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-gray-950 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/10 bg-gray-950 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                className="w-full rounded-lg border border-white/10 bg-gray-950 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Write your message..."
                className="w-full resize-none rounded-lg border border-white/10 bg-gray-950 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
              />
            </div>

            {success && (
              <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
                {success}
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;