import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);
  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, []);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LASTEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
          eaque tenetur ad excepturi consequuntur quibusdam officiis quisquam
          cupiditate asperiores laudantium, autem saepe cumque laboriosam minima
          accusantium? Quod atque veniam perferendis.
        </p>
      </div>
    </div>
  );
};

export default LatestCollection;
