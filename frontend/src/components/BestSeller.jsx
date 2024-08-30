import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  // Kiểm tra kiểu dữ liệu của products

  useEffect(() => {
    if (Array.isArray(products)) {
      // Kiểm tra xem products có phải là mảng không
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
    } else {
      console.error("products is not an array");
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"}></Title>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our top 5 best-selling soccer gear items, trusted by players
          for their quality and performance.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            pid={item.pid}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
