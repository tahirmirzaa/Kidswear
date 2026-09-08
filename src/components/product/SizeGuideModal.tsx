import Modal from "../ui/Modal";
import SizeGuideTable from "./SizeGuideTable";

export default function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} maxWidthClass="max-w-2xl">
      <h2 className="font-serif text-2xl text-ink">Size Guide</h2>
      <div className="mt-4">
        <SizeGuideTable />
      </div>
    </Modal>
  );
}
