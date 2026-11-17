import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/navbars/NavBar';
import FeedbackCard from '../../components/cards/FeedbackCard';
import {
  mockAdminStatsy,
  mockAdminSessions,
  mockActiveTransfers,
} from '../../data/MockData';

export default function AdminHome() {
  const { currentUser } = useAuth();

  const [stats, setStats] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [attendancePeriod, setAttendancePeriod] = useState('daily');
  const [ratingPeriod, setRatingPeriod] = useState('daily');
  const [selectedTeam, setSelectedTeam] = useState('Összes');
  const [expandedSessionId, setExpandedSessionId] = useState(null);

  //mock data
  useEffect(() => {
    setStats(mockAdminStatsy);
    setSessions(mockAdminSessions);
    setTransfers(mockActiveTransfers);
  }, []);

  const teams = ['Összes', 'Felnőtt', 'U19', 'U17', 'U15'];

  const attendanceStats = stats ? stats[attendancePeriod] : null;
  const ratingStats = stats ? stats[ratingPeriod] : null;

  const filteredSessions =
    selectedTeam === 'Összes'
      ? sessions
      : sessions.filter((session) => session.team === selectedTeam);

  //session alert
  const lowRatedSessions = sessions.filter((session) => session.avgRating < 3);

  return (
    <div className="flex flex-col min-h-screen bg-(--bg-page) text-(--text-main) font-futura">
      <NavBar userName={currentUser.name} role="admin"/>

      <div className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto flex flex-col gap-6">
        
        {/*Header*/}
        <div className="border-b border-(--border-subtle) pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold uppercase tracking-wider">
              Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/*KPI cards*/}
            {attendanceStats && ratingStats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/*jelenlét*/}
                <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-md text-(--text-muted) uppercase font-bold">Részvétel</p>
                    <select
                      value={attendancePeriod}
                      onChange={(e) => setAttendancePeriod(e.target.value)}
                      className="bg-(--bg-page)/90 border border-white/25 hover:border-[#B9975B] text-[#B9975B] text-sm font-extrabold rounded-xl px-2 py-1 cursor-pointer focus:outline-none focus:border-[#B9975B]"
                    >
                      <option value="daily">Mai</option>
                      <option value="weekly">7 nap</option>
                      <option value="monthly">30 nap</option>
                      <option value="all">Összes</option>
                    </select>
                  </div>
                  <p className="text-2xl font-extrabold text-(--text-main) mt-1">
                    {attendanceStats.attendanceRate}%
                  </p>
                </div>

                {/*rating*/}
                <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-md text-(--text-muted) uppercase font-bold">Átlag értékelés</p>
                    <select
                      value={ratingPeriod}
                      onChange={(e) => setRatingPeriod(e.target.value)}
                      className="bg-(--bg-page)/90 border border-white/25 hover:border-[#B9975B] text-[#B9975B] text-sm font-extrabold rounded-xl px-2 py-1 cursor-pointer focus:outline-none focus:border-[#B9975B]"
                    >
                      <option value="daily">Mai</option>
                      <option value="weekly">7 nap</option>
                      <option value="monthly">30 nap</option>
                      <option value="all">Összes</option>
                    </select>
                  </div>
                  <p className="text-2xl font-extrabold text-[#B9975B] mt-1">
                    {ratingStats.avgRating} / 5
                  </p>
                </div>

              </div>
            )}

            {/*rating cards*/}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-md font-bold text-[#B9975B] uppercase tracking-widest">
                  Edzés részvételek & értékelések a mai napon
                </h2>

                {/*teams*/}
                <div className="flex flex-wrap gap-1.5">
                  {teams.map((team) => (
                    <button
                      key={team}
                      onClick={() => setSelectedTeam(team)}
                      className={`px-3 py-1 rounded-xl text-sm font-bold cursor-pointer transition-all ${
                        selectedTeam === team
                          ? 'bg-[#B9975B] text-(--text-main)'
                          : 'bg-(--bg-card) border border-(--border-subtle) text-(--text-muted) hover:border-[#B9975B]'
                      }`}
                    >
                      {team}
                    </button>
                  ))}
                </div>
              </div>

              {filteredSessions.length === 0 ? (
                <div className="bg-(--bg-card)/60 border border-(--border-subtle) rounded-xl p-8 text-center text-(--text-muted) text-md italic">
                  Nincs megjeleníthető edzés ehhez a csapathoz.
                </div>
              ) : (
                filteredSessions.map((session) => (
                  <FeedbackCard
                    key={session.id}
                    session={session}
                    isExpanded={expandedSessionId === session.id}
                    onToggle={() =>
                      setExpandedSessionId((prev) =>
                        prev === session.id ? null : session.id
                      )
                    }
                  />
                ))
              )}
            </div>
          </div>

          {/*jobb*/}
          <div className="flex flex-col gap-6">
            
            {/*transfers*/}
            <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-md text-(--text-muted) uppercase font-bold">Aktív áthelyezések</p>
                <Link to="/admin/transfers" className="text-sm text-(--text-muted) hover:text-(--text-main)">
                  Összes →
                </Link>
              </div>

              {transfers.length === 0 ? (
                <p className="text-sm text-(--text-muted) italic py-2 text-center">
                  Jelenleg nincs aktív áthelyezés.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {transfers.map((transfer) => (
                    <div
                      key={transfer.id}
                      className="bg-(--bg-page)/90 border border-white/20 rounded-xl p-2.5 text-sm flex items-center justify-between"
                    >
                      <span className="font-extrabold text-(--text-main)">{transfer.player}
                        <span className="text-xs text-(--text-muted)"> ({transfer.id})</span>
                      </span>
                      <span className="text-xs font-bold text-[#B9975B] bg-[#B9975B]/15 px-2 py-0.5 rounded-full">
                        {transfer.fromTeam} ➔ {transfer.toTeam}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/*alerts*/}
            {lowRatedSessions.length > 0 && (
              <div className="bg-(--bg-card)/90 border border-red-500/80 rounded-xl p-5 flex flex-col gap-3">
                <h2 className="text-md font-bold text-red-400 uppercase tracking-widest">
                  Figyelmeztetések ({lowRatedSessions.length})
                </h2>

                {lowRatedSessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-(--bg-page)/90 border border-(--border-subtle) rounded-xl p-3 text-md text-(--text-muted) space-y-1"
                  >
                    <p className="font-semibold text-red-400">
                      Alacsony edzésértékelés ({session.team})
                    </p>
                    <p className="text-sm text-(--text-muted)">
                      A(z) „{session.title}” átlaga {session.avgRating}/5 lett. Érdemes egyeztetni {session.coach} edzővel.
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}