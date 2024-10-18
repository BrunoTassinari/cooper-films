"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

const listScripSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  contact_name: z.string(),
  status: z.string(),
  created_at: z.string(),
});

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export type ListScript = z.infer<typeof listScripSchema>;

const RowActions = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/scripts/details/${id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleViewDetails}>
          Visualizar roteiro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<ListScript>[] = [
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
    cell: ({ row }) => <RowActions id={row.original.id} />, // Passa o ID para o componente RowActions
  },
];
