import React from "react";
import { ModeToggle } from "../theme/ToggleMode";
import { GiFarmer } from "react-icons/gi";
import Link from "next/link";
import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full  m-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" m-auto container flex h-14 items-center ">
        <div className="flex flex-1 items-center  justify-between  space-x-2 ">
          <Link href={"/"} className="flex flex-row items-center pl-3">
            <p className="font-semibold text-xl">FarmerApp</p>
            <GiFarmer size={30} />
          </Link>
          <div className="flex flex-row pr-5 space-x-5">
          <Link href={"/analizar"}>
          <Button variant={"ghost"}>Analizar</Button>
          </Link>
          <Link href={"/analizar"}>
          <Button variant={"ghost"}>Resultado</Button>
          </Link>
          <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
