import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const fetchMovies = async (searchTerm: string) => {
  if (!searchTerm) return [];
  const { data } = await axios.get(
    `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
  );
  return data.Search || [];
};



  return (
    <div>

    </div>
  );
};

export default SearchMovies;
