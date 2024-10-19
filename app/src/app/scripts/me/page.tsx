"use client";

import { useAuth } from "@/hooks/use-auth";
import { DataTable } from "../../../components/data-table";
import { useEffect, useState } from "react";
import { ListScripts } from "@/app/api/list-scripts";
import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import ListRowActions from "@/components/list-row-actions";
import { ListUserScripts } from "@/app/api/list-user-scripts";

export type ListScript = z.infer<typeof listScripSchema>;

const listScripSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  contact_name: z.string(),
  created_at: z.string(),
  status: z.string(),
});

const columns: ColumnDef<ListScript>[] = [
  {
    accessorKey: "title",
    header: "Titulo",
  },
  {
    accessorKey: "content",
    header: "Conteudo",
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
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <ListRowActions id={row.original.id} />,
  },
];

export default function ListScriptPage() {
  const { authenticated, userId } = useAuth();

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [data, setData] = useState<any[]>([]);

  const handleFetchData = async () => {
    const response = await ListUserScripts(userId);

    setData(response);
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
        Meus roteiros
      </span>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
