import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="about_img"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Fuble, we are passionate about soccer and committed to providing
            top-quality gear for players of all levels. Our mission is to offer
            a carefully curated selection of soccer products that combine
            performance, style, and affordability. Whether you’re a professional
            athlete or a weekend warrior, Fuble is here to equip you with the
            best gear to enhance your game. We believe in the power of sport to
            unite and inspire, and we’re dedicated to supporting your journey on
            and off the field.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            We understand the importance of having the right gear, whether
            you're competing at the highest level or just playing for fun.
            That's why we offer a handpicked selection of top-quality soccer
            products that blend performance, style, and affordability. Our goal
            is to ensure that every player, from beginners to professionals, has
            access to the best equipment to elevate their game. We believe
            soccer has the power to bring people together, and we're proud to
            support your journey both on and off the field with gear that you
            can trust.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance : </b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience : </b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service : </b>
          <p className="text-gray-600">
            At Fuble, we combine quality, ease, and exceptional care to ensure
            you have the best possible experience.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
