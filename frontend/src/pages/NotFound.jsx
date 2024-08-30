import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const NotFound = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-14 border-t">
        <Title text1={"404"} text2={"NOT FOUND PAGE"} />
      </div>
      <br />
    </div>
  );
};

export default NotFound;
