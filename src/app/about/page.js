import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl m-auto w-2/3 p-4">
      <div className="content">
        <p className="text-xl font-semibold pb-2">Introduction</p>
        <p className="text-lg pb-2">
          Welcome to Persona. A personality identifier of person who wrote the
          story. Our project aims to provide the personality attributes that
          person possess on the basis of story written.
        </p>
        <p className="text-lg pb-2"> <span className="font-semibold">Problem Statement:-</span> Picture Perception and Discussion Test (PPDT) Simulator</p>
        <p className="text-lg"><span className="font-semibold">Description:-</span> Design and develop an interactive web application that simulates the Picture Perception and Discussion Test (PPDT) for SSB (Services Selection Board) aspirants. The PPDT is a crucial part of the selection process, assessing the candidates' ability to perceive and analyze a given image, formulate a story based on it</p>
      </div>
    </div>
  );
};

export default About;
