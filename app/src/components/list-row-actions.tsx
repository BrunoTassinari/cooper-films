import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { createUserScript } from "@/app/api/create-user-script";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListRowActions({ id }: { id: string }) {
  const { userId, role } = useAuth();

  async function handleAssumeScript() {
    try {
      await createUserScript({
        user_id: userId,
        script_id: id,
        role,
      });

      toast.success("Script assumido com sucesso!");
    } catch (error) {
    } finally {
      setInterval(() => {
        window.location.reload();
      }, 1000);
    }
  }

  return (
    <DropdownMenu>
      <ToastContainer />
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleAssumeScript}
        >
          Assumir roteiro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
