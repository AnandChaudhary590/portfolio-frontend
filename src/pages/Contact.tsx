import { useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";

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

      setError("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-white/40" />

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
              Get In Touch
            </p>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            Let&apos;s talk.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Have a project, internship opportunity, collaboration, or
            question? Send me a message and I&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.4fr]">
          {/* Left Information */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                <Mail size={20} className="text-gray-300" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Start a conversation
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                I&apos;m open to discussing software development
                opportunities, projects, and collaborations.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                  <MessageSquare
                    size={20}
                    className="text-gray-300"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Response
                  </p>

                  <p className="mt-1 font-medium text-gray-200">
                    I&apos;ll get back to you soon
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
                Open to
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Full Stack",
                  "MERN",
                  "Internships",
                  "Web Development",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                Contact Form
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Send a message
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
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
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-white/30"
                />
              </div>

              {/* Email */}
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
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-white/30"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mt-6">
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
                placeholder="Project inquiry / Job opportunity"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-white/30"
              />
            </div>

            {/* Message */}
            <div className="mt-6">
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
                rows={7}
                placeholder="Tell me about your project or opportunity..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-white/30"
              />
            </div>

            {/* Success */}
            {success && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{success}</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send size={17} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Let&apos;s build together
            </p>

            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Have an idea worth building?
            </h2>
          </div>

          <a
            href="/projects"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            View Projects
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;