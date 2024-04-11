"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";
// import HamburgerMenu from "./Hamburger";

const Navbar = () => {
  const router = useRouter();

  const [ham, setHam] = useState(false);

  const handleham = () => {
    setHam(!ham);
  };

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="head flex items-center justify-center mt-4 max-md:flex max-md:justify-between max-md:mx-8 transition-all duration-150">
      <p className="font-bold text-3xl bg-transparent ">Persona</p>
      <div className="flex items-center justify-center gap-4 absolute right-8">
        <p
          className=" hover:text-red-600 cursor-pointer font-bold transition-all duration-300 ease-in-out max-md:hidden"
          onClick={(e) => {
            handleSmoothScroll(e);
          }}
          href="#about"
        >
          About Persona
        </p>
        <a href="https://github.com/Khareayushh/fav_giphy">
          <p
            className="hover:text-red-600 cursor-pointer font-bold transition-all duration-300 ease-in-out max-md:hidden"
            href="#about"
          >
            Source Code
          </p>
        </a>
      </div>
      <div className="relative transition-all duration-500">
        {ham ? (
          <div onClick={handleham} className="md:hidden">
            <div>
              <Close />
            </div>
          </div>
        ) : (
          <div onClick={handleham} className="md:hidden static">
            <MenuIcon />
          </div>
        )}
      </div>
      {ham && (
        <div className="rounded-lg absolute bg-slate-300  top-16 right-0 transition-all p-4 max-md:block">
          <div className="flex flex-col">
            <p
              className="hover:text-red-600 cursor-pointer font-bold transition-all duration-300 ease-in-out"
              onClick={(e) => {
                handleSmoothScroll(e);
                handleham(); // Close the menu after clicking a link
              }}
              href="#about"
            >
              About Persona
            </p>
            <a href="https://github.com/Khareayushh/fav_giphy" target="_blank" className="mt-2 border-t-4 pt-2">
              <p
                className="hover:text-red-600 cursor-pointer font-bold transition-all duration-300 ease-in-out"
              >
                Source Code
              </p>
            </a>
          </div>
          {/* Add more menu items as needed */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
