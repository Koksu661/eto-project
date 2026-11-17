import { useState } from 'react';

const CANCEL_REASONS = [
  'Sérülés / Betegség',
  'Iskolai / Munkabeli elfoglaltság',
  'Családi okok',
  'Utazás / Közlekedési fennakadás',
  'Egyéb ok'
];

export default function CancelModal({ isOpen, eventTitle, onClose, onConfirm }) {
  const [selectedReason, setSelectedReason] = useState(CANCEL_REASONS[0]);
  const [customReason, setCustomReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = selectedReason === 'Egyéb ok' ? customReason : selectedReason;
    onConfirm(finalReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-(--bg-card) border border-[#B9975B] w-full max-w-md rounded-xl p-6 shadow-2xl flex flex-col gap-5 text-(--text-main) font-futura">
        
        {/* HEADER */}
        <div>
          <h3 className="text-xl font-extrabold text-[#B9975B]">Biztosan lemondod?</h3>
          <p className="text-xs text-(--text-muted) mt-1">
            Esemény: <span className="font-bold text-(--text-main)">{eventTitle}</span>
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wider">
              Lemondás oka:
            </label>

            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) focus:outline-none focus:border-[#B9975B] cursor-pointer"
            >
              {CANCEL_REASONS.map((reason) => (
                <option key={reason} value={reason} className="bg-(--bg-page)">
                  {reason}
                </option>
              ))}
            </select>
          </div>

          {/* CUSTOM TEXTAREA IF 'EGYÉB OK' IS SELECTED */}
          {selectedReason === 'Egyéb ok' && (
            <textarea
              rows={3}
              placeholder="Részletezd az okot..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              required
              className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B] resize-none"
            />
          )}

          {/* ACTIONS */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-(--border-subtle) hover:bg-white/10 text-(--text-muted) transition-all cursor-pointer"
            >
              Mégse
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-(--text-main) shadow-lg transition-all cursor-pointer"
            >
              Lemondás megerősítése
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}