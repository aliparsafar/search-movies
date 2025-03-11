import { Routes, Route } from "react-router-dom";
import SearchMovies from "./components/searchmovies";

function App() {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center mt-50 ">
      <h1 className="text-4xl font-bold text-center my-4">Movie Search</h1>
      <p className="text-2xl">Search for your favorite movies and rate them</p>
      <Routes>
        <Route path="/" element={<SearchMovies />} />
      </Routes>
    </div>
  );
}

export default App;