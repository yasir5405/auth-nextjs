"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full py-3 border-b px-10 flex items-center justify-between ">
      <h1>NextJS Auth</h1>
      <Link href={"/login"}>
        <Button>Login</Button>
      </Link>
    </nav>
  );
};

export default Navbar;
