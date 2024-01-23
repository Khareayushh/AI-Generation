"use client";
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { run } from "./gemini";
// import img from "/images/img.jpg";

export default function Home() {
  const [imageURL, setImageURL] = useState("");
  const [submitLoad, setSubmitLoad] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [promt, setPromt] = useState("");
  const template = "https://fastly.picsum.photos/";

  const handleReset = async () => {
    try {
      setImageLoading(true);
      const response = await axios.get(
        "https://picsum.photos/400/400?grayscale"
      );
      setImageURL(response.request.responseURL);
    } catch (error) {
      console.error(error);
    } finally {
      setImageLoading(false);
    }
  };

  const handlePromt = (e) => {
    setPromt(e.target.value);
    console.log(promt);
  }

  const handleSubmit = async () => {
    if(!promt){
      console.error("There must be some content");
      return;
    }
    try {
      setSubmitLoad(true);
      const textResult = await run(imageURL, promt);
      console.log(textResult);
    } catch (error) {
      console.error(error);
    }
    finally{
      setSubmitLoad(false);
    }
  }

  
  useEffect(() => {
    const fetchImage = async () => {
      try {
        setImageLoading(true);
        const response = await axios.get(
          "https://picsum.photos/400/400?grayscale"
        );
        setImageURL(response.request.responseURL);
      } catch (error) {
        console.error(error);
      } finally {
        setImageLoading(false);
      }
    };
    fetchImage();
  }, []);


  return (
    <>
      <div className="head flex items-center justify-center mt-4">
        <p className="font-bold text-3xl bg-transparent ">Persona</p>
      </div>
      <div className="main flex justify-evenly mt-16">
        <div className="left img-container w-[400px]">
          <p className="text-xl font-bold w-full text-center p-2">Image</p>
          <div className="flex h-[400px] items-center justify-center">
            {imageLoading ? (
              <div class="loader text-sky-500"></div>
            ) : (
              <img src={imageURL} alt="image" className="" />
            )}
          </div>
        </div>
        <div className="right user-text-container w-[400px] h-[400px] text-start">
          {/* text input is here for input from user */}
          <p className="text-xl font-bold w-full text-center p-2">
            Write what you percieved image
          </p>
          <textarea
            placeholder="Write here...."
            className="h-full w-full text-start border-2 p-1 box-border"
            onChange={handlePromt}
          ></textarea>
        </div>
        <div id="result-section" className="result">
          <p className="text-xl font-bold w-full text-center p-2">Result</p>
          <textarea
            type="text"
            className="h-[400px] w-[400px] border-2"
            readOnly
          ></textarea>
        </div>
      </div>
      <div className="btns my-4 flex items-center justify-center">
        <button
          className="py-2 px-4 bg-sky-500 cursor-pointer mr-4 hover:bg-sky-600 rounded-lg transition ease-in-out hover:text-white"
          onClick={handleReset}
        >
          Reset
        </button>
        <button className="py-2 px-4 bg-sky-500 cursor-pointer hover:bg-sky-600 rounded-lg transition ease-in-out hover:text-white" onClick={() => handleSubmit(imageURL, promt)}>
          Submit
        </button>
      </div>
    </>
  );
}
