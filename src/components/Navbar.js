"use client"
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {

  const router = useRouter();

  return (
    <div className="head flex items-center justify-center mt-4">
      <p className="font-bold text-3xl bg-transparent ">Persona</p>
      <p className="absolute right-8 hover:text-red-600 cursor-pointer font-bold transition-all duration-300 ease-in-out" onClick={()=>router.push('/about')}>About Persona</p>
    </div>
  );
};

export default Navbar;
