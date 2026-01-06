const Newsletter = () => {
  return (
    <section className="bg-indigo-600 py-20 px-4 text-white">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-4">
          Join Our Book Lovers Community 📚
        </h2>

        <p className="mb-8 text-indigo-100">
          Get updates on new books & exclusive offers
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-lg text-gray-800 w-full sm:w-72"
          />

          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Subscribe
          </button>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;
