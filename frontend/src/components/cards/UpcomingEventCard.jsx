import { useState } from 'react';

export default function Card({
  event,
  role = 'player',
  isFeatured = false,
  isJoined = false,
  userRating = null,
  onCancel,
  onJoin,
  onRate,
}) {
  const [showRoster, setShowRoster] = useState(false);

  if (!event) return null;

  const isCoach = role?.toLowerCase() === 'coach';

  const checkedInCount = event.checkedIn?.length ?? 0;
  const cancelledCount = event.cancelled?.length ?? 0;
  const noResponseCount = event.noResponse?.length ?? 0;
  const hasAttendanceData =
    Array.isArray(event.checkedIn) ||
    Array.isArray(event.cancelled) ||
    Array.isArray(event.noResponse);

  return (
    <div className="w-full my-2">
      {/*upcomin event neve*/}
      {isFeatured && (
        <span className="text-2xl font-extrabold text-(--text-main) tracking-widest uppercase mb-2 block">
          {isCoach ? 'Legközelebbi edzésed' : 'Legközelebbi esemény'}
        </span>
      )}

      <div
        className={`bg-(--bg-card)/90 rounded-xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all ${
          isFeatured
            ? 'border-2 border-[#B9975B]'
            : 'border border-(--border-subtle) hover:border-[#B9975B]/80'
        }`}
      >
        {isFeatured && (
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B9975B]/10 rounded-xl blur-3xl pointer-events-none" />
        )}

        <div className="flex flex-col gap-6 relative z-10">
          {/*card*/}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-base font-bold text-(--text-muted) block">
                  {event.date}
                </span>

                {event.team && (
                  <span className="bg-[#B9975B]/20 border border-[#B9975B]/50 text-[#B9975B] font-bold text-xs px-2.5 py-0.5 rounded-xl">
                    {event.team}
                  </span>
                )}

                {!isCoach && isJoined && (
                  <span className="bg-[#027223]/50 border border-[#027223] text-(--text-muted) font-bold text-sm px-2.5 py-0.5 rounded-xl">
                    Belépve
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-main)">
                {event.title}
              </h2>

              {event.description && (
                <p className="text-sm text-(--text-muted) max-w-xl">
                  {event.description}
                </p>
              )}
            </div>

            {/*top right*/}
            <div className="flex flex-col gap-1 bg-(--bg-page)/80 border border-(--border-subtle) p-4 rounded-xl shrink-0 md:text-right">
              <span className="text-base sm:text-lg font-extrabold text-[#B9975B]">
                {event.startTime} - {event.endTime}
              </span>
              <span className="text-(--text-muted) text-sm font-semibold">
                {event.location}
              </span>
            </div>
          </div>

          {/*action bar*/}
          {isCoach ? (
            <div className="flex flex-col gap-4 pt-4 border-t border-(--border-subtle)">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/*jelenlét*/}
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
                  <span className="px-2.5 py-1 rounded-xl bg-[#027223]/50 border border-emerald-500/30 text-(--text-muted)">
                    Belépve: {checkedInCount} fő
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-red-500/50 border border-red-500/50 text-(--text-muted)">
                    Lemondta: {cancelledCount} fő
                  </span>
                  {noResponseCount > 0 && (
                    <span className="px-2.5 py-1 rounded-xl bg-(--bg-page) border border-(--border-subtle) text-(--text-muted)">
                      Nem válaszolt: {noResponseCount} fő
                    </span>
                  )}
                </div>

                {hasAttendanceData && (
                  <button
                    type="button"
                    onClick={() => setShowRoster((prev) => !prev)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-(--bg-page) border border-(--border-subtle) hover:border-[#B9975B] text-[#B9975B] cursor-pointer transition-all"
                  >
                    {showRoster ? 'Lista elrejtése ▲' : 'Jelenléti lista ▼'}
                  </button>
                )}
              </div>

              {/* Expandable Coach Roster Drawer */}
              {showRoster && hasAttendanceData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-(--bg-page)/70 border border-(--border-subtle) rounded-xl p-4 text-xs">
                  <div>
                    <p className="font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                      Visszaigazolt játékosok ({checkedInCount})
                    </p>
                    {checkedInCount === 0 ? (
                      <p className="text-(--text-muted)">Még nincs jelentkező.</p>
                    ) : (
                      <ul className="space-y-1 text-(--text-main)">
                        {event.checkedIn.map((name, idx) => (
                          <li key={idx}>• {name}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-red-400 uppercase tracking-wider mb-1.5">
                      Lemondások ({cancelledCount})
                    </p>
                    {cancelledCount === 0 ? (
                      <p className="text-(--text-muted)">Nincs lemondás.</p>
                    ) : (
                      <ul className="space-y-1 text-(--text-main)">
                        {event.cancelled.map((item, idx) => (
                          <li key={idx}>
                            • <span className="font-bold">{item.name}</span>
                            {item.reason && (
                              <span className="text-(--text-muted)">
                                {' '}— {item.reason}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Player Action Bar */
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-(--border-subtle)">
              {!isJoined ? (
                <>
                  <button
                    onClick={() => onCancel && onCancel(event.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer text-sm"
                  >
                    Lemondás
                  </button>

                  {isFeatured && (
                    <button
                      onClick={() => onJoin && onJoin(event.id)}
                      className="bg-[#027223] hover:bg-[#025a1c] text-white font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer text-sm"
                    >
                      Belépés
                    </button>
                  )}
                </>
              ) : userRating ? (
                <div className="bg-(--bg-page) border border-[#B9975B] text-[#B9975B] font-extrabold py-2 px-4 rounded-xl text-sm">
                  ★ {userRating.rating}/5 Értékelve
                </div>
              ) : (
                <button
                  onClick={() => onRate && onRate(event)}
                  className="bg-[#B9975B] hover:bg-[#a6864f] text-(--text-main) font-semibold py-2 px-4 rounded-xl transition-colors cursor-pointer text-md shadow-lg"
                >
                  Edzés értékelése
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}