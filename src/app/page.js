'use client';
import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { run } from './gemini';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import img from "/images/img.jpg";

export default function Home() {
  const [imageURL, setImageURL] = useState('');
  const [submitLoad, setSubmitLoad] = useState(false);
  const [data, setData] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [persona, setPersona] = useState('');
  const [text, setText] = useState('');

  const handleReset = async () => {
    try {
      setImageLoading(true);
      const response = await axios.get(
        'https://picsum.photos/400/400?grayscale',
      );

      setText('');
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
      // console.error("There must be some content");
      toast.error('Write some story!');
      return;
    }

    if (prompt.length < 50) {
      toast.error('Write story of more than 50 words');
      return;
    }

    const text =
      prompt +
      ' Write only in points at least 5 and at most 15 the personality attributes of the person who is writing the message after perceiving the image.like this:- The person who is writing the message is:1. Growth Minded.2. Action taker.3. Humor.4. Gentle.5. Courageous';
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
          'https://picsum.photos/400/400?grayscale',
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

  useEffect(() => {
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
  }, [persona]);

  return (
    <div className="transition duration-300">
      <div className="flex justify-center font-sans">
        <div className="flex flex-col">
          <div className="main grid grid-cols-3 gap-8 mt-16 max-w-screen-2xl max-xl:grid-cols-2 max-md:grid-cols-1">
            <div className="left img-container w-[400px] ">
              <p className="text-xl font-bold w-full text-center p-2 font-sans">
                Image
              </p>
              <div className="flex h-[400px] items-center justify-center">
                {imageLoading ? (
                  <div className="loader"></div>
                ) : (
                  <img src={imageURL} alt="image" className="" />
                )}
              </div>
            </div>
            <div className="right user-text-container w-[400px] h-[400px] text-start">
              {/* text input is here for input from user */}
              <ToastContainer />
              <p className="text-xl font-bold w-full text-center p-2">
                Write what you percieved image
              </p>
              <textarea
                placeholder="Write here...."
                className="h-full w-full text-start border-4 p-2 box-border"
                onChange={handlePromt}
              ></textarea>
            </div>

            <div id="result-section" className="result max-md:mt-4">
              <p className="text-xl font-bold w-full text-center p-2">Result</p>
              <div className="flex justify-center items-center h-[400px]">
                {submitLoad ? (
                  <div className="loader"></div>
                ) : (
                  <div>
                    <textarea
                      type="text"
                      className="h-[400px] w-[400px] border-4 p-2"
                      readOnly
                      value={text}
                    ></textarea>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="btns my-4 flex items-center justify-center">
            <button
              className="py-2 px-4 font-bold bg-red-500 text-white cursor-pointer mr-4 hover:bg-red-700 rounded-lg transition duration-300 ease-in-out hover:text-white"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="py-2 px-4 font-bold text-white bg-red-500 cursor-pointer hover:bg-red-700 rounded-lg transition duration-300 ease-in-out hover:text-white"
              onClick={() => handleSubmit(data, prompt)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-5xl m-auto w-2/3 p-4 max-sm:w-full" id="about">
        <p className="text-3xl font-semibold pb-4">About Project</p>
        <div className="content">
          <p className="text-xl font-semibold pb-2">Introduction</p>
          <p className="text-lg pb-2">
            Welcome to Persona. A personality identifier of person who wrote the
            story. Our project aims to provide the personality attributes that
            person possess on the basis of story written.
          </p>
          <p className="text-lg pb-2">
            {' '}
            <span className="font-semibold">Problem Statement:-</span> Picture
            Perception and Discussion Test (PPDT) Simulator
          </p>
          <p className="text-lg">
            <span className="font-semibold">Description:-</span> Design and
            develop an interactive web application that simulates the Picture
            Perception and Discussion Test (PPDT) for SSB (Services Selection
            Board) aspirants. The PPDT is a crucial part of the selection
            process, assessing the candidates' ability to perceive and analyze a
            given image, formulate a story based on it
          </p>
        </div>
      </div>
    </div>
  );
}
