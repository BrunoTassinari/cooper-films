"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSearch, Users, ArrowLeft } from "lucide-react";

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      {usePathname() === "/scripts/find" ? (
        <Link
          href={"/"}
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>
      ) : (
        <Link
          href={"/scripts/find"}
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <FileSearch size={16} />
          Buscar roteiros
        </Link>
      )}

      <Link
        href={"/login"}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <Users size={16} />
        Area do usuário
      </Link>
    </footer>
  );
}
