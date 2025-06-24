import React, { useState } from 'react';
import AnimeCard from './AnimeCard';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchAnime = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=1`);
      const data = await res.json();
      const anime = data.data && data.data[0];
      if (anime) {
        try {
          const reviewRes = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/reviews?limit=3`);
          const reviewData = await reviewRes.json();
          setResult({ ...anime, reviews: reviewData.data || [] });
        } catch {
          setResult({ ...anime, reviews: [] });
        }
      } else {
        setResult(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-start py-10">
      <h1 className="text-3xl font-extrabold text-center bg-yellow-400 border-4 border-black rounded-lg px-6 py-2 shadow-[4px_4px_0_#222] mb-8">
        🔎 Get Anime
      </h1>
      <div className="flex gap-2 w-full max-w-xl mb-8">
        <input
          type="text"
          placeholder="Cari anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchAnime()}
          className="flex-1 px-4 py-3 border-4 border-black rounded-lg shadow-[2px_2px_0_#222] text-lg outline-none focus:border-yellow-400 bg-white"
        />
        <button
          onClick={searchAnime}
          className="px-6 py-3 border-4 border-black rounded-lg bg-yellow-400 font-bold text-lg shadow-[2px_2px_0_#222] hover:bg-white hover:border-yellow-400 transition"
        >
          Cari
        </button>
      </div>

      {loading && <p className="text-lg font-bold text-gray-700">Loading...</p>}

      <div className="w-full max-w-xl">
        {result && <AnimeCard anime={result} />}
        {!loading && !result && <p className="text-center text-gray-500 font-bold">Tidak ada hasil.</p>}
      </div>
    </div>
  );
}

export default App;
