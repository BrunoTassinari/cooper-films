"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "../api/login";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const loginFormSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Senha inválida" }),
});

type loginForm = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<loginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  async function handleLogin(data: loginForm) {
    try {
      const response = await login(data);

      if (response.token) {
        localStorage.setItem("authToken", JSON.stringify(response.token));
        router.push("/scripts/list");
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="font-bold text-lg tracking-tight leading-normal text-slate-600">
        Login
      </span>
      <div className="w-full flex flex-col gap-6 p-4 rounded-lg">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex-1 flex flex-col items-center"
        >
          <div className="flex justify-center flex-col gap-4 w-[40%]">
            <div className="flex flex-col">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="Informe seu e-mail"
                {...register("email")}
              />

              {formState.errors.email && (
                <p className="text-red-400 text-sm">
                  {formState.errors.email.message}
                </p>
              )}
            </div>{" "}
            <div className="flex flex-col">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="Informe a senha"
                {...register("password")}
              />

              {formState.errors.password && (
                <p className="text-red-400 text-sm">
                  {formState.errors.password.message}
                </p>
              )}
            </div>{" "}
            <div className="flex items-center gap-3 mt-5">
              <Button size="sm" className="flex-1">
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
