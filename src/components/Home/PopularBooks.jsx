import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router";

import "swiper/css";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://book-point-server.vercel.app/books/popular")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
        🔥 Popular Books
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <div
              onClick={() => navigate(`/books/${book._id}`)}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-4 h-full"
            >
              <img
                src={book.cover}
                alt={book.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />

              <h3 className="font-semibold text-lg line-clamp-1">
                {book.name}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                {book.author}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-600 font-bold">
                  ${book.price}
                </span>

                <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                  ⭐ {book.rating?.average || 0}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularBooks;
