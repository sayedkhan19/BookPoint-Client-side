// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import useAuth from "../useAuth";
// import toast from "react-hot-toast";

// const BookDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [book, setBook] = useState(null);
//   const [adding, setAdding] = useState(false);

//   // Reviews
//   const [reviews, setReviews] = useState([]);
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(5);

//   /* ================= FETCH BOOK ================= */
//   useEffect(() => {
//     fetch(`http://localhost:5000/books/${id}`)
//       .then(res => res.json())
//       .then(data => setBook(data));
//   }, [id]);

//   /* ================= FETCH REVIEWS ================= */
//   useEffect(() => {
//     fetch(`http://localhost:5000/reviews/${id}`)
//       .then(res => res.json())
//       .then(data => setReviews(data));
//   }, [id]);

//   if (!book) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading book...
//       </div>
//     );
//   }

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async () => {
//     if (!user) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     const cartItem = {
//       userId: user.uid,
//       userEmail: user.email,
//       bookId: book._id,
//       name: book.name,
//       price: book.price,
//       cover: book.cover,
//       quantity: 1,
//       addedAt: new Date(),
//     };

//     try {
//       setAdding(true);
//       await fetch("http://localhost:5000/cart", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(cartItem),
//       });
//       toast.success("Added to cart 🛒");
//     } catch {
//       toast.error("Failed to add to cart");
//     } finally {
//       setAdding(false);
//     }
//   };

//   /* ================= ADD REVIEW ================= */
//   const handleAddReview = async () => {
//     if (!user) {
//       toast.error("Login to write a review");
//       navigate("/login");
//       return;
//     }

//     if (!comment.trim()) {
//       toast.error("Review cannot be empty");
//       return;
//     }

//     const reviewData = {
//       bookId: id,
//       userId: user.uid,
//       userEmail: user.email,
//       userName: user.displayName || "User",
//       rating,
//       comment,
//     };

//     const res = await fetch("http://localhost:5000/reviews", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(reviewData),
//     });

//     const data = await res.json();

//     setReviews([{ ...reviewData, _id: data.insertedId }, ...reviews]);
//     setComment("");
//     setRating(5);
//     toast.success("Review added ⭐");
//   };

//   /* ================= DELETE REVIEW ================= */
//   const handleDeleteReview = async (reviewId) => {
//     await fetch(`http://localhost:5000/reviews/${reviewId}`, {
//       method: "DELETE",
//     });

//     setReviews(reviews.filter(r => r._id !== reviewId));
//     toast.success("Review deleted");
//   };

//   return (
//     <div className="bg-gray-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">

//         {/* BOOK INFO */}
//         <div className="grid md:grid-cols-2 gap-10">
//           <img
//             src={book.cover}
//             className="w-full max-w-sm h-80 object-cover rounded-xl border"
//           />

//           <div>
//             <h2 className="text-3xl font-bold">{book.name}</h2>
//             <p className="text-gray-500 mb-3">by {book.author}</p>

//             <p className="text-2xl font-bold text-indigo-600 mb-4">
//               ${book.price}
//             </p>

//             <p className="mb-6">{book.details}</p>

//             <button
//               onClick={handleAddToCart}
//               disabled={adding}
//               className="w-full bg-indigo-600 text-white py-3 rounded-xl"
//             >
//               🛒 {adding ? "Adding..." : "Add to Cart"}
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mt-14 grid md:grid-cols-2 gap-10">

//           {/* LEFT */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">
//               💬 Reviews ({reviews.length})
//             </h3>

//             {reviews.map(r => (
//               <div key={r._id} className="border rounded p-4 mb-3">
//                 <div className="flex justify-between">
//                   <p className="font-medium">{r.userName}</p>
                 
//                   <span>⭐ {r.rating}</span>
                  
//                 </div>
//                  <span>Date:{r.createdAt}</span>
//                 <p className="text-gray-600 mt-2">{r.comment}</p>

//                 {user?.email === r.userEmail && (
//                   <button
//                     onClick={() => handleDeleteReview(r._id)}
//                     className=" text-sm mt-2 bg-red-600 rounded-2xl py-3 px-7 text-white hover:bg-red-500 cursor-pointer"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* RIGHT */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">✍️ Write a Review</h3>

//             <select
//               value={rating}
//               onChange={(e) => setRating(+e.target.value)}
//               className="w-full border p-2 mb-3"
//             >
//               {[5,4,3,2,1].map(n => (
//                 <option key={n} value={n}>{n} Stars</option>
//               ))}
//             </select>

//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               className="w-full border p-3 h-32"
//               placeholder="Write your review..."
//             />

//             <button
//               onClick={handleAddReview}
//               className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded"
//             >
//               Submit Review
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default BookDetails;
