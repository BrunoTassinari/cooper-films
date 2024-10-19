"use client";

import { findScriptById } from "@/app/api/find-script-by-id";
import ButtonActions from "@/components/button-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { useAuth } from "@/hooks/use-auth";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DetailScriptPageProps = {
  params: {
    id: string;
  };
};

export default function DetailScriptPage({ params }: DetailScriptPageProps) {
  const router = useRouter();
  const { authenticated, role } = useAuth();
  const { id } = params;
  const [item, setItem] = useState({
    title: "",
    content: "",
  });

  const handleFindScriptById = async () => {
    const response = await findScriptById(id);

    if (!response) {
      router.push("/404");
    }

    setItem(response);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!authenticated) {
      return;
    }

    if (id) {
      handleFindScriptById();
    }
  }, [authenticated, id, router]);

  return (
    <div className="h-full w-full flex flex-col gap-6 p-8 rounded-lg">
      <div className="flex gap-6">
        <Link
          href={"/scripts/list"}
          className="mr-6 flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <ArrowLeft size={16} />
          Voltar a lista
        </Link>
        <span className="ml-64 font-bold text-lg tracking-tight leading-normal text-slate-600">
          Detalhes do roteiro - {item.title}
        </span>
      </div>

      <div className="flex justify-between gap-6 w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <TextArea readOnly value={item.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
