import React from "react";
import "./Home.css";
import { SiSpringsecurity } from "react-icons/si";

const Home = () => {
  return (
    <div className="home">
      <div className="text-center ">
        <div className="mx-auto" style={{ width: "80%" }}>
          <SiSpringsecurity size={150} />
          <h1 className="mt-5">Welcome to MERN Auth Application</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
