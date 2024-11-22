import { Metadata } from "next";
import Link from "next/link";

export default function NotFound404() {
  return (
    <div className="flex flex-col w-full h-screen absolute top-0 items-center justify-center grow">
      <div className="flex gap-4 items-center">
        <p className="text-2xl">404</p>
        <div className="w-[1px] bg-gray-500 h-10" />
        <p className="text-sm">This page could not be found.</p>
      </div>
      <Link
        href={"/"}
        className="mt-2 rounded bg-slate-100 hover:bg-white text-black px-4 py-2"
      >
        Dashboard
      </Link>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Page Not Found",
};
