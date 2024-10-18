"use client";

import Link from "next/link";
import { FileSearch, FileCheck, FilePlus2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <Link
        href={"/"}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <FilePlus2 size={16} />
        Criar roteiro
      </Link>

      <Link
        href={"/scripts/find"}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <FileSearch size={16} />
        Buscar roteiros
      </Link>

      <Link
        href={"/login"}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <FileCheck size={16} />
        Validar roteiros
      </Link>
    </footer>
  );
}
