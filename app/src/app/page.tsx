import CreateScriptForm from "@/components/create-script";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="font-bold text-lg tracking-tight leading-normal text-slate-600">
        Criar roteiro
      </span>
      <CreateScriptForm />
    </div>
  );
}
