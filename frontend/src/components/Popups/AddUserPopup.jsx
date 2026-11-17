import { useState } from 'react';

const ROLES = ['Játékos', 'Edző', 'Admin'];
const TEAMS = ['U17', 'U19', 'Felnőtt', 'Vezetőség'];

export default function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [team, setTeam] = useState(TEAMS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onAddUser({
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      role,
      team
    });

    // Reset form & close
    setName('');
    setEmail('');
    setRole(ROLES[0]);
    setTeam(TEAMS[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-(--bg-card) border border-[#B9975B] w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-5 text-(--text-main) font-futura">
        <div>
          <h3 className="text-xl font-extrabold text-[#B9975B]">Új felhasználó hozzáadása</h3>
          <p className="text-xs text-(--text-muted) mt-1">Add meg a fiók adatait és a jogosultsági szintet.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* NÉV */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-(--text-muted) uppercase">Teljes név</label>
            <input
              type="text"
              required
              placeholder="pl. Kiss Péter"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B]"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-(--text-muted) uppercase">E-mail cím</label>
            <input
              type="email"
              required
              placeholder="pl. kiss.peter@csapat.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B]"
            />
          </div>

          {/* SZEREPKÖR & CSAPAT */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-(--text-muted) uppercase">Szerepkör</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) focus:outline-none focus:border-[#B9975B] cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r} className="bg-(--bg-page)">{r}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-(--text-muted) uppercase">Csapat</label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) focus:outline-none focus:border-[#B9975B] cursor-pointer"
              >
                {TEAMS.map((t) => (
                  <option key={t} value={t} className="bg-(--bg-page)">{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-(--border-subtle) mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-(--border-subtle) hover:bg-white/10 text-(--text-muted) transition-all cursor-pointer"
            >
              Mégse
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#027223] hover:bg-[#025a1c] text-(--text-main) shadow-lg transition-all cursor-pointer"
            >
              Létrehozás
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}