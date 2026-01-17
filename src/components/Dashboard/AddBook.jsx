import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Programming",
  "Academic",
  "Kids",
];

const AddBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const imageHostingKey = import.meta.env.VITE_IMGBB_API_KEY;
  const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      const toastId = toast.loading("Uploading image...");

      const formData = new FormData();
      formData.append("image", data.cover[0]);

      const imgRes = await fetch(imageHostingURL, {
        method: "POST",
        body: formData,
      });

      const imgData = await imgRes.json();

      if (!imgData.success) {
        toast.error("Image upload failed", { id: toastId });
        setUploading(false);
        return;
      }

      toast.success("Image uploaded", { id: toastId });

      const bookInfo = {
        name: data.name,
        author: data.author,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        category: data.category,
        details: data.details,
        cover: imgData.data.display_url,
        rating: {
          average: parseFloat(data.rating),
          count: parseInt(data.ratingCount),
        },
        createdAt: new Date(),
      };

      const res = await fetch("https://book-point-server.vercel.app/books", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bookInfo),
      });

      const result = await res.json();

      if (result.insertedId) {
        toast.success("📚 Book added successfully!");
        reset();
        setPreview(null);
      }

      setUploading(false);
    } catch (err) {
      toast.error("Something went wrong");
      setUploading(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          ➕ Add New Book
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Book Name */}
          <div>
            <label className="label">Book Name</label>
            <input {...register("name", { required: true })} className="input" />
          </div>

          {/* Author */}
          <div>
            <label className="label">Author</label>
            <input {...register("author", { required: true })} className="input" />
          </div>

          {/* Price */}
          <div>
            <label className="label">Price ($)</label>
            <input type="number" {...register("price", { required: true })} className="input" />
          </div>

          {/* Stock */}
          <div>
            <label className="label">Stock</label>
            <input type="number" {...register("stock", { required: true })} className="input" />
          </div>

          {/* Rating */}
          <div>
            <label className="label">Initial Rating (0–5)</label>
            <input type="number" step="0.1" {...register("rating", { required: true })} className="input" />
          </div>

          {/* Rating Count */}
          <div>
            <label className="label">Rating Count</label>
            <input type="number" {...register("ratingCount", { required: true })} className="input" />
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <label className="label ">Category</label>
            <select  {...register("category", { required: true })} className="input cursor-pointer">
              <option className="cursor-pointer" value="">Select Category</option>
              {categories.map((cat) => (
                <option className="cursor-pointer" key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <label className="label">Book Details</label>
            <textarea rows="4" {...register("details", { required: true })} className="input"></textarea>
          </div>

          {/* Cover Upload */}
          <div className="md:col-span-2">
            <label className="label">Book Cover</label>

            <div className="flex items-center gap-6">
              <input
                type="file"
                accept="image/*"
                {...register("cover", { required: true })}
                onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none py-2 px-3"
              />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-28 h-36 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              disabled={uploading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 transition disabled:opacity-60"
            >
              {uploading ? "Processing..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>

      {/* Tailwind helpers */}
      <style>
        {`
          .label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            color: #374151;
          }
          .input {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            outline: none;
          }
          .input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
          }
        `}
      </style>
    </div>
  );
};

export default AddBook;
