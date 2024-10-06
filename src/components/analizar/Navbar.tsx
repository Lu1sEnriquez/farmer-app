import React from "react";
import { ModeToggle } from "../theme/ToggleMode";
import { GiFarmer } from "react-icons/gi";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full  m-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" m-auto container flex h-14 items-center">
        <div className="flex flex-1 items-center  justify-between  space-x-2 ">
          <div className="flex flex-row items-center">
            <p className="font-semibold text-xl">FarmerApp</p>
            <GiFarmer size={30} />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
