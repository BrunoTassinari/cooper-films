"use client";

import { z } from "zod";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import ReactInputMask from "react-input-mask";
import { Button } from "./ui/button";
import { findScript } from "@/app/api/script/find-by-contact-info";
import type { Script } from "@/types/script";
import { apiHandler } from "@/lib/api-handler";

type FindScriptFormProps = {
  setScripts: (scripts: Script[]) => void;
};

type findScriptForm = z.infer<typeof findScriptFormSchema>;

const findScriptFormSchema = z
  .object({
    contact_name: z.string().optional(),
    contact_email: z.string().optional(),
    contact_phone: z.string().optional(),
  })
  .refine((data) => {
    return data.contact_name || data.contact_email || data.contact_phone;
  });

export default function FindScriptForm({ setScripts }: FindScriptFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<findScriptForm>({
    resolver: zodResolver(findScriptFormSchema),
  });

  async function handleSearchScript(query: findScriptForm) {
    const response = await apiHandler(() => findScript(query));
    setScripts(response);
    reset();
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4 rounded-lg">
      <form
        onSubmit={handleSubmit(handleSearchScript)}
        className="flex-1 flex flex-col"
      >
        <div className="flex justify-center gap-4">
          <div className="flex flex-col">
            <Label htmlFor="name">Seu nome</Label>
            <Input
              id="name"
              placeholder="Insira seu nome"
              {...register("contact_name")}
            />
          </div>{" "}
          <div className="flex flex-col">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input
              id="email"
              placeholder="Insira seu e-mail"
              {...register("contact_email")}
            />
          </div>{" "}
          <div className="flex flex-col ">
            <Label htmlFor="phone">Telefone</Label>
            <ReactInputMask
              id="phone"
              className="phone-input"
              placeholder="Insira seu telefone com DDD"
              mask={"(99) 99999-9999"}
              {...register("contact_phone")}
            />
          </div>{" "}
          <div className="flex items-center gap-3 mt-5">
            <Button size="sm" className="flex-1" disabled={!isValid}>
              Pesquisar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
