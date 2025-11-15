export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}