"use client";

import Link from "next/link";
import { FileSearch, FileCheck, FilePlus2, FileUser } from "lucide-react";
import { Button } from "./button";

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <Link
        href={"/scripts/create"}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <FilePlus2 size={16} />
        Novo roteiro
      </Link>
      <Link
        href={"/scripts/find"}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <FileSearch size={16} />
        Consultar status
      </Link>
      <Link
        href={"/scripts/list"}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <FileCheck size={16} />
        Roteiros 🔒
      </Link>
      <Link
        href={"/scripts/me"}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <FileUser size={16} />
        Meus roteiros 🔒
      </Link>
    </footer>
  );
}
