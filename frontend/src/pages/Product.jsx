import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../../../backend/statics/assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, updateQuantity, updateCartIcon } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item.pid === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleQuantityChange = (event) => {
    const value =
      event.target.value === "" || event.target.value === "0"
        ? 1
        : Number(event.target.value);
    setQuantity(value);
    updateQuantity(productData.pid, size, Number(event.target.value));
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Products data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Products images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={`http://localhost:5000/assets/${item}.png`}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              ></img>
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={`http://localhost:5000/assets/${image}.png`}
              alt="image"
            />
          </div>
        </div>
        {/* Products Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">({Math.floor(Math.random() * 200)})</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <div>
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-300" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Quantity</p>
            <div className="flex gap-2">
              {
                <div>
                  <input
                    onChange={handleQuantityChange}
                    type="number"
                    min={1}
                    value={quantity}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  />
                </div>
              }
            </div>
          </div>

          <button
            onClick={() => addToCart(productData.pid, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy refund and exhange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description and Review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (86)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Fuble is your go-to online store for high-quality soccer gear.
            Whether you're a seasoned pro or just starting out, we offer a
            curated selection of jerseys, boots, and accessories to meet all
            your football needs. At Fuble, we combine style, performance, and
            affordability, making sure you have everything you need to perform
            your best on the field.
          </p>
          <p>
            From jerseys to boots, we offer everything you need to excel on the
            field. Shop our carefully selected products designed for both
            performance and style, all at competitive prices.
          </p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="">ERROR</div>
  );
};

export default Product;
