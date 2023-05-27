import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import Header from "@/client/ui/atoms/Header";

async function getData() {
  await new Promise((r) => setTimeout(r, 5000));

  return ["foo", "bar"];
}

export default async function Page({}) {
  const data = await getData();

  return (
    <div className="text-white">
      {data.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
