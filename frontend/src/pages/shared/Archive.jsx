import { useState, useEffect } from 'react';
import Navbar from '../../components/navbars/NavBar';
import FeedbackCard from '../../components/cards/FeedbackCard';
import { useAuth } from '../../context/AuthContext';
import {
  mockArchivedSessions,
  mockAdminSessions,
} from '../../data/MockData';

export default function AdminArchive() {
  const { currentUser } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('Összes');
  const [quickPeriod, setQuickPeriod] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [userIdQuery, setUserIdQuery] = useState('');

  //filters
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [nameQuery, setNameQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [expandedSessionId, setExpandedSessionId] = useState(null);

  useEffect(() => {
    setSessions(mockArchivedSessions || mockAdminSessions || []);
  }, []);

  const teams = ['Összes', 'Felnőtt', 'U19', 'U17', 'U15'];

  const periodPresets = [
    { key: 'all', label: 'Összes időszak' },
    { key: 'today', label: 'Mai' },
    { key: 'week', label: 'Ezen a héten' },
    { key: 'month', label: 'Ebben a hónapban' },
    { key: 'year', label: 'Idén' },
  ];

  //date format
  const toYMD = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  //start & end dátumok a presethez
  const getPresetRange = (preset) => {
    const now = new Date();
    const todayStr = toYMD(now);

    if (preset === 'today') {
      return [todayStr, todayStr];
    }
    if (preset === 'week') {
      const day = now.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
      const monday = new Date(now);
      monday.setDate(now.getDate() + diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      return [toYMD(monday), toYMD(sunday)];
    }
    if (preset === 'month') {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return [toYMD(firstDay), toYMD(lastDay)];
    }
    if (preset === 'year') {
      return [`${now.getFullYear()}-01-01`, `${now.getFullYear()}-12-31`];
    }
    return ['', ''];
  };

  const handleSelectPreset = (key) => {
    setQuickPeriod(key);
    setSelectedDate('');
    setDateFrom('');
    setDateTo('');
  };

  const activeAdvancedCount = [nameQuery.trim(), dateFrom, dateTo].filter(Boolean).length;

  const hasActiveFilters =
    selectedTeam !== 'Összes' ||
    quickPeriod !== 'all' ||
    selectedDate !== '' ||
    userIdQuery.trim() !== '' ||
    activeAdvancedCount > 0;

  const resetFilters = () => {
    setSelectedTeam('Összes');
    setQuickPeriod('all');
    setSelectedDate('');
    setUserIdQuery('');
    setNameQuery('');
    setDateFrom('');
    setDateTo('');
  };

  //TalentX id normalizálása
  const normalizeId = (val) =>
    String(val ?? '')
      .trim()
      .replace(/^#/, '')
      .toLowerCase();

  //Prac date normalizálása
  const normalizeDate = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.replace(/\.\s*/g, '-').replace(/-$/, '');
  };

  const [presetStart, presetEnd] = getPresetRange(quickPeriod);

  const filteredSessions = sessions.filter((session) => {
    //team filter
    if (selectedTeam !== 'Összes' && session.team !== selectedTeam) {
      return false;
    }

    const sessionDate = normalizeDate(session.date);

    //periodok
    if (quickPeriod !== 'all') {
      if (!sessionDate || sessionDate < presetStart || sessionDate > presetEnd) {
        return false;
      }
    }

    //fix dátum
    if (selectedDate && sessionDate !== selectedDate) {
      return false;
    }

    //from - to date 
    if (dateFrom && sessionDate && sessionDate < dateFrom) {
      return false;
    }
    if (dateTo && sessionDate && sessionDate > dateTo) {
      return false;
    }

    //TalentX
    const queryId = normalizeId(userIdQuery);
    if (queryId !== '') {
      const matchesCoach = normalizeId(session.coachId).includes(queryId);
      const matchesAttendeeIds =
        Array.isArray(session.attendeeIds) &&
        session.attendeeIds.some((id) => normalizeId(id).includes(queryId));
      const matchesAttendeeObjects =
        Array.isArray(session.attendees) &&
        session.attendees.some((attendee) =>
          normalizeId(attendee.userId ?? attendee.id).includes(queryId)
        );

      if (!matchesCoach && !matchesAttendeeIds && !matchesAttendeeObjects) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-(--bg-page) text-(--text-main) font-futura">
      <Navbar userName={currentUser.name} role={currentUser.role} />

      <div className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto flex flex-col gap-6">
        {/*header*/}
        <div className="border-b border-(--border-subtle) pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold uppercase tracking-wider">
              Edzések archívuma
            </h1>
          </div>

          <div className="text-sm font-bold text-[#B9975B] bg-(--bg-card) border border-(--border-subtle) px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Találatok: {filteredSessions.length} db
          </div>
        </div>

        {/*filter bar*/}
        <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-2xl p-4 flex flex-col gap-4">
          
          {/*timeframe*/}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-(--border-subtle)">
            <span className="text-sm font-bold text-(--text-muted) uppercase tracking-wider">
              Időszak:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {periodPresets.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handleSelectPreset(preset.key)}
                  className={`px-3 py-1 rounded-xl text-sm font-bold cursor-pointer transition-all ${
                    quickPeriod === preset.key
                      ? 'bg-[#B9975B] text-(--text-main)'
                      : 'bg-(--bg-page)/80 border border-(--border-subtle) text-(--text-muted) hover:border-[#B9975B]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/*search bar*/}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/*date*/}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-(--text-muted) uppercase tracking-wider">
                Konkrét dátum
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setQuickPeriod('all');
                }}
                className="bg-(--bg-page)/80 border border-(--border-subtle) focus:border-[#B9975B] rounded-xl px-3 py-2 text-sm text-(--text-main) focus:outline-none scheme:dark"
              />
            </div>

            {/*TalentX*/}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-(--text-muted) uppercase tracking-wider">
                TalentX ID
              </label>
              <input
                type="text"
                placeholder="Pl. #TX-24"
                value={userIdQuery}
                onChange={(e) => setUserIdQuery(e.target.value)}
                className="bg-(--bg-page)/80 border border-(--border-subtle) focus:border-[#B9975B] rounded-xl px-3 py-2 text-sm text-(--text-main) placeholder:text-(--text-muted) focus:outline-none"
              />
            </div>

            {/*reset*/}
            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className={`w-full py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                  hasActiveFilters
                    ? 'border border-[#B9975B] bg-[#B9975B] hover:text-black cursor-pointer'
                    : 'bg-(--bg-page)/40 border border-(--border-subtle) text-(--text-muted) cursor-not-allowed'
                }`}
              >
                Szűrők törlése
              </button>
            </div>
          </div>

          {/*több filter*/}
          {showMoreFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-(--border-subtle)">
              {/*date from*/}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-(--text-muted) uppercase tracking-wider">
                  Dátumtól
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value);
                    setQuickPeriod('all');
                  }}
                  className="bg-(--bg-page)/80 border border-(--border-subtle) focus:border-[#B9975B] rounded-xl px-3 py-2 text-sm text-(--text-main) focus:outline-none color-scheme:dark"
                />
              </div>

              {/*date to*/}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-(--text-muted) uppercase tracking-wider">
                  Dátumig
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    setQuickPeriod('all');
                  }}
                  className="bg-(--bg-page)/80 border border-(--border-subtle) focus:border-[#B9975B] rounded-xl px-3 py-2 text-sm text-(--text-main) focus:outline-none color-scheme:dark"
                />
              </div>
            </div>
          )}

          {/*teams bar*/}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-(--border-subtle)">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-(--text-muted) uppercase tracking-wider">
                Csapat:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {teams.map((team) => (
                  <button
                    key={team}
                    onClick={() => setSelectedTeam(team)}
                    className={`px-3 py-1 rounded-xl text-sm font-bold cursor-pointer transition-all ${
                      selectedTeam === team
                        ? 'bg-[#B9975B] text-(--text-main)'
                        : 'bg-(--bg-page)/80 border border-(--border-subtle) text-(--text-muted) hover:border-[#B9975B]'
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMoreFilters((prev) => !prev)}
              className="text-sm font-bold uppercase tracking-wider text-[#B9975B] hover:text-(--text-main) bg-(--bg-page)/80 border border-(--border-subtle) hover:border-[#B9975B] px-3 py-1.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
            >
              <span>
                {showMoreFilters ? 'Kevesebb szűrő ▲' : 'További szűrők ▼'}
              </span>
              {activeAdvancedCount > 0 && (
                <span className="bg-[#B9975B] text-[#0A120E] px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
                  {activeAdvancedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/*res*/}
        <div className="flex flex-col gap-4">
          {filteredSessions.length === 0 ? (
            <div className="bg-(--bg-card)/60 border border-(--border-subtle) rounded-2xl p-10 text-center flex flex-col items-center gap-2">
              <p className="text-(--text-muted) font-bold text-md">
                Nincs a keresésnek megfelelő archivált edzés.
              </p>
              <p className="text-sm text-(--text-muted)">
                Próbálj meg másik dátumot, csapatot vagy felhasználói azonosítót megadni.
              </p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div key={session.id} className="flex flex-col gap-1">
                {session.date && (
                  <span className="text-xs font-bold text-(--text-muted) uppercase tracking-widest px-1">
                    {session.date}
                  </span>
                )}
                <FeedbackCard
                  session={session}
                  isExpanded={expandedSessionId === session.id}
                  onToggle={() =>
                    setExpandedSessionId((prev) =>
                      prev === session.id ? null : session.id
                    )
                  }
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}