import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { API_KEY } from "@/utils/constants";
import MovieCard from "@/Components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCache } from "@/utils/appSlice";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const moviesCache = useSelector(store=>store.app);
  const [curPage, setCurPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const getMovies = async () => {
    if (moviesCache[curPage]) {
      setMovies(moviesCache[curPage]);
    }
    else{
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${curPage}`
      );
      const json = await data.json();
      setMovies(json.results);
      dispatch(
        updateCache({
          [curPage]: json.results,
        })
      );
    }
  };
  useEffect(() => {
    window.scrollTo({top: 0});
    getMovies();
  }, [curPage]);

  const loadNextPage = () =>{
    if(curPage+1 == pages.length+1){
      let temp = [];
      for(let i=1; i<=pages.length+1; i++){
        temp.push(i);
      }
      setPages(temp);
    }
    setCurPage(curPage+1);
  }

  const loadPreviousPage = () => {
    if(curPage == 1) return;
    setCurPage(curPage-1);

  }


  if (!movies) return <div>Loading........</div>;
  return (
    <main className="flex flex-col min-h-screen items-center justify-center w-full bg-white">
    <div className="text-5xl font-bold m-4">Popular Movies</div>
      <div className="flex flex-row gap-x-4 gap-y-8 p-4 flex-wrap justify-center">
        {movies.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </div>
      <nav aria-label="Page navigation example" className="mt-4 mb-10">
        <ul className="inline-flex -space-x-px">
          <li>
            <p
              
              className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white` + ((curPage === 1)?' cursor-not-allowed' : ' cursor-pointer')}
              onClick = { loadPreviousPage}
            >
              Previous
            </p>
          </li>
          {
            pages.map(page=> <li key={page}>
            <p
              
              className={`cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white` + ((curPage==page)?' font-bold text-black bg-gray-300':'')}
              onClick={()=> setCurPage(page)}
            >
              {page}
            </p>
          </li>)
          }
          
          <li>
            <p
              
              className="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick = {loadNextPage}
            >
              Next
            </p>
          </li>
        </ul>
      </nav>
    </main>
  );
}
