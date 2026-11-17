export default function FeedbackCard({ session, isExpanded, onToggle }) {
  if (!session) return null;

  const isLowRated = session.avgRating < 3;
  return (
    <div
      className={`bg-(--bg-card)/90 rounded-xl p-5 border transition-all backdrop-blur-md shadow-xl ${
        isLowRated ? 'border-red-500/80' : 'border-(--border-subtle) hover:border-[#B9975B]/60'
      }`}
    >
      {/*Header*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#B9975B] font-bold px-2.5 py-0.5 rounded-xl">
              {session.team}
            </span>
            <span className="text-(--text-muted) font-semibold">
              Edző: {session.coach} • {' '}
              {session.date && `${session.date} • `}
              {session.time}
            </span>
          </div>
          <h3 className="text-xl font-bold text-(--text-main) mt-1.5">
            {session.title}
          </h3>
        </div>

        {/*ratin*/}
        <div className="flex items-center gap-2 bg-(--bg-page)/80 border border-(--border-subtle) px-3.5 py-2 rounded-xl shrink-0 self-start sm:self-center">
          <div>
            <p className="text-lg font-extrabold text-[#B9975B]">
              {session.avgRating} / 5
            </p>
          </div>
        </div>
      </div>

      {/*footer*/}
      <div className="mt-4 pt-3 border-t border-(--border-subtle) flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex flex-wrap gap-3 font-bold">
          {session.checkedIn && (
            <div className="bg-[#027223] rounded-xl px-2.5 py-0.5">
                <span className="font-bold">
                {session.checkedIn.length} Belépett
                </span>
            </div>
          )}
          {session.cancelled && (
            <div className="bg-red-500 rounded-xl px-2.5 py-0.5">
              <span className="font-bold">
                {session.cancelled.length} Lemondta
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="text-[#B9975B] hover:underline font-bold cursor-pointer"
        >
          {isExpanded ? 'Részletek elrejtése ▲' : 'Részletek & Vélemények ▼'}
        </button>
      </div>

      {/*Details*/}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-(--border-subtle) flex flex-col gap-4">
          
          {/*jelenlét*/}
          {(session.checkedIn || session.cancelled) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/*logged in*/}
              <div className="bg-(--bg-page)/80 border border-[#027223] rounded-xl p-3">
                <p className="font-bold mb-1.5 text-lg">Belépett játékosok</p>
                {!session.checkedIn || session.checkedIn.length === 0 ? (
                  <p className="text-(--text-muted) italic">Senki sem lépett be</p>
                ) : (
                  <ul className="text-(--text-muted) text-md font-bold">
                    {session.checkedIn.map((name) => (
                      <li key={name}>•{name}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/*lemondta*/}
              <div className="bg-(--bg-page)/80 border border-red-500/80 rounded-xl p-3">
                <p className="font-bold mb-1.5 text-lg">Lemondások & Indok</p>
                {!session.cancelled || session.cancelled.length === 0 ? (
                  <p className="text-(--text-muted) italic">Nincs lemondás</p>
                ) : (
                  <ul className="text-(--text-muted)">
                    {session.cancelled.map((c) => (
                      <li key={c.name}>•
                        <strong className="text-md font-bold">{c.name}:</strong>{' '}
                        <span className="text-(--text-muted)">{c.reason}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>          
            </div>
          )}

          {/*player's ratings*/}
          <div className="bg-(--bg-page)/80 border border-(--border-subtle) rounded-xl p-3">
            <p className="font-bold text-[#B9975B] mb-2">Játékos értékelések</p>
            {session.ratings.length === 0 ? (
              <p className="text-(--text-muted) italic">Még nem érkezett értékelés.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {session.ratings.map((rating, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-2 bg-(--bg-card) p-2.5 rounded-xl border border-(--border-subtle)"
                  >
                    <div>
                      <p className="font-bold text-(--text-main)">{rating.player}</p>
                      <p className="text-(--text-muted) mt-0.5">
                        {rating.comment ? (
                          `"${rating.comment}"`
                        ) : (
                          <span className="italic text-(--text-muted)">Nincs szöveges megjegyzés</span>
                        )}
                      </p>
                    </div>
                    <span className="font-extrabold text-[#B9975B] shrink-0">
                      {rating.emoji} {rating.score}/5
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}