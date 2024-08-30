import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  // Sử dụng product[0] nếu nó tồn tại
  const firstProduct = product[0];
  const { currency } = useContext(ShopContext);
  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${product.pid}`}
    >
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={product.image[0]}
          alt={product.name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{product.name}</p>
      <p className="text-sm font-medium">
        {currency}
        {firstProduct.price}
      </p>
    </Link>
  );
}

export default ProductItem;
