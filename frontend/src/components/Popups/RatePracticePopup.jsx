import { useState } from 'react';

const SCORE_LEVELS = {
  1: { emoji: '💀', label: 'Káosz', color: 'text-red-400', badgeBg: 'bg-red-500/20 border-red-500/50' },
  2: { emoji: '🥴', label: 'Gyenge', color: 'text-orange-400', badgeBg: 'bg-orange-500/20 border-orange-500/50' },
  3: { emoji: '😐', label: 'Elment', color: 'text-amber-300', badgeBg: 'bg-amber-500/20 border-amber-500/50' },
  4: { emoji: '😎', label: 'Okés', color: 'text-[#B9975B]', badgeBg: 'bg-[#B9975B]/20 border-[#B9975B]/50' },
  5: { emoji: '🔥', label: 'Brutál jó', color: 'text-emerald-400', badgeBg: 'bg-[#027223]/30 border-[#027223]' },
};

export default function RateSessionModal({ isOpen, sessionTitle, onClose, onSubmitRating }) {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const currentLevel = SCORE_LEVELS[rating];
  const fillPercentage = ((rating - 1) / 4) * 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRating({
      rating,
      emoji: currentLevel.emoji,
      comment: comment.trim(),
    });

    setRating(4);
    setComment('');
    onClose();
  };

  const handleClose = () => {
    setRating(4);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-(--bg-card) border border-[#B9975B] w-full max-w-md rounded-xl p-6 shadow-2xl flex flex-col gap-5 font-futura">
        
        {/*Header*/}
        <div>
          <span className="text-sm font-bold uppercase tracking-widest text-[#B9975B]">
            Edzés értékelése
          </span>
          <h3 className="text-xl font-extrabold text-(--text-main) mt-0.5">
            {sessionTitle}
          </h3>
          <p className="text-xs text-(--text-muted) mt-1">
            Húzd a csúszkát 1-től 5-ig vagy nyomj egy emojira.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/*Slider*/}
          <div className="flex flex-col gap-4 bg-(--bg-page)/90 border border-(--border-subtle) rounded-xl p-4">
            
            {/*Rating*/}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl select-none transition-transform duration-150 scale-110">
                  {currentLevel.emoji}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#B9975B]">{rating}</span>
                  <span className="text-sm font-bold text-(--text-muted)">/ 5</span>
                </div>
              </div>

              <span className={`text-sm font-extrabold px-3 py-1 rounded-xl border ${currentLevel.badgeBg} ${currentLevel.color}`}>
                {currentLevel.label}
              </span>
            </div>

            {/* RANGE SLIDER (1–5) */}
            <div className="relative flex items-center py-1">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #B9975B 0%, #B9975B ${fillPercentage}%, rgba(255,255,255,0.15) ${fillPercentage}%, rgba(255,255,255,0.15) 100%)`
                }}
                className="w-full h-2.5 rounded-xl appearance-none cursor-pointer accent-[#B9975B] focus:outline-none"
              />
            </div>

            {/*Emojis*/}
            <div className="flex justify-between px-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    rating === num
                      ? 'bg-[#B9975B]/20 border border-[#B9975B] scale-110'
                      : 'opacity-70 hover:opacity-100 border border-transparent'
                  }`}
                >
                  <span className="text-xl leading-none">{SCORE_LEVELS[num].emoji}</span>
                  <span className={`text-sm font-extrabold ${rating === num ? 'text-[#B9975B]' : 'text-(--text-muted)'}`}>
                    {num}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/*Feedback válaszok*/}
          <div className="flex flex-col gap-1.5">
            <label className="text-md font-bold">
              Mennyire érezted hasznosnak a mai edzést a saját fejlődésed szempontjából?
            </label>
            <textarea
              rows={3}
              placeholder="Írd le röviden a visszajelzésed..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B] resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-md font-bold">
              Mennyire vagy elégedett a mai edzésen nyújtott saját teljesítményeddel?
            </label>
            <textarea
              rows={3}
              placeholder="Írd le röviden a visszajelzésed..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-(--bg-page) border border-(--border-subtle) rounded-xl p-3 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B] resize-none"
            />
          </div>

          {/*Action bar*/}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-(--border-subtle)">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-md font-bold border border-(--border-subtle) hover:bg-white/10 text-(--text-muted) transition-all cursor-pointer"
            >
              Mégse
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-md font-bold bg-[#027223] hover:bg-[#025a1c] text-(--text-main) shadow-lg transition-all cursor-pointer"
            >
              Értékelés küldése
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}