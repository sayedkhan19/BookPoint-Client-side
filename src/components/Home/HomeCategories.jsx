import { NavLink } from "react-router";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Programming",
  "Academic",
  "Kids",
];

const HomeCategories = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-indigo-600 mb-10">
          Browse by Category
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <NavLink
              key={cat}
              to={`/category/${cat}`}
              className="px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
            >
              {cat}
            </NavLink>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeCategories;
