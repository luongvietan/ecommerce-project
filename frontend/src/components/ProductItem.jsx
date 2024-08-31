import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ pid, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${pid}`}>
      <div>
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out"
            src={`http://localhost:5000/assets/${image[0]}.png`}
            alt={name}
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
