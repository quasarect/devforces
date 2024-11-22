import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

export default function NavbarLogged() {
  return (
    <nav className="sticky z-50 top-0 left-0 w-full border-b h-20 bg-[#08060e]/50 flex items-center backdrop-blur px-4">
      <div className="w-fit flex gap-6">
        <SidebarTrigger className="" />
        <div className="">
          <p className="text-sm text-color1">Hi John Doe,</p>
          <h1 className="text-xl">Welcome Back</h1>
        </div>
      </div>
    </nav>
  );
}
