import React from "react";
import Title from "../components/Title";
import { assets } from "../../../admin/src/assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="contact_img"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-700">Our Store</p>
          <p className="text-gray-500">
            Phuoc Kien, Nha Be <br />
            Ho Chi Minh City, Vietnam
          </p>
          <p className="text-gray-500">
            Tel: (84) 384 398 634 <br />
            Email : luongvietan.231123@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-700">
            Careers at Fuble
          </p>
          <p className="text-gray-500">
            Learn more about our team and jobs opening
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore More
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
