import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useTheme } from '../Theme';

const NavOptionsByRole = {
  admin: [
    { to: '/admin/home', label: 'Főoldal' },
    { to: '/admin/users', label: 'Felhasználók' },
    { to: '/admin/transfers', label: 'Áthelyezések' },
    { to: '/admin/archive', label: 'Edzések archívuma' },
    { to: '/admin/profile', label: 'Profil' },
  ],
  coach: [
    { to: '/coach/home', label: 'Főoldal' },
    { to: '/coach/calendar', label: 'Naptár' },
    { to: '/coach/archive', label: 'Edzések archívuma' },
    { to: '/coach/players', label: 'Játékosok' },
    { to: '/coach/profile', label: 'Profil' },
  ],
  player: [
    { to: '/player/home', label: 'Főoldal' },
    { to: '/player/calendar', label: 'Naptár' },
    { to: '/player/profile', label: 'Profil' },
  ],
};

export default function Navbar({ userName, role }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setMenuOpen(false);
    navigate('/login');
  };

  const { theme, toggleTheme } = useTheme();
  const navItems = NavOptionsByRole[role?.toLowerCase()] || [];

  const getLinkClass = ({ isActive }) =>
    `px-3.5 py-2.5 lg:py-2 rounded-xl text-sm font-bold transition-all duration-200 block whitespace-nowrap ${
      isActive
        ? 'bg-[#B9975B] text-(--text-primary) shadow-md shadow-[#B9975B]/20'
        : 'bg-(--bg-page)/70 border border-(--border-subtle) text-(--text-muted) hover:border-[#B9975B]/60 hover:text-[#B9975B] hover:bg-(--bg-page)'
    }`;

  return (
    <nav className="w-full bg-(--bg-card) border-b-2 border-[#B9975B] sticky top-0 z-50">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-3">
        
        {/*logo and user*/}
        <div className="flex items-center gap-3 min-w-0 justify-self-start">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0"
          />
          <span className="font-futura font-bold text-lg sm:text-xl tracking-wide truncate text-(--text-main)">
            {userName}
          </span>
        </div>

        {/*desktop*/}
        <div className="hidden lg:flex items-center gap-2 font-futura justify-self-center">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={getLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/*logout*/}
        <div className="hidden lg:flex items-center gap-3 justify-self-end">
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Világos mód' : 'Sötét mód'}
            className="px-3.5 py-2 rounded-xl cursor-pointer transition-all bg-(--bg-input) border border-(--border-subtle) hover:border-(--accent-gold) text-(--accent-gold) text-sm font-bold flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Téma:</span>
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-[#B9975B] text-(--text-primary) hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
          >
            Kijelentkezés
          </button>
        </div>

        {/*phone*/}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menü megnyitása"
          className="lg:hidden p-2.5 rounded-xl bg-(--bg-page)/80 border border-(--border-subtle) hover:border-[#B9975B] text-[#B9975B] cursor-pointer transition-all"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/*dropdown*/}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 pt-2 border-t border-(--border-subtle) flex flex-col gap-2 font-futura bg-(--bg-card)">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={getLinkClass}
            >
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            className="mt-1 w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-(--bg-input) border border-(--border-subtle) text-(--accent-gold) cursor-pointer text-center"
          >
            Téma váltás: {theme === 'dark' ? '☀️ Világos' : '🌙 Sötét'}
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-[#B9975B] text-(--text-primary) hover:brightness-110 transition-all cursor-pointer text-center"
          >
            Kijelentkezés
          </button>
        </div>
      )}
    </nav>
  );
}