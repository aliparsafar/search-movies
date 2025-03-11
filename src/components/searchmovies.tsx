import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  };


const fetchMovies = async (searchTerm: string) => {
  if (!searchTerm) return [];
  const { data } = await axios.get(
    `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
  );
  return data.Search || [];
};

const SearchMovies = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("query") || "";
    const inputRef = useRef<HTMLInputElement>(null);
  
    const { data: movies, isLoading, isError } = useQuery({
      queryKey: ["movies", searchTerm],
      queryFn: () => fetchMovies(searchTerm),
      enabled: !!searchTerm,
    });
  
    const handleSearch = () => {
      if (inputRef.current) {
        setSearchParams({ query: inputRef.current.value });
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center p-6 rounded-xl">
   
    <div className="flex justify-center gap-3 items-center bg-gray-800/70 backdrop-blur-md p-6 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="w-72 p-3 rounded-full bg-gray-700/60 text-white outline-none border border-gray-500 shadow-inner focus:ring-2 focus:ring-purple-500 transition-all"
        ref={inputRef}
        defaultValue={searchTerm}
      />
      <button
        onClick={handleSearch}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        🔍 Search
      </button>
    </div>
  
   
    {isLoading && <p className="mt-6 text-lg animate-pulse">Loading...</p>}
    {isError && <p className="mt-6 text-lg text-red-500">Error fetching movies.</p>}
  
  
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 p-4">
      {movies?.map((movie: Movie) => (
        <div
          key={movie.imdbID}
          className="relative bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-bold text-white">{movie.Title}</h3>
            <p className="text-sm text-gray-300">{movie.Year}</p>
          </div>
          <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            🎬 Movie
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default SearchMovies;
