"use client";

import { Button } from "./ui/button";

import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { TextArea } from "./ui/text-area";
import ReactInputMask from "react-input-mask";
import { createScript } from "@/app/api/create-script";

const createScriptFormSchema = z.object({
  contact_name: z.string().min(1, { message: "Nome é obrigatório" }),
  contact_email: z.string().email({ message: "E-mail inválido" }),
  contact_phone: z.string().min(10, { message: "Telefone inválido" }),
  title: z.string().min(1, { message: "Titulo é obrigatório" }),
  content: z.string().min(1, { message: "Conteudo é obrigatório" }),
});

type createScriptForm = z.infer<typeof createScriptFormSchema>;

export default function CreateScriptForm() {
  const { register, handleSubmit, formState, reset } =
    useForm<createScriptForm>({
      resolver: zodResolver(createScriptFormSchema),
    });

  async function handleCreateScript(data: createScriptForm) {
    try {
      await createScript(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-full w-full flex flex-col gap-6 p-8 rounded-lg">
      <form
        onSubmit={handleSubmit(handleCreateScript)}
        className="flex-1 flex flex-col justify-between"
      >
        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-4 w-[40%]">
            <span className="font-medium text-sm tracking-tight leading-normal text-slate-500">
              Dados de contato:
            </span>
            <div className="flex flex-col">
              <Label htmlFor="name">Seu nome</Label>
              <Input
                id="name"
                placeholder="Insira seu nome"
                {...register("contact_name")}
              />

              {formState.errors.contact_name && (
                <p className="text-red-400 text-sm">
                  {formState.errors.contact_name.message}
                </p>
              )}
            </div>{" "}
            <div className="flex flex-col">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="Insira seu e-mail"
                {...register("contact_email")}
              />

              {formState.errors.contact_email && (
                <p className="text-red-400 text-sm">
                  {formState.errors.contact_email.message}
                </p>
              )}
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

              {formState.errors.contact_phone && (
                <p className="text-red-400 text-sm">
                  {formState.errors.contact_phone.message}
                </p>
              )}
            </div>{" "}
          </div>
          <div className="flex flex-col gap-4 w-full">
            <span className="font-medium text-sm tracking-tight leading-normal text-slate-500">
              Dados do roteiro:
            </span>
            <div className="flex flex-col">
              <Label htmlFor="title">Titulo</Label>
              <Input
                id="title"
                placeholder="Insira o titulo do roteiro"
                {...register("title")}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>{" "}
            <div className="flex flex-col">
              <Label htmlFor="content">Conteudo do roteiro</Label>
              <TextArea
                id="content"
                placeholder="Insira o conteudo do roteiro"
                {...register("content")}
              />

              {formState.errors.content && (
                <p className="text-red-400 text-sm">
                  {formState.errors.content.message}
                </p>
              )}
            </div>{" "}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <Button className="flex-1">Enviar</Button>
        </div>
      </form>
    </div>
  );
}
