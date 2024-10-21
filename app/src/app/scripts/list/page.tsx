"use client";

import { useAuth } from "@/hooks/use-auth";
import { DataTable } from "../../../components/data-table";
import { useEffect, useState } from "react";
import { ListScripts } from "@/app/api/script/list";
import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import ListRowActions from "@/components/list-row-actions";
import { toast } from "react-toastify";
import { apiHandler } from "@/lib/api-handler";
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
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <ListRowActions script={row.original} />,
  },
];

export default function ListScriptPage() {
  const { authenticated } = useAuth();

  const [data, setData] = useState<ScriptData[]>([]);

  const handleFetchData = async () => {
    try {
      const response = await apiHandler(() => ListScripts());
      setData(response);
    } catch (error) {
      toast.error(` ${error}`);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!authenticated) {
      return;
    }

    handleFetchData();
  }, [authenticated]);

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg tracking-tight leading-normal text-slate-600 self-center">
        Roteiros
      </span>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
