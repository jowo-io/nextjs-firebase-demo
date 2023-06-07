import React from "react";

import Header from "@/client/ui/atoms/Header";
import Link from "next/link";
import { PathNames } from "@/client/utils/links";

export default function Page() {
  return (
    <div className="w-full">
      <Header tag="h1">Demo app</Header>
      <p className="text-black dark:text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        sollicitudin, sapien a elementum sollicitudin, dui arcu pulvinar nisl,
        id tempor urna lectus sit amet tellus. Nulla et vehicula turpis, vitae
        maximus elit.
      </p>
      <p className="text-black dark:text-white">
        Aliquam ac sagittis urna, eget interdum ante. Quisque sagittis purus sed
        mattis eleifend. Mauris dolor eros, egestas eget blandit non, varius in
        ligula. Aenean nunc ante, imperdiet eget mattis in, ultrices a velit.
      </p>
      <p className="text-black dark:text-white">
        Donec ultricies id justo sed tempus. Nunc vel risus efficitur, semper
        nunc a, scelerisque dolor.
      </p>
      <p className="text-black dark:text-white">
        View the legacy pages directory{" "}
        <Link
          className="underline hover:text-gray-700 hover:dark:text-gray-300"
          href={PathNames.test}
        >
          here
        </Link>
      </p>
    </div>
  );
}
