import React from 'react';

const Footer = () => {
         return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              📚 BookPoint
            </h2>
            <p className="text-sm text-gray-400">
              BookPoint is your trusted online bookstore for academic,
              programming, and fiction books at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Shop</a></li>
              <li><a href="#" className="hover:text-white">Categories</a></li>
              <li><a href="#" className="hover:text-white">Cart</a></li>
              <li><a href="#" className="hover:text-white">Login</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Fiction</a></li>
              <li><a href="#" className="hover:text-white">Non-Fiction</a></li>
              <li><a href="#" className="hover:text-white">Programming</a></li>
              <li><a href="#" className="hover:text-white">Academic</a></li>
              <li><a href="#" className="hover:text-white">Kids</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Refund Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Newsletter */}
        <div className="mt-10 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              Subscribe to get updates on new books & offers
            </p>

            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full md:w-64 rounded-l-md focus:outline-none text-gray-900"
              />
              <button className="bg-indigo-600 px-4 py-2 rounded-r-md text-white hover:bg-indigo-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BookPoint. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;