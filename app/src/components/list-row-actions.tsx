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

import { useState } from "react";
import DetailsModal from "./details-modal";
import ObservationModal from "./observation-modal";
import { changeScriptStatus } from "@/app/api/script/change-status";
import { apiHandler } from "@/lib/api-handler";
import type { ScriptData } from "@/types/index.ts";

type ListRowActionsProps = {
  script: ScriptData;
  showValidatioActions?: boolean;
};

export default function ListRowActions({
  script,
  showValidatioActions,
}: ListRowActionsProps) {
  const { userId, role } = useAuth();
  const [modalDetais, openModalDetails] = useState(false);
  const [modalObservation, openModalObservation] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [status, setStatus] = useState("");
  const [observation, setObservation] = useState("");

  async function handleApproveScript() {
    try {
      await apiHandler(() =>
        changeScriptStatus({
          script_id: script.id,
          user_id: userId,
          status: "APPROVED",
        })
      );

      toast.success("Roteiro aprovado com sucesso!");
      setInterval(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(` ${error}`);
    }
  }

  async function handleRejectScript() {
    try {
      await apiHandler(() =>
        changeScriptStatus({
          script_id: script.id,
          user_id: userId,
          status: "REJECTED",
        })
      );

      toast.success("Roteiro reprovado com sucesso!");
      setInterval(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(` ${error}`);
    }
  }

  async function handleUpdateStatus() {
    try {
      await apiHandler(() =>
        changeScriptStatus({
          script_id: script.id,
          user_id: userId,
          status,
          observation,
        })
      );

      toast.success("Status atualizado com sucesso!");
      setInterval(() => {
        window.location.reload();
      }, 1000);

      openModalObservation(false);
      setObservation("");
    } catch (error) {
      toast.error(` ${error}`);
    }
  }

  async function handleAssumeScript() {
    try {
      await apiHandler(() =>
        createUserScript({
          user_id: userId,
          script_id: script.id,
          role,
        })
      );

      toast.success("Roteiro assumido com sucesso! Redirecionando...");

      setInterval(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(` ${error}`);
    }
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
                      setModalTitle("Informe o motivo para envio à revisão:");
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
                      setModalTitle("Informe o motivo da reprovação:");
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
                      setModalTitle("Informe pontos de melhoria:");
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
                    onClick={handleApproveScript}
                  >
                    <FileCheck2 />
                    Aprovar roteiro
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleRejectScript}
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
        title={modalTitle}
      />
    </>
  );
}
