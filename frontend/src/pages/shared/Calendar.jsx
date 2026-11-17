import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/navbars/NavBar';
import CalendarEventCard from '../../components/cards/CalendarEventCard';
import CancelModal from '../../components/Popups/CancelEventPopup';
import { mockAuthUsers, mockEvents } from '../../data/MockData';

const WEEK_DAYS = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

export default function Calendar({ role }) {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState(mockEvents);
  const [cancellingEvent, setCancellingEvent] = useState(null);

  const activeUser = currentUser || mockAuthUsers.find((u) => u.role === role) || mockAuthUsers[0];
  const activeRole = (role || activeUser.role)?.toLowerCase();
  const isCoach = activeRole === 'coach';

  const getMonday = (d) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentWeekMonday = getMonday(today);
  const [activeMonday, setActiveMonday] = useState(currentWeekMonday);

  const weekDaysList = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(activeMonday);
    d.setDate(activeMonday.getDate() + i);
    return d;
  });

  const isCurrentWeek = activeMonday.getTime() === currentWeekMonday.getTime();

  const handlePrevWeek = () => {
    if (isCurrentWeek) return;
    const prev = new Date(activeMonday);
    prev.setDate(prev.getDate() - 7);
    setActiveMonday(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(activeMonday);
    next.setDate(next.getDate() + 7);
    setActiveMonday(next);
  };

  const handleConfirmCancel = (reason) => {
    console.log(`Esemény (${cancellingEvent.id}) lemondva. Indok:`, reason);
    // Simple array filter on cancellation
    setEvents((prev) => prev.filter((e) => e.id !== cancellingEvent.id));
    setCancellingEvent(null);
  };

  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const isToday = (day) => day.getTime() === today.getTime();

  return (
    <div className="flex flex-col min-h-screen lg:max-h-screen bg-(--bg-page) text-(--text-main) font-futura lg:overflow-hidden">
      <NavBar userName={activeUser.name} role={activeRole} />

      {!isCoach && (
        <CancelModal
          isOpen={!!cancellingEvent}
          eventTitle={cancellingEvent?.title}
          onClose={() => setCancellingEvent(null)}
          onConfirm={handleConfirmCancel}
        />
      )}

      <div className="flex-1 flex flex-col p-4 lg:overflow-hidden">
        
        {/*heti nav*/}
        <div className="grid grid-cols-3 items-center gap-2 mb-4 px-1">
          <div className="justify-self-start">
            <button 
              onClick={handlePrevWeek}
              disabled={isCurrentWeek}
              className={`px-3 sm:px-4 py-2 rounded-xl text-md sm:text-sm font-bold transition-all whitespace-nowrap ${
                isCurrentWeek 
                  ? 'opacity-30 text-(--text-muted) cursor-not-allowed' 
                  : 'bg-[#B9975B] hover:bg-[#a6864f] cursor-pointer'
              }`}
            >
              ‹ Előző hét
            </button>
          </div>

          <span className="text-base sm:text-lg font-extrabold tracking-wide text-[#B9975B] uppercase text-center leading-tight">
            {activeMonday.toLocaleDateString('hu-HU', { month: 'long', year: 'numeric' })}
          </span>

          <div className="justify-self-end">
            <button 
              onClick={handleNextWeek}
              className="px-3 sm:px-4 py-2 rounded-xl text-md sm:text-sm font-bold bg-[#B9975B] hover:bg-[#a6864f] transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="sm:hidden">Köv. hét ›</span>
              <span className="hidden sm:inline">Következő hét ›</span>
            </button>
          </div>
        </div>

        {/*days grid*/}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:overflow-hidden">
          {weekDaysList.map((date, index) => {
            const dateKey = formatDateKey(date);

            const dayEvents = events.filter((evt) => evt.date === dateKey);
            const activeToday = isToday(date);

            return (
              <div 
                key={dateKey}
                className={`flex flex-col min-h-32.5 lg:h-full rounded-xl p-3 border backdrop-blur-md transition-all lg:overflow-hidden ${
                  activeToday 
                    ? 'bg-(--bg-card) border-[#B9975B] shadow-lg shadow-[#B9975B]/10' 
                    : 'bg-(--bg-card)/60 border-(--border-subtle)'
                }`}
              >
                {/*day header*/}
                <div className="text-center pb-3 border-b border-(--border-subtle) shrink-0">
                  <span className={`text-xs font-bold tracking-wider uppercase block ${activeToday ? 'text-[#B9975B]' : 'text-(--text-muted)'}`}>
                    {WEEK_DAYS[index]}
                  </span>
                  <span className={`text-lg font-extrabold ${activeToday ? 'text-(--text-main)' : 'text-(--text-muted)'}`}>
                    {date.getDate()}
                  </span>
                </div>

                {/*event lista*/}
                <div className="flex-1 flex flex-col gap-2.5 mt-3 lg:overflow-y-auto pr-0.5 custom-scrollbar">
                  {dayEvents.length > 0 ? (
                    dayEvents.map((event) => (
                      <CalendarEventCard 
                        key={event.id} 
                        event={event} 
                        role={activeRole}
                        onCancel={() => setCancellingEvent(event)} 
                      />
                    ))
                  ) : (
                    <div className="flex-1 flex items-center justify-center py-4">
                      <span className="text-[11px] text-(--text-muted) italic text-center">Nincs esemény</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}