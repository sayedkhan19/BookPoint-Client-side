import { Truck, ShieldCheck, BookOpen, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: <BookOpen size={32} />,
    title: "Huge Book Collection",
    desc: "Thousands of books across all categories",
  },
  {
    icon: <Truck size={32} />,
    title: "Fast Delivery",
    desc: "Quick and reliable book delivery",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Payment",
    desc: "100% secure checkout process",
  },
  {
    icon: <RefreshCcw size={32} />,
    title: "Easy Returns",
    desc: "Hassle-free return policy",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-indigo-600 mb-12">
          Why Choose BookPoint?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
            >
              <div className="text-indigo-600 mb-4 flex justify-center">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
