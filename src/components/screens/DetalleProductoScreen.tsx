import React from 'react';
import { ArrowRight, Star, ArrowLeft } from 'lucide-react';
import { Product } from '../../types';

interface DetalleProductoScreenProps {
  product: Product;
  userPoints: number;
  onProceedToCheckout: () => void;
  onBackToCatalog: () => void;
}

export const DetalleProductoScreen: React.FC<DetalleProductoScreenProps> = ({
  product,
  userPoints,
  onProceedToCheckout,
  onBackToCatalog,
}) => {
  const canAfford = userPoints >= product.p;
  const missingPoints = product.p - userPoints;

  return (
    <div className="flex-1 flex flex-col justify-between py-1">
      <div>
        {/* Product Card Showcase */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl overflow-hidden shadow-xs">
          <div className="w-full aspect-square bg-[#e2ece5] relative overflow-hidden">
            <img
              src={product.img}
              alt={product.n}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[10.5px] font-bold px-2.5 py-0.5 rounded-full">
              100% Reciclado
            </span>
          </div>

          <div className="p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[#1e5c3c] uppercase tracking-wider">
                {product.c}
              </span>
              <div className="bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-2.5 py-0.5 rounded-full text-[11.5px] font-bold inline-flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />
                <span>{product.p} pts</span>
              </div>
            </div>

            <h2 className="text-[17px] font-extrabold text-[#132a1c] mb-1.5">
              {product.n}
            </h2>

            <p className="text-[12.5px] text-[#60796b] leading-relaxed">
              {product.desc}
            </p>
          </div>
        </div>

        {/* Affordability Status Box */}
        <div
          className={`mt-3 border rounded-xl p-3 flex items-center justify-between text-[12px] font-medium ${
            canAfford
              ? 'bg-[#eaf4ed] border-[#c9e4d3] text-[#1e5c3c]'
              : 'bg-[#fffbeb] border-[#fde68a] text-[#92400e]'
          }`}
        >
          <span>
            {canAfford
              ? '¡Tienes suficientes puntos para canjear!'
              : `Te faltan ${missingPoints} puntos`}
          </span>
          <span className="font-bold">Tu saldo: {userPoints} pts</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-4">
        <button
          onClick={onProceedToCheckout}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Canjear / Comprar producto</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          onClick={onBackToCatalog}
          className="w-full py-2.5 px-4 bg-transparent hover:bg-[#eaf4ed] text-[#1e5c3c] border border-transparent hover:border-[#1e5c3c] rounded-xl font-bold text-[13px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Volver al catálogo</span>
        </button>
      </div>
    </div>
  );
};
