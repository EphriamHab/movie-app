import { useState, useEffect } from "react";

const KEY = "de94292";
export function useMovies(query, callback){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        callback?.();
        const controller = new AbortController();
        async function fetchMovies() {
          try {
            setIsLoading(true);
            setError("");
            const res = await fetch(
              `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
              {signal:controller.signal}
            );
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await res.json();
            if (data.Response === "False") {
              throw new Error(data.Error);
            }
            setMovies(data.Search);
          } catch (error) {
            console.error(error.message);
            setError(error.message);
    
            if(error.name !== 'AbortError'){
              setError(error.message);
            }
          } finally {
            setIsLoading(false);
          }
        }
        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }
        
        fetchMovies();
        return function(){
          controller.abort();
        }
      }, [query]);
      return {movies, isLoading, error}
}