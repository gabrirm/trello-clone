import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export default function Logo() {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} sizes="30px" />
        <p className={cn("text-lg text-neutral-700", headingFont.className)}>
          Taskify
        </p>
      </div>
    </Link>
  );
}
