import CustomModal from "./ui/modal";
import { TextArea } from "./ui/text-area";

type ModalDetailsProps = {
  observation: string;
  setObservation: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
  action: () => void;
  title: string;
};

export default function ObservationModal({
  observation,
  setObservation,
  isOpen,
  onClose,
  action,
  title,
}: ModalDetailsProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} action={action}>
      <div className="flex flex-col justify-between gap-6 w-full">
        <span className="text-sm text-slate-500">{title}</span>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <TextArea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
