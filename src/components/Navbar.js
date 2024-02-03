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

  return (
    <div className="head flex items-center justify-center mt-4 max-md:flex max-md:justify-between max-md:mx-8 transition-all duration-150">
      <p className="font-bold text-3xl bg-transparent ">Persona</p>
      <p
        className="absolute right-8 hover:text-red-600 cursor-pointer font-bold transition-all duration-300 ease-in-out max-md:hidden"
        onClick={() => router.push("/about")}
      >
        About Persona
      </p>
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
        <div className="absolute bg-slate-300  top-16 right-0 transition-all p-4 max-md:block">
          <p
            className="hover:text-red-600 border-b-4 cursor-pointer font-bold transition-all duration-300 ease-in-out"
            onClick={() => {
              router.push("/");
              handleham(); // Close the menu after clicking a link
            }}
          >
            Home
          </p>
          <p
            className="hover:text-red-600 cursor-pointer font-bold transition-all duration-300 ease-in-out"
            onClick={() => {
              router.push("/about");
              handleham(); // Close the menu after clicking a link
            }}
          >
            About Persona
          </p>
          {/* Add more menu items as needed */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
