import { Routes, Route } from "react-router-dom";
import SearchMovies from "./components/searchmovies";

function App() {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center mt-30 ">
      <div className="shadow-2xl mb-20 p-5 rounded-xl bg-gray-900">
      <h1 className="text-4xl font-bold text-center my-4 text--400 text-white">Movie Search</h1>
      <p className="text-2xl text-white ">Search for your favorite movies and rate them</p>
      </div>
      <Routes>
        <Route path="/" element={<SearchMovies />} />
      </Routes>
    </div>
  );
}

export default App;