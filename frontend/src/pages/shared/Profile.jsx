import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/navbars/NavBar';
import logo from '../../assets/logo.png';

export default function Profile() {
  const { currentUser } = useAuth();

  // Beállítások állapota
  const [notifications, setNotifications] = useState({
    emailReminder: true,
    eventChanges: true,
  });

  if (!currentUser) return null;

  const isPlayer = currentUser.role === 'player';

  return (
    <div className="flex flex-col min-h-screen bg-(--bg-page) text-(--text-main) font-futura">
      {/* Automatikusan a bejelentkezett szerepkörhöz tartozó navbart tölti be */}
      <NavBar userName={currentUser.name} role={currentUser.role} />

      <div className="flex-1 p-4 sm:p-6 max-w-4xl w-full mx-auto flex flex-col gap-6">
        
        {/* PAGE TITLE */}
        <div className="border-b border-(--border-subtle) pb-2 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-(--text-main) uppercase tracking-wider">
            Profilod
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/*profile*/}
          <div className="md:col-span-1 bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-6 flex flex-col items-center justify-between backdrop-blur-md shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B9975B]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col items-center gap-4 relative z-10 w-full text-center">
              <div className="w-24 h-24 rounded-full border-2 border-[#B9975B] bg-(--bg-page) flex items-center justify-center text-3xl font-extrabold text-[#B9975B] shadow-lg">
                {currentUser.initials}
              </div>

              <div>
                <h2 className="text-2xl font-extrabold">{currentUser.name}</h2>
              </div>

              {/*bubbles*/}
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="bg-[#B9975B] font-semibold text-sm px-3 py-1 rounded-xl">
                  {currentUser.role}
                </span>
                <span className="bg-(--bg-page) border border-(--border-subtle) font-semibold text-sm px-3 py-1 rounded-xl">
                  {currentUser.team}
                </span>

                {/*Position*/}
                {isPlayer && currentUser.position && (
                  <span className="bg-(--bg-page) border border-(--border-subtle) font-semibold text-sm px-3 py-1 rounded-xl">
                    {currentUser.position}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-(--border-subtle) w-full flex justify-center items-center">
              <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/*személyes adatok*/}
            <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-6 backdrop-blur-md shadow-2xl">
              <h3 className="text-sm font-bold text-[#B9975B] tracking-widest uppercase mb-4">
                {isPlayer ? 'Személyes és Sportolói Adatok' : 'Személyes Adatok'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-(--bg-page)/80 border border-(--border-subtle) p-3 rounded-xl">
                  <p className="text-xs text-(--text-muted)">Telefonszám</p>
                  <p className="font-bold mt-0.5">{currentUser.phone}</p>
                </div>

                <div className="bg-(--bg-page)/80 border border-(--border-subtle) p-3 rounded-xl">
                  <p className="text-xs text-(--text-muted)">Email</p>
                  <p className="font-bold mt-0.5">{currentUser.email}</p>
                </div>

                {/*coach*/}
                {isPlayer && currentUser.coach && (
                  <div className="sm:col-span-2 bg-(--bg-page)/80 border border-(--border-subtle) p-3 rounded-xl">
                    <p className="text-xs text-(--text-muted)">Vezetőedző</p>
                    <p className="font-bold mt-0.5">{currentUser.coach}</p>
                  </div>
                )}
              </div>
            </div>

            {/*account settings*/}
            <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-6 backdrop-blur-md shadow-2xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-[#B9975B] tracking-widest uppercase">
                Beállítások & Biztonság
              </h3>

              <div className="flex flex-col gap-3">
                {/*notification*/}
                {isPlayer && (
                  <div className="flex items-center justify-between bg-(--bg-page)/80 border border-(--border-subtle) p-3 rounded-xl">
                    <div>
                      <p className="text-sm font-bold">Edzés-emlékeztetők</p>
                      <p className="text-xs text-(--text-muted)">E-mail értesítés a közeledő eseményekről</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.emailReminder}
                      onChange={() => setNotifications(prev => ({ ...prev, emailReminder: !prev.emailReminder }))}
                      className="w-5 h-5 accent-[#B9975B] cursor-pointer rounded-xl"
                    />
                  </div>
                )}

                {/*psw change*/}
                <div className="flex items-center justify-between bg-(--bg-page)/80 border border-(--border-subtle) p-3 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-(--text-main)">Jelszó módosítása</p>
                    <p className="text-xs text-(--text-muted)">Biztonsági beállítások frissítése</p>
                  </div>
                  <button className="bg-[#B9975B] hover:bg-[#a6864f] hover:text-black font-semibold text-sm  px-4 py-2 rounded-xl transition-all cursor-pointer">
                    Módosítás
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}