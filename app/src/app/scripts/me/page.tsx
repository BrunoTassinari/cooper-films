"use client";

import { useAuth } from "@/hooks/use-auth";
import { DataTable } from "../../../components/data-table";
import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { ListUserScripts } from "@/app/api/user-script/list";
import ListRowActions from "@/components/list-row-actions";
import { apiHandler } from "@/lib/api-handler";
import { toast } from "react-toastify";
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
    cell: ({ row }) => (
      <ListRowActions script={row.original} showValidatioActions={true} />
    ),
  },
];

export default function ListScriptPage() {
  const { authenticated, userId } = useAuth();

  const [data, setData] = useState<ScriptData[]>([]);

  const handleFetchData = async () => {
    try {
      const response = await apiHandler(() => ListUserScripts(userId));
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

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg tracking-tight leading-normal text-slate-600 self-center">
        Meus roteiros
      </span>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
