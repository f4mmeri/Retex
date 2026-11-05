import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface Eval2ScreenProps {
  rating: number;
  reviewComment: string;
  onRatingChange: (val: number) => void;
  onCommentChange: (val: string) => void;
  onFinish: () => void;
}

export const Eval2Screen: React.FC<Eval2ScreenProps> = ({
  rating,
  reviewComment,
  onRatingChange,
  onCommentChange,
  onFinish,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const activeRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex-1 flex flex-col justify-between py-6 text-center">
      <div className="my-auto">
        <h2 className="text-[22px] font-extrabold text-[#132a1c] tracking-tight">
          ¿Qué te pareció el producto?
        </h2>
        <p className="text-[13px] text-[#60796b] max-w-[280px] mx-auto mt-1 mb-5 leading-relaxed">
          Tu valoración impulsa a los talleres locales de confección sostenible.
        </p>

        {/* Rating Card */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-4 shadow-xs max-w-[320px] mx-auto">
          <span className="text-[12px] font-medium text-[#60796b] block mb-2">
            Calidad de acabado y confección
          </span>

          <div className="flex items-center justify-center gap-2 my-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onRatingChange(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className="transition-transform hover:scale-125 focus:outline-none cursor-pointer"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    activeRating >= star
                      ? 'fill-[#f59e0b] text-[#f59e0b]'
                      : 'text-[#d1d5db]'
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={reviewComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="¿Qué detalles destacarías del producto upcycling?"
            rows={3}
            className="w-full bg-[#f8faf8] border border-[#e2ece5] rounded-xl p-2.5 text-[12.5px] text-[#132a1c] outline-none focus:border-[#1e5c3c] transition-all resize-none mt-2"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={onFinish}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Finalizar e ir al Catálogo</span>
        </button>
      </div>
    </div>
  );
};
