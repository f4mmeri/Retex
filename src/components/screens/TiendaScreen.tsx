import React, { useState } from 'react';
import { Star, Info, Gift, ShoppingBag, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS, RETEX_LOGO_URL } from '../../data/products';

interface TiendaScreenProps {
  points: number;
  onSelectProduct: (index: number) => void;
  onGoToGiftCards: () => void;
}

type CategoryFilter = 'Todos' | 'Canastas' | 'Fundas de Almohadas' | 'Gorros';

export const TiendaScreen: React.FC<TiendaScreenProps> = ({
  points,
  onSelectProduct,
  onGoToGiftCards,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Todos');

  const filteredProducts = PRODUCTS.map((p, originalIdx) => ({ p, originalIdx })).filter(
    ({ p }) => selectedCategory === 'Todos' || p.c === selectedCategory
  );

  const categories: { id: CategoryFilter; label: string; icon: string }[] = [
    { id: 'Todos', label: 'Todos', icon: '✨' },
    { id: 'Canastas', label: 'Canastas', icon: '🧺' },
    { id: 'Fundas de Almohadas', label: 'Fundas', icon: '🛋️' },
    { id: 'Gorros', label: 'Gorros', icon: '🧢' },
  ];

  return (
    <div className="flex-1 flex flex-col gap-3 pb-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={RETEX_LOGO_URL}
            alt="RETEX"
            referrerPolicy="no-referrer"
            className="h-8 w-auto object-contain"
          />
          <div>
            <h2 className="text-[16px] font-extrabold text-[#132a1c] leading-tight">
              Tienda Sostenible 🛍️
            </h2>
            <span className="text-[11px] text-[#60796b]">
              Canjea tus puntos por piezas suprarrecicladas o gift cards
            </span>
          </div>
        </div>

        <div className="bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-3 py-1 rounded-full text-[12.5px] font-bold inline-flex items-center gap-1.5 shadow-xs shrink-0">
          <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
          <span>{points} pts</span>
        </div>
      </div>

      {/* Segmented Switcher: Productos vs Gift Cards */}
      <div className="bg-[#eaf4ed]/80 p-1 rounded-xl flex gap-1 border border-[#bcd6c5]">
        <button
          type="button"
          className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold bg-white text-[#1e5c3c] shadow-xs cursor-default flex items-center justify-center gap-1"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#1e5c3c]" />
          <span>Productos Upcycling ({PRODUCTS.length})</span>
        </button>

        <button
          type="button"
          onClick={onGoToGiftCards}
          className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold text-[#60796b] hover:text-[#132a1c] transition-colors cursor-pointer flex items-center justify-center gap-1"
        >
          <Gift className="w-3.5 h-3.5 text-[#1e5c3c]" />
          <span>Gift Cards Aliadas</span>
        </button>
      </div>

      {/* Promotional Banner: Gift Cards Aliadas (Falabella, Oechsle, Mango) */}
      <div
        onClick={onGoToGiftCards}
        className="rounded-2xl p-3 text-white shadow-sm cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden bg-gradient-to-r from-[#006f3c] via-[#1e5c3c] to-[#d6004b]"
      >
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9.5px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-white backdrop-blur-xs flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                <span>NUEVO: GIFT CARDS ALIADAS</span>
              </span>
            </div>
            <h3 className="text-[14px] font-black tracking-tight leading-tight">
              Descuentos en Falabella, Oechsle y Mango
            </h3>
            <p className="text-[11px] text-white/90 mt-0.5">
              Desde 30 pts (5% desc.) hasta 200 pts (30% tope máximo).
            </p>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 mt-1">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[10.5px] font-bold">
          <span className="text-amber-200">Ratio oficial: 30 pts = 5% desc.</span>
          <span className="underline decoration-white/50">Canjear gift card →</span>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count =
            cat.id === 'Todos'
              ? PRODUCTS.length
              : PRODUCTS.filter((p) => p.c === cat.id).length;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1e5c3c] text-white shadow-xs'
                  : 'bg-white border border-[#e2ece5] text-[#60796b] hover:bg-[#eaf4ed] hover:text-[#1e5c3c]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[9.5px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-[#eaf4ed] text-[#1e5c3c]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info Callout */}
      <div className="bg-[#eaf4ed] border border-[#c9e4d3] rounded-xl p-2.5 flex items-center gap-2 text-[#1a4d33] text-[12px]">
        <Info className="w-4 h-4 text-[#1e5c3c] shrink-0" />
        <span>
          Tienes <strong className="font-bold">{points} puntos RETEX</strong> disponibles para canje directo de piezas de suprarreciclaje.
        </span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredProducts.map(({ p, originalIdx }) => (
          <div
            key={p.id}
            onClick={() => onSelectProduct(originalIdx)}
            className="bg-white border border-[#e2ece5] hover:border-[#1e5c3c] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col group text-left"
          >
            <div className="w-full aspect-square bg-[#f1f5f2] relative overflow-hidden">
              <img
                src={p.img}
                alt={p.n}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[#1e5c3c] text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                {p.c}
              </span>
              <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[8.5px] font-bold px-1.5 py-0.2 rounded-full">
                100% Upcycled
              </span>
            </div>

            <div className="p-2.5 flex flex-col gap-1">
              <h4 className="text-[12.5px] font-bold text-[#132a1c] line-clamp-1">
                {p.n}
              </h4>
              <p className="text-[10px] text-[#60796b] line-clamp-1">
                {p.desc}
              </p>
              <div className="flex items-center justify-between pt-1 mt-0.5 border-t border-[#e2ece5]/60">
                <div className="flex items-center gap-1 text-[12.5px] font-extrabold text-[#1e5c3c]">
                  <Star className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />
                  <span>{p.p} pts</span>
                </div>
                <span className="text-[10px] font-bold text-[#1e5c3c] hover:underline">
                  Ver →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
