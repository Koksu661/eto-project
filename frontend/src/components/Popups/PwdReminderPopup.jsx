import { useState } from 'react';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [resetEmail, setResetEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setIsSent(true);
  };

  const handleCloseForgotModal = () => {
    setResetEmail('');
    setIsSent(false);
    onClose();
  };

  return (
    <div
      onClick={handleCloseForgotModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-futura"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-(--bg-card) border border-(--border-subtle) rounded-xl p-6 shadow-2xl text-(--text-main) overflow-hidden"
      >
        {/*header*/}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-(--border-subtle) relative z-10">
          <h3 className="text-lg font-extrabold uppercase tracking-wider text-[#B9975B]">
            Jelszó visszaállítása
          </h3>
        </div>

        {isSent ? (
          <div className="flex flex-col gap-4 relative z-10">
            <div className="bg-[#027223]/20 border border-[#027223] rounded-xl p-4 text-sm text-(--text-muted) leading-relaxed">
              A jelszó-visszaállító útmutatót elküldtük a(z){' '}
              <span className="font-bold text-[#B9975B]">{resetEmail}</span> címre.
            </div>

            <button
              type="button"
              onClick={handleCloseForgotModal}
              className="w-full bg-[#B9975B] hover:bg-[#a6864f] text-(--text-main) text-md font-extrabold py-3 rounded-xl transition-all cursor-pointer"
            >
              Vissza a bejelentkezéshez
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4 relative z-10">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-(--text-muted) uppercase">
                E-mail cím
              </label>
              <input
                type="email"
                required
                placeholder="abc123@gmail.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/20">
              <button
                type="button"
                onClick={handleCloseForgotModal}
                className="px-4 py-2.5 rounded-xl text-sm font-bold border border-(--border-subtle) hover:bg-white/10 text-(--text-muted) transition-all cursor-pointer"
              >
                Mégse
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#027223] hover:bg-[#025a1c] text-(--text-main) shadow-lg transition-all cursor-pointer"
              >
                Link küldése
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}