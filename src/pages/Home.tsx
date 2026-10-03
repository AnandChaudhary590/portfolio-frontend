const Home = () => {
  return (
    <section className="flex min-h-[80vh] items-center px-6 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
          Welcome to my portfolio
        </p>

        <h1 className="mt-4 text-5xl font-bold text-white md:text-7xl">
          Full Stack
          <span className="block text-gray-400">
            Web Developer
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          I build modern, scalable, and user-friendly web applications
          using React, Node.js, TypeScript, and modern web technologies.
        </p>
      </div>
    </section>
  );
};

export default Home;