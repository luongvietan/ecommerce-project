import React, { useState } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleProductAdded = () => {
    setRefresh((prev) => !prev); // Đảo ngược giá trị để trigger useEffect trong ProductList
  };

  return (
    <div className="">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={`http://localhost:5000/assets/logo.png`}
              className="h-9"
              alt="Fuble Logo"
            />
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                  onClick={() => setRefresh(false)} // Thêm sự kiện click để reset refresh
                >
                  Add Product
                </a>
              </li>
              <li>
                <a
                  href="/list"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => setRefresh(false)} // Thêm sự kiện click để reset refresh
                >
                  List Product
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="/users"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Users
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Router>
          <Routes>
            <Route
              path="/"
              element={<AddProduct onProductAdded={handleProductAdded} />}
            />
            <Route path="/list" element={<ProductList refresh={refresh} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
