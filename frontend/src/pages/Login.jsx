import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockAuthUsers } from '../data/MockData';
import logo from '../assets/logo.png';
import PwdReminderPopup from '../components/Popups/PwdReminderPopup';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  //pwd forgot modal state
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  //role based redirection
  const redirectByRole = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin/home');
        break;
      case 'coach':
        navigate('/coach/home');
        break;
      case 'player':
      default:
        navigate('/player/home');
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }

    redirectByRole(result.user.role);
  };

  //demo login
  const handleQuickLogin = (mockUser) => {
    const result = login(mockUser.email, mockUser.password);
    if (result.success) {
      redirectByRole(result.user.role);
    }
  };

  //forgotten pwd 
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSent(true);
  };

  const handleCloseForgotModal = () => {
    setIsForgotOpen(false);
    setResetSent(false);
    setResetEmail('');
  };

  return (
    <div className="min-h-screen bg-(--bg-page) text-(--text-main) font-futura flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B9975B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* FORGOT PASSWORD MODAL */}
      {isForgotOpen && (
        <PwdReminderPopup
          isOpen={isForgotOpen}
          onClose={handleCloseForgotModal}
        />
      )}

      {/* MAIN LOGIN CARD */}
      <div className="w-full max-w-md bg-(--bg-card)/90 border border-(--border-subtle) rounded-2xl p-8 backdrop-blur-md shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <img src={logo} alt="Klub Logó" className="w-32 h-32 object-contain" />
          <div>
            <h1 className="text-2xl font-extrabold text-(--text-main) uppercase tracking-wider">
              Bejelentkezés
            </h1>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 text-xs font-bold px-4 py-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* E-MAIL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wider">
              E-mail cím
            </label>
            <input
              type="email"
              required
              placeholder="pelda@csapat.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B] transition-colors"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wider">
                Jelszó
              </label>
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setIsForgotOpen(true);
                }}
                className="text-xs font-semibold text-[#B9975B] hover:text-[#d4b275] transition-colors cursor-pointer"
              >
                Jelszó emlékeztető?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 pr-11 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#027223] hover:bg-[#025a1c] text-(--text-main) font-bold text-sm py-3 rounded-xl transition-all cursor-pointer shadow-lg mt-2"
          >
            Belépés
          </button>
        </form>

        {/* Quick demo login */}
        <div className="pt-4 border-t border-(--border-subtle) flex flex-col gap-2.5">
          <p className="text-sm font-bold text-[#B9975B] uppercase tracking-wider text-center">
            Teszt fiókok (1 kattintásos belépés)
          </p>

          <div className="grid grid-cols-3 gap-2">
            {mockAuthUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleQuickLogin(user)}
                className="bg-(--bg-page) hover:bg-[#B9975B] hover:text-[#0A120E] border border-(--border-subtle) hover:border-[#B9975B] text-(--text-muted) font-bold text-xs py-2.5 px-2 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-0.5"
              >
                <span>{user.role}</span>
                <span className="text-[10px] opacity-70 font-normal truncate max-w-full">
                  {user.name}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}