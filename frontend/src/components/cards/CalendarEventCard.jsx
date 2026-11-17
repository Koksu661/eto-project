// src/components/CalendarEventCard.jsx
export default function CalendarEventCard({ event, role = 'player', onCancel }) {
  if (!event) return null;

  const isCoach = role?.toLowerCase() === 'coach';

  return (
    <div className="bg-(--bg-page)/90 border border-(--border-subtle) rounded-xl p-3 flex flex-col justify-between gap-2 hover:border-[#B9975B] transition-all">
      <div>
        <h4 className="text-xl font-bold line-clamp-1">{event.title}</h4>
        <p className="text-md text-(--text-muted) font-semibold mt-1">
          {event.startTime} - {event.endTime}
        </p>
        <p className="text-md text-(--text-muted)">
          {event.location}
        </p>
      </div>

      {!isCoach && onCancel && (
        <button
          onClick={() => onCancel(event.id)}
          className="w-full bg-red-500/80 hover:bg-red-600 font-bold py-1 px-2 rounded-xl text-sm transition-colors cursor-pointer mt-1"
        >
          Lemondás
        </button>
      )}
    </div>
  );
}