"use client";

import { useAuth } from "@/hooks/use-auth";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { ListScripts } from "@/app/api/list-scripts";

export default function ListScriptPage() {
  const { authenticated } = useAuth();

  const [data, setData] = useState<any[]>([]);

  const handleFetchData = async () => {
    const response = await ListScripts();

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
        Validar roteiros
      </span>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
