import React, { useState } from 'react';

function AnimeCard({ anime }) {
  // State to track which review is expanded (null if none)
  const [expandedIdx, setExpandedIdx] = useState(null);

  const openExpand = (idx) => setExpandedIdx(idx);
  const closeExpand = () => setExpandedIdx(null);

  return (
    <div className="bg-yellow-100 border-[5px] border-black rounded-2xl shadow-[12px_12px_0_#222] p-8 flex flex-col items-center max-w-2xl mx-auto">
      <div className="relative mb-6">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-64 h-96 object-cover border-[5px] border-black rounded-xl shadow-[6px_6px_0_#222] bg-white"
        />
        <span className="absolute top-2 left-2 bg-pink-400 border-2 border-black rounded-lg px-3 py-1 text-xs font-extrabold shadow-[2px_2px_0_#222] text-black uppercase tracking-widest">Anime</span>
      </div>
      <div className="w-full">
        <h3 className="text-2xl font-extrabold bg-yellow-400 border-[3px] border-black rounded-lg px-4 py-2 shadow-[3px_3px_0_#222] inline-block mb-4 text-black">
          {anime.title}
        </h3>
        <p className="text-lg mb-6 text-gray-800 bg-white border-2 border-black rounded-lg px-4 py-3 shadow-[2px_2px_0_#222]">
          <span className="font-bold text-black">Sinopsis:</span> {anime.synopsis || 'Tidak ada sinopsis.'}
        </p>
        <h4 className="text-xl font-bold bg-blue-200 border-2 border-black rounded-lg px-3 py-1 shadow-[2px_2px_0_#222] inline-block mb-4 text-black">
          3 User Reviews:
        </h4>
        {anime.reviews && anime.reviews.length > 0 ? (
          <ul className="list-none pl-0">
            {anime.reviews.slice(0, 3).map((review, idx) => (
              <li
                key={idx}
                className="bg-pink-100 border-2 border-black rounded-lg shadow-[2px_2px_0_#222] mb-4 px-4 py-3 text-base text-black relative group transition-all duration-200 hover:bg-pink-200"
              >
                <span className="font-bold text-pink-600">{review.user?.username || 'User'}:</span>{' '}
                <span>
                  {review.review?.length > 150
                    ? review.review.substring(0, 150) + '...'
                    : review.review}
                </span>
                {review.review?.length > 150 && (
                  <button
                    className="ml-2 text-blue-700 underline font-bold hover:text-blue-900 border-2 border-black rounded px-2 py-1 bg-yellow-200 shadow-[1px_1px_0_#222] transition-all duration-150"
                    onClick={() => openExpand(idx)}
                  >
                    Baca selengkapnya
                  </button>
                )}
                <span className="absolute top-2 right-2 bg-yellow-300 border-2 border-black rounded px-2 py-0.5 text-xs font-bold shadow-[1px_1px_0_#222] group-hover:bg-yellow-400 transition">Review</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Tidak ada review.</p>
        )}
      </div>
      {/* Expanded Review Card Modal */}
      {expandedIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-pink-100 border-[5px] border-black rounded-2xl shadow-[12px_12px_0_#222] p-8 w-[160mm] h-[90mm] max-w-full max-h-full flex flex-col justify-between relative animate-pulse-in">
            <span className="absolute top-2 right-2 bg-yellow-300 border-2 border-black rounded px-2 py-0.5 text-xs font-bold shadow-[1px_1px_0_#222]">Review</span>
            <div className="mb-2 overflow-y-auto flex-1">
              <span className="font-bold text-pink-600 block mb-2">{anime.reviews[expandedIdx].user?.username || 'User'}:</span>
              <div className="text-black text-base whitespace-pre-line">
                {anime.reviews[expandedIdx].review}
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-yellow-400 border-2 border-black rounded-lg font-bold shadow-[2px_2px_0_#222] hover:bg-yellow-200 transition-all self-end"
              onClick={closeExpand}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimeCard;
