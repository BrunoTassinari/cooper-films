import CustomModal from "./ui/modal";
import { TextArea } from "./ui/text-area";

type ModalDetailsProps = {
  observation: string;
  setObservation: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
  action: () => void;
};

export default function ObservationModal({
  observation,
  setObservation,
  isOpen,
  onClose,
  action,
}: ModalDetailsProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} action={action}>
      <>
        <span className="font-bold text-lg tracking-tight leading-normal text-slate-600 sel">
          Observação
        </span>

        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <TextArea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
            </div>
          </div>
        </div>
      </>
    </CustomModal>
  );
}
