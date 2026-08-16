import { useState } from 'react';

const HOTBAR_ITEMS = [
  {
    id: 1,
    name: 'Diamond Trophy',
    icon: '💎',
    rarity: 'Legendary',
    rarityColor: 'text-mc-diamond',
    desc: 'Awarded to the Grand Champion team.',
    stats: '+1,00,000 XP & ₹50,000 Cash',
  },
  {
    id: 2,
    name: 'Enchanted Golden Apple',
    icon: '🍎',
    rarity: 'Epic',
    rarityColor: 'text-yellow-300',
    desc: 'Granted to all participants for 24-hour stamina.',
    stats: 'Absorption IV, Regeneration II',
  },
  {
    id: 3,
    name: 'Redstone Logic Engine',
    icon: '🔴',
    rarity: 'Rare',
    rarityColor: 'text-red-400',
    desc: 'Powers complex backend algorithms and AI agents.',
    stats: '+999 Clock Speed',
  },
  {
    id: 4,
    name: 'Midnight Pizza Slice',
    icon: '🍕',
    rarity: 'Common',
    rarityColor: 'text-white',
    desc: 'Served hot at 12:00 AM sharp to replenish hunger.',
    stats: '+20 Hunger Bar',
  },
  {
    id: 5,
    name: 'Crafting Guidebook',
    icon: '📜',
    rarity: 'Common',
    rarityColor: 'text-white',
    desc: 'Contains API keys, mentor schedules & hackathon rules.',
    stats: 'Knowledge +100',
  },
  {
    id: 6,
    name: 'Ender Pearl Fast-Track',
    icon: '🔮',
    rarity: 'Epic',
    rarityColor: 'text-purple-400',
    desc: 'Teleports your submission straight to final judging.',
    stats: 'Skip initial queue',
  },
  {
    id: 7,
    name: 'Cloud Pass Key',
    icon: '🔑',
    rarity: 'Rare',
    rarityColor: 'text-blue-400',
    desc: 'Unlocks free AWS/Azure hosting credits.',
    stats: '$500 Infrastructure Credits',
  },
  {
    id: 8,
    name: 'Speed Potion II',
    icon: '🧪',
    rarity: 'Rare',
    rarityColor: 'text-cyan-300',
    desc: 'Unlimited coffee and energy drinks on tap.',
    stats: '+40% Typing Speed',
  },
  {
    id: 9,
    name: 'Totem of Undying Code',
    icon: '🪬',
    rarity: 'Legendary',
    rarityColor: 'text-yellow-400',
    desc: 'Saves your project from bugs 5 minutes before deadline!',
    stats: 'Prevents 100% Crash Errors',
  },
];

export default function Hotbar() {
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const activeIndex = hoveredSlot !== null ? hoveredSlot : selectedSlot;
  const activeItem = HOTBAR_ITEMS[activeIndex];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-auto">
      {/* Item Tooltip Popup */}
      {activeItem && (
        <div className="mb-2 bg-black/90 border-2 border-purple-500 p-3 shadow-[0_0_20px_rgba(138,43,226,0.6)] max-w-xs text-left animate-fadeIn font-pixel-body">
          <div className="flex justify-between items-center gap-4">
            <h4 className={`font-pixel text-xs sm:text-sm ${activeItem.rarityColor}`}>
              {activeItem.name}
            </h4>
            <span className="font-pixel text-[8px] text-gray-400 uppercase">
              {activeItem.rarity}
            </span>
          </div>
          <p className="text-gray-300 text-lg leading-tight mt-1">{activeItem.desc}</p>
          <div className="mt-2 text-sm text-yellow-300 font-pixel">✦ {activeItem.stats}</div>
        </div>
      )}

      {/* Hotbar Container */}
      <div className="flex bg-gray-900/90 border-4 border-gray-600 p-1 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-sm rounded-none">
        {HOTBAR_ITEMS.map((item, index) => {
          const isSelected = selectedSlot === index;
          const isHovered = hoveredSlot === index;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedSlot(index)}
              onMouseEnter={() => setHoveredSlot(index)}
              onMouseLeave={() => setHoveredSlot(null)}
              className={`w-10 h-10 sm:w-12 sm:h-12 border-2 flex items-center justify-center relative transition-all cursor-pointer ${
                isSelected || isHovered
                  ? 'bg-gray-700 border-white scale-110 z-10 shadow-lg'
                  : 'bg-gray-800 border-gray-600 hover:border-gray-400'
              }`}
            >
              <span className="text-xl sm:text-2xl filter drop-shadow">{item.icon}</span>

              {/* Slot index number */}
              <span className="absolute bottom-0.5 right-1 font-pixel text-[8px] text-gray-400">
                {index + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
