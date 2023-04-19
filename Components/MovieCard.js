import { IMG_PATH } from "@/utils/constants"
import {genres} from "@/utils/constants"

const MovieCard = ({original_title, title, release_date, backdrop_path,overview, genre_ids}) => {
    const imgPath = IMG_PATH+backdrop_path;
   
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-pink-100 hover:scale-105 transition duration-500 ease-in-out;">
  <img className="w-full" src={IMG_PATH+backdrop_path} alt={title} />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{title}</div>
    <p className="text-gray-700 text-base">
        <span className="text-md font-bold">Release:</span> {release_date}
    </p>
    <p className="text-gray-500 text-base">
        {overview}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    {
      genre_ids.map(id => <span key={id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{genres[id].name}</span>)
    
    }
  </div>
</div>
  )
}

export default MovieCard