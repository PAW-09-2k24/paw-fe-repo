/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { groupProps, taskProps } from "@/types/types";
import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { InputForm } from "@/components/InputForm";
import GoogleLoginPortal from "@/components/LoginGoogle";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useAuthContext } from "@/context/AuthContext";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import LandingContent from "@/components/LandingContent";
export default function Home() {
  return (
    <div className="App z-10">
      <Parallax pages={2} style={{ top: "0", left: "0" }} className="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div className="animation_layer parallax">
            <Image
              src={"/landing/background.png"}
              alt="halo"
              fill
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div className="animation_layer parallax">
            <Image
              src={"/landing/mountains.png"}
              alt="halo"
              fill
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1}>
          <div className="animation_layer parallax">
            <div className="w-full h-screen justify-center items-center flex font-bold pb-[360px] text-black text-[80px]">
              PAW-09
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div className="animation_layer parallax">
            <Image
              src={"/landing/jungle1.png"}
              alt="halo"
              fill
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div className="animation_layer parallax">
            <Image
              src={"/landing/jungle2.png"}
              alt="halo"
              fill
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <div className="animation_layer parallax">
            <Image
              src={"/landing/jungle3.png"}
              alt="halo"
              fill
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.45}>
          <div className="animation_layer parallax">
            <Image
              src={"/landing/jungle4.png"}
              alt="halo"
              fill
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4}>
          <div className="animation_layer parallax">
            <Image
              src={"/landing/man_on_mountain.png"}
              alt="halo"
              fill
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div className="animation_layer parallax">
            <Image
              src={"/landing/jungle5.png"}
              alt="halo"
              fill
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.1}>
          <div className="animation_layer parallax">
            <div className="bg-black w-screen h-screen">
              <LandingContent/>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
