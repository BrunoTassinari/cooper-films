import {
  Eye,
  FileCheck2,
  FilePenLine,
  FileText,
  FileX,
  MoreHorizontal,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { createUserScript } from "@/app/api/user-script/create";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DetailsModal from "./details-modal";
import ObservationModal from "./observation-modal";
import { changeScriptStatus } from "@/app/api/script/change-status";
import { apiHandler } from "@/lib/api-handler";

type ListRowActionsProps = {
  script: any;
  showValidatioActions?: boolean;
};

export default function ListRowActions({
  script,
  showValidatioActions,
}: ListRowActionsProps) {
  const { userId, role } = useAuth();
  const [modalDetais, openModalDetails] = useState(false);
  const [modalObservation, openModalObservation] = useState(false);

  const [status, setStatus] = useState("");
  const [observation, setObservation] = useState("");

  const router = useRouter();

  async function handleUpdateStatus() {
    await apiHandler(() =>
      changeScriptStatus({
        script_id: script.id,
        user_id: userId,
        status,
        observation,
      })
    );

    toast.success("Status atualizado com sucesso!");
  }

  async function handleAssumeScript() {
    await apiHandler(() =>
      createUserScript({
        user_id: userId,
        script_id: script.id,
        role,
      })
    );

    toast.success("Roteiro assumido com sucesso!");
    router.push("/scripts/list");
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => openModalDetails(true)}
          >
            <Eye />
            Visualizar roteiro
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {showValidatioActions ? (
            <>
              {role === "ANALYST" && (
                <>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setStatus("AWAITING_REVIEW");
                      openModalObservation(true);
                    }}
                  >
                    <FilePenLine />
                    Enviar para revisão
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setStatus("REJECTED");
                      openModalObservation(true);
                    }}
                  >
                    <FileX />
                    Reprovar roteiro
                  </DropdownMenuItem>
                </>
              )}

              {role === "REVIEWER" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setStatus("AWAITING_APPROVAL");
                      openModalObservation(true);
                    }}
                  >
                    <FileText />
                    Revisar roteiro
                  </DropdownMenuItem>
                </>
              )}

              {role === "APPROVER" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setStatus("APPROVED");
                      handleUpdateStatus();
                    }}
                  >
                    <FileCheck2 />
                    Aprovar roteiro
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setStatus("REJECTED");
                      handleUpdateStatus();
                    }}
                  >
                    <FileX />
                    Reprovar roteiro
                  </DropdownMenuItem>
                </>
              )}
            </>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleAssumeScript}
            >
              <User />
              Assumir roteiro
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DetailsModal
        isOpen={modalDetais}
        onClose={() => openModalDetails(false)}
        script={script}
      />
      <ObservationModal
        isOpen={modalObservation}
        onClose={() => openModalObservation(false)}
        observation={observation}
        setObservation={setObservation}
        action={handleUpdateStatus}
      />
    </>
  );
}
