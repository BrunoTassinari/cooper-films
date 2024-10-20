import CustomModal from "./ui/modal";
import { TextArea } from "./ui/text-area";

type ModalDetailsProps = {
  script: any;
  isOpen: boolean;
  onClose: () => void;
};

export default function DetailsModal({
  script,
  isOpen,
  onClose,
}: ModalDetailsProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <>
        <span className="font-bold text-lg tracking-tight leading-normal text-slate-600 sel">
          Detalhes do roteiro - {script.title}
        </span>

        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <TextArea readOnly value={script.content} />
            </div>
          </div>
        </div>
      </>
    </CustomModal>
  );
}
