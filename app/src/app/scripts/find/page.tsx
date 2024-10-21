"use client";

import FindScriptForm from "@/components/find-script";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/data-table";
import type { ScriptData } from "@/types/index.ts";

const columns: ColumnDef<ScriptData>[] = [
  {
    accessorKey: "title",
    header: "Titulo",
  },
  {
    accessorKey: "contact_name",
    header: "Enviado por",
  },
  {
    accessorKey: "created_at",
    header: "Data criação",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "approver_count",
    header: "Votação aprovadores",
  },
];

export default function FindScripts() {
  const [scripts, setScripts] = useState<ScriptData[]>([]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="font-bold text-lg tracking-tight leading-normal text-slate-600">
        Buscar roteiros
      </span>
      <FindScriptForm setScripts={setScripts} />

      {scripts.length ? (
        <div className="flex flex-col gap-4 w-full p-4">
          <DataTable columns={columns} data={scripts} />
        </div>
      ) : null}
    </div>
  );
}
