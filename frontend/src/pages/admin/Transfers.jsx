import { useState, useRef, useEffect } from 'react';
import NavBar from '../../components/navbars/NavBar';
import { useAuth } from '../../context/AuthContext';
import {mockUsersList, mockTeamSessions} from '../../data/MockData';

const TEAMS = ['U17', 'U18', 'U19', 'Felnőtt'];

export default function TeamTransfers() {
  const { currentUser } = useAuth();
  const players = mockUsersList.filter((user) => user.role === 'player');

  const [transfers, setTransfers] = useState([]);

  //player pick
  const [playerSearch, setPlayerSearch] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isPlayerDropdownOpen, setIsPlayerDropdownOpen] = useState(false);
  const playerPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (playerPickerRef.current && !playerPickerRef.current.contains(event.target)) {
        setIsPlayerDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //to team
  const [targetTeam, setTargetTeam] = useState('U18');
  const [selectedSessionIds, setSelectedSessionIds] = useState([]);
  const [listSearchQuery, setListSearchQuery] = useState('');

  const normalizeId = (val) =>
    String(val ?? '')
      .trim()
      .replace(/^#/, '')
      .toLowerCase();

  //player fitler
  const filteredPlayers = players.filter((player) => {
    const query = playerSearch.toLowerCase();
    const queryId = normalizeId(playerSearch);

    return (
      player.name.toLowerCase().includes(query) ||
      player.team.toLowerCase().includes(query) ||
      player.email.toLowerCase().includes(query) ||
      (queryId !== '' && normalizeId(player.id).includes(queryId))
    );
  });

  //prac picker
  const availableTeamSessions = mockTeamSessions.filter((session) => session.team === targetTeam);

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
    setPlayerSearch(player.name);
    setIsPlayerDropdownOpen(false);
    setSelectedSessionIds([]);
  };

  const handleTargetTeamChange = (newTeam) => {
    setTargetTeam(newTeam);
    setSelectedSessionIds([]);
  };

  const toggleSessionSelection = (sessionId) => {
    setSelectedSessionIds((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleAssignTransfer = (e) => {
    e.preventDefault();
    if (!selectedPlayer) {
      alert("Válassz ki egy játékost a listából!");
      return;
    }
    if (selectedSessionIds.length === 0) {
      alert("Válassz ki legalább egy eseményt / edzést!");
      return;
    }

    const chosenSessions = availableTeamSessions.filter((session) =>
      selectedSessionIds.includes(session.id)
    );

    const newTransfer = {
      id: Date.now(),
      playerId: selectedPlayer.id,
      playerName: selectedPlayer.name,
      fromTeam: selectedPlayer.team,
      toTeam: targetTeam,
      sessions: chosenSessions
    };

    setTransfers((prev) => [newTransfer, ...prev]);

    setSelectedPlayer(null);
    setPlayerSearch('');
    setSelectedSessionIds([]);
  };

  const handleRevokeTransfer = (transferId) => {
    setTransfers((prev) => prev.filter((transfer) => transfer.id !== transferId));
  };


  const filteredTransfers = transfers.filter((transfer) => {
    const q = listSearchQuery.toLowerCase();
    return (
      transfer.playerName.toLowerCase().includes(q) ||
      transfer.fromTeam.toLowerCase().includes(q) ||
      transfer.toTeam.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-(--bg-page) text-(--text-main) font-futura">
      <NavBar userName={currentUser.name} role={currentUser.role} />

      <div className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto flex flex-col gap-6">
        
        {/*header*/}
        <div className="border-b border-(--border-subtle) pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-extrabold uppercase tracking-wider">
              Ideiglenes Áthelyezések
            </h1>
          </div>
          <span className="text-sm font-bold text-[#B9975B] bg-(--bg-card) border border-(--border-subtle) px-3 py-1.5 rounded-xl">
            Aktív áthelyezések: {transfers.length} fő
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/*bal oszlop*/}
          <div className="lg:col-span-5 bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-6 backdrop-blur-md shadow-2xl h-fit">
            <h2 className="text-xl font-bold text-[#B9975B] tracking-widest uppercase mb-4">
              Új ideiglenes áthelyezés
            </h2>

            <form onSubmit={handleAssignTransfer} className="flex flex-col gap-4">
              
              {/*player search*/}
              <div ref={playerPickerRef} className="flex flex-col gap-1.5 relative">
                <label className="text-md font-bold text-(--text-muted) uppercase">
                  1. Játékos keresése
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Kezdd el írni a játékos nevét,csapatát,azonosítóját..."
                    value={playerSearch}
                    onFocus={() => setIsPlayerDropdownOpen(true)}
                    onChange={(e) => {
                      setPlayerSearch(e.target.value);
                      setSelectedPlayer(null);
                      setIsPlayerDropdownOpen(true);
                    }}
                    className="w-full bg-(--bg-page)/80 border border-(--border-subtle) rounded-xl p-3 pr-9 text-sm placeholder-slate-500 focus:outline-none focus:border-[#B9975B]"
                  />
                  {playerSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setPlayerSearch('');
                        setSelectedPlayer(null);
                        setIsPlayerDropdownOpen(true);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-main) text-sm font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/*dropdown*/}
                {isPlayerDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-(--bg-page)/80 border border-[#B9975B] rounded-xl shadow-2xl max-h-48 overflow-y-auto custom-scrollbar z-30">
                    {filteredPlayers.length > 0 ? (
                      filteredPlayers.map((player) => (
                        <button
                          key={player.id}
                          type="button"
                          onClick={() => handleSelectPlayer(player)}
                          className="w-full text-left px-4 py-2.5 hover:bg-(--bg-card) border-b border-white/10 last:border-b-0 flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <div>
                            <p className="text-sm font-bold text-(--text-main)">{player.name}
                              <span className="text-sm text-(--text-muted)"> ({player.id})</span>
                            </p>
                            <p className="text-xs text-(--text-muted)">{player.email}</p>
                          </div>
                          <span className="text-xs font-bold text-[#B9975B] bg-(--bg-card) border border-(--border-subtle) px-2.5 py-0.5 rounded-xl">
                            {player.team}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-xs text-(--text-muted) italic text-center">
                        Nincs találat erre a névre.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/*transfer preview*/}
              {selectedPlayer && (
                <div className="flex items-center justify-between bg-(--bg-page)/80 border border-[#B9975B]/50 rounded-xl p-3 text-sm">
                  <div className="text-center flex-1">
                    <span className="text-(--text-muted) block text-xs uppercase">Alap keret</span>
                    <span className="font-extrabold text-sm">{selectedPlayer.team}</span>
                  </div>
                  <span className="text-[#B9975B] font-extrabold text-base px-2">➔</span>
                  <div className="text-center flex-1">
                    <span className="text-(--text-muted) block text-xs uppercase">Cél csapat</span>
                    <span className="font-extrabold text-[#B9975B] text-sm">{targetTeam}</span>
                  </div>
                </div>
              )}

              {/*to team picker*/}
              <div className="flex flex-col gap-1.5">
                <label className="text-md font-bold text-(--text-muted) uppercase">
                  2. Cél csapat kiválasztása
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {TEAMS.map((team) => {
                    const isOwnTeam = selectedPlayer?.team === team;
                    return (
                      <button
                        key={team}
                        type="button"
                        disabled={isOwnTeam}
                        onClick={() => handleTargetTeamChange(team)}
                        className={`py-2 rounded-xl text-sm font-extrabold border transition-all ${
                          isOwnTeam
                            ? 'opacity-30 border-white/10 text-(--text-muted) cursor-not-allowed'
                            : targetTeam === team
                            ? 'bg-[#B9975B] text-(--text-main) border-[#B9975B] cursor-pointer'
                            : 'bg-(--bg-page)/80 text-(--text-muted) border-(--border-subtle) hover:border-[#B9975B]/60 cursor-pointer'
                        }`}
                      >
                        {team}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/*to team pracs*/}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-md font-bold text-(--text-muted) uppercase">
                    3. {targetTeam} következő eseményei
                  </label>
                  <span className="text-sm text-[#B9975B] font-bold">
                    {selectedSessionIds.length} kiválasztva
                  </span>
                </div>

                <div className="flex flex-col gap-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                  {availableTeamSessions.length > 0 ? (
                    availableTeamSessions.map((session) => {
                      const isChecked = selectedSessionIds.includes(session.id);
                      return (
                        <div
                          key={session.id}
                          onClick={() => toggleSessionSelection(session.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isChecked
                              ? 'bg-[#027223]/25 border-[#027223]'
                              : 'bg-(--bg-page)/80 border-(--border-subtle) hover:border-[#B9975B]/60'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-1 w-4 h-4 accent-[#027223] cursor-pointer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-sm font-extrabold">
                                {session.title}
                              </h4>
                              <span className="text-sm font-bold text-[#B9975B]">
                                {session.date}
                              </span>
                            </div>
                            <p className="text-xs text-(--text-muted) mt-0.5">
                              {session.startTime} - {session.endTime} • {session.location}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-(--bg-page)/80 border border-white/20 rounded-xl p-4 text-center text-xs text-(--text-muted) italic">
                      Nincs kiírt esemény az {targetTeam} csapatnak.
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#027223] hover:bg-[#025a1c] font-bold text-md py-3 rounded-xl transition-all cursor-pointer shadow-lg mt-1"
              >
                Játékos hozzárendelése
              </button>
            </form>
          </div>

          {/*right*/}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/*transfer search*/}
            <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-3 backdrop-blur-md">
              <input
                type="text"
                placeholder="Keresés az aktív áthelyezések között (név, U17, U18)..."
                value={listSearchQuery}
                onChange={(e) => setListSearchQuery(e.target.value)}
                className="w-full bg-(--bg-page)/80 border border-(--border-subtle) rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-[#B9975B]"
              />
            </div>

            {/*active transferek*/}
            <div className="flex flex-col gap-3">
              {filteredTransfers.length > 0 ? (
                filteredTransfers.map((item) => (
                  <div
                    key={item.id}
                    className="bg-(--bg-card)/90 border border-(--border-subtle) hover:border-[#B9975B]/60 rounded-xl p-5 backdrop-blur-md shadow-xl flex flex-col gap-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-extrabold">{item.playerName} 
                          <span className="text-lg text-(--text-muted)"> ({item.playerId})</span>
                        </h3>
                        <div className="flex items-center gap-1.5 bg-(--bg-page)/80 border border-(--border-subtle) px-3 py-1 rounded-xl text-sm font-bold">
                          <span className="text-(--text-muted)">{item.fromTeam}</span>
                          <span className="text-[#B9975B]">➔</span>
                          <span className="text-[#B9975B]">{item.toTeam}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRevokeTransfer(item.id)}
                        className="bg-red-500/80 hover:bg-red-600 font-bold text-sm px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Visszavonás ({item.fromTeam})
                      </button>
                    </div>

                    {/*transfer*/}
                    {item.sessions && item.sessions.length > 0 ? (
                      <div className="flex flex-col gap-1.5 pt-3 border-t border-white/15">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.sessions.map((session) => (
                            <div
                              key={session.id}
                              className="bg-(--bg-page)/80 border border-(--border-subtle) rounded-xl px-3 py-2 text-md"
                            >
                              <p className="font-bold text-[#B9975B]">{session.title}</p>
                              <p className="text-xs text-(--text-muted) font-bold">
                                {session.date} • {session.startTime} - {session.endTime} 
                              </p>
                            </div>
                          ))}
                          <div className="bg-(--bg-page)/80 border border-(--border-subtle) rounded-xl px-3 py-2 flex flex-col justify-center gap-0.5">
                            <p className="text-(--text-muted) text-md font-bold">
                              Létrehozta: {item.createdBy || currentUser.name}
                            </p>
                            <p className="text-(--text-muted) text-xs font-bold">
                              {new Date(item.createdAt || item.id).toLocaleString('hu-HU', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      item.note && (
                        <p className="text-xs text-(--text-muted) pt-2 border-t border-white/15">
                          {item.note}
                        </p>
                      )
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-(--bg-card)/60 border border-(--border-subtle) rounded-xl p-10 text-center text-(--text-muted) italic text-sm">
                  Nincs aktív ideiglenes áthelyezés.
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}