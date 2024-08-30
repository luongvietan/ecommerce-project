import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ products }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${products.pid}`}
    >
      <div>
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out"
            src={products.image}
            alt={products.name}
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{products.name}</p>
        <p className="text-sm font-medium">
          {currency}
          {products[0].price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
