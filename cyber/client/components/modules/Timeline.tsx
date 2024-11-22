import React from "react";
import GuideLineComponent from "../GuideLine/GuideLineComponent";
import { modules } from "@/types/modules";

export default function Timeline(props: modules) {
  return (
    <section className="w-full px-2 relative sm:px-4 text-slate-100 items-center pb-20 bg-transparent flex flex-col">
      <div className="bg-transparent text-2xl px-4 py-20 w-full text-center flex items-center gap-2 flex-col">
        <div className="">
          <span className="text-5xl">{props?.header?.h1}</span>
        </div>

        <div className="">{props?.header?.h3}</div>
      </div>
      <div className=""></div>

      <div className="relative flex flex-col items-left z-[10] justify-center w-full">
        <div className="absolute z-[-2] w-[3px] left-[40px] md:left-[50px] [mask:linear-gradient(0deg,transparent,white_20%,white_80%,transparent)] h-full bg-[_theme(colors.slate.900/.88)]">
          <div className="fixed left-auto top-0 right-auto bottom-[50vh] z-[-1] w-[3px] h-[50vh] bg-white bg-[linear-gradient(180deg,_theme(colors.indigo.500)_50%,_theme(colors.blue.300),_theme(colors.indigo.500))]"></div>
        </div>

        {props?.timeline?.map((item, index) => (
          <GuideLineComponent
            key={index}
            time="Introduction"
            heading={item?.heading}
            content={item?.content}
          />
        ))}
      </div>
    </section>
  );
}
