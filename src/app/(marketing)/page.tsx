"use client";

import React, { PropsWithChildren } from "react";
import { Metadata } from "next";

import Header from "@/client/ui/atoms/Header";

export const metadata: Metadata = {
  title: "Demo app",
  description: "This is a demo app",
};

export default function Page({}: PropsWithChildren) {
  return (
    <div className="w-full">
      <Header tag="h1">Demo app</Header>
      <p className="text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        sollicitudin, sapien a elementum sollicitudin, dui arcu pulvinar nisl,
        id tempor urna lectus sit amet tellus. Nulla et vehicula turpis, vitae
        maximus elit.
      </p>
      <p className="text-white">
        Aliquam ac sagittis urna, eget interdum ante. Quisque sagittis purus sed
        mattis eleifend. Mauris dolor eros, egestas eget blandit non, varius in
        ligula. Aenean nunc ante, imperdiet eget mattis in, ultrices a velit.
      </p>
      <p className="text-white">
        Donec ultricies id justo sed tempus. Nunc vel risus efficitur, semper
        nunc a, scelerisque dolor.
      </p>
    </div>
  );
}
