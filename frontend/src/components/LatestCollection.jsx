import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      // Kiểm tra xem products có phải là mảng và không rỗng
      setLatestProduct(products.slice(0, 10));
    } else {
      setLatestProduct([]);
    }
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LASTEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our latest collection of soccer gear—10 brand new products
          designed to elevate your game with style and performance.
        </p>
      </div>
      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map(
          (
            item,
            index // Kiểm tra kiểu dữ liệu
          ) => (
            <ProductItem
              key={index}
              pid={item.pid}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
