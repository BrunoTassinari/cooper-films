import Modal from "react-modal";
import { Button } from "./button";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  action?: () => void;
  children: React.ReactNode;
};

export default function CustomModal({
  isOpen,
  onClose,
  action,
  children,
}: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 outline-none"
    >
      <div className="border bg-white border-slate-500 p-4 rounded-lg max-w-lg w-full flex flex-col gap-6">
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" className="p-0" onClick={onClose}>
            <X />
          </Button>
        </div>
        {children}
        {action && (
          <div className="flex justify-end">
            <Button onClick={action}>Enviar</Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
