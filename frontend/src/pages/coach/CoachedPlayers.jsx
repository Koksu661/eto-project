import { useState } from 'react';
import NavBar from '../../components/navbars/NavBar';
import { useAuth } from '../../context/AuthContext';
import { mockUsersList } from '../../data/MockData';


export default function CoachPlayers() {
  const { currentUser } = useAuth();

  const [players] = useState(mockUsersList);

  const [searchQuery, setSearchQuery] = useState('');

  const normalizeId = (val) =>
    String(val ?? '')
      .trim()
      .replace(/^#/, '')
      .toLowerCase();

  //Userek szűrése
  const filteredPlayers = players.filter((player) => {
    const query = searchQuery.trim().toLowerCase();
    const queryId = normalizeId(searchQuery);

    return (
      player.name.toLowerCase().includes(query) ||
      player.team.toLowerCase().includes(query) ||
      player.position.toLowerCase().includes(query) ||
      (queryId !== '' && normalizeId(player.id).includes(queryId))
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-(--bg-page)/80 text-(--text-main) font-futura">
      <NavBar userName={currentUser.name} role={currentUser.role}/>
      <div className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto flex flex-col gap-6">       
        {/*Header*/}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--border-subtle) pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-(--text-main) uppercase tracking-wider">
              Játékosok áttekintése
            </h1>
          </div>
        </div>

        {/*Search bar*/}
        <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-4 backdrop-blur-md flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Keresés név,azonosító,csapat,pozició alapján..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-(--bg-page) border border-(--border-subtle) rounded-xl px-4 py-2.5 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B]"
          />
        </div>

        {/*Userek listája*/}
        <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-150 table-fixed text-left border-collapse">
              <thead>
                <tr className="border-b border-(--border-subtle) bg-(--bg-page)/60 text-sm uppercase tracking-wider text-[#B9975B]">
                  <th className="p-4 font-extrabold w-[35%]">Név</th>
                  <th className="p-4 font-extrabold w-[20%]">TalentXID</th>
                  <th className="p-4 font-extrabold w-[20%]">Csapat</th>
                  <th className="p-4 font-extrabold w-[20%]">Pozició</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-(--border-subtle) text-sm">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <tr
                      key={player.id}
                      className="hover:bg-(--bg-page)/80 transition-colors"
                    >
                     
                      <td className="p-4 font-bold truncate">
                        {player.name}
                      </td>

                      <td className="p-4 text-(--text-muted)">
                        <span className="bg-(--bg-page)/80 px-3 py-1.5 border border-(--border-subtle) text-sm font-semibold rounded-xl">
                            {player.id}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-[#B9975B] px-3 py-1.5 border border-(--border-subtle) text-sm font-semibold rounded-xl">
                          {player.team}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-(--bg-page) px-3 py-1.5 border border-(--border-subtle) text-sm font-semibold rounded-xl">
                          {player.position}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-(--text-muted) italic text-sm">
                      Nincs a keresési feltételeknek megfelelő felhasználó.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}