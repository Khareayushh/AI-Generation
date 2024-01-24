"use client";
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { run } from "./gemini";
// import img from "/images/img.jpg";

export default function Home() {
  const [imageURL, setImageURL] = useState("");
  const [submitLoad, setSubmitLoad] = useState(false);
  const [data, setData] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [persona, setPersona] = useState("");
  const [text, setText] = useState("");

  const handleReset = async () => {
    try {
      setImageLoading(true);
      const response = await axios.get(
        "https://picsum.photos/400/400?grayscale"
      );
      setData(response.data);
      setImageURL(response.request.responseURL);
    } catch (error) {
      console.error(error);
    } finally {
      setImageLoading(false);
    }
  };

  const handlePromt = (e) => {
    setPrompt(e.target.value);
    console.log(prompt);
  };

  const handleSubmit = async () => {
    // console.log(prompt);
    if (!prompt) {
      console.error("There must be some content");
      return;
    }

    const text = prompt + " Write only in points at least 5 and at most 15 the personality attributes of the person who is writing the message after perceiving the image.like this:- The person who is writing the message is:1. Growth Minded.2. Action taker.3. Humor.4. Gentle.5. Courageous";
    // console.log(text);
    try {
      setSubmitLoad(true);
      // console.log(prompt);
      const details = {
        prompt: text,
        imageData: data,
      };
      const textResult = await run(details);
      setPersona(textResult);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoad(false);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setImageLoading(true);
        const response = await axios.get(
          "https://picsum.photos/400/400?grayscale"
        );
        setData(response.data);
        setImageURL(response.request.responseURL);
      } catch (error) {
        console.error(error);
      } finally {
        setImageLoading(false);
      }
    };
    fetchImage();
  }, []);

  useEffect(()=>{
    let index = 0;

    // Use setInterval to update the textarea value gradually
    const intervalId = setInterval(() => {
      if (index <= persona.length) {
        setText(persona.slice(0, index));
        index += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 30); // Adjust the interval based on your preference

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [persona])

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
              <div className="loader text-sky-500"></div>
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
            className="h-full w-full text-start border-4 p-2 box-border"
            onChange={handlePromt}
          ></textarea>
        </div>
        <div id="result-section" className="result">
          <p className="text-xl font-bold w-full text-center p-2">Result</p>
          <textarea
            type="text"
            className="h-[400px] w-[400px] border-4 p-2"
            readOnly
            value={text}
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
        <button
          className="py-2 px-4 bg-sky-500 cursor-pointer hover:bg-sky-600 rounded-lg transition ease-in-out hover:text-white"
          onClick={() => handleSubmit(data, prompt)}
        >
          Submit
        </button>
      </div>
    </>
  );
}
