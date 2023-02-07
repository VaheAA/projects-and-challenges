import Image from 'next/image';

export default async function MovieDetail({ params }) {
  const imagePath = 'https://image.tmdb.org/t/p/original';

  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.API_KEY}`
  );

  const res = await data.json();
  return (
    <div>
      <div>
        <h2 className="text-2xl">{res.title}</h2>
        <h2 className="text-lg">{res.release_date}</h2>
        <h2>Runtime: {res.runtime} minutes</h2>
        <h2 className="bg-green-600 inline-block my-2 py-2 px-4 text-small rounded-md">
          {res.status}
        </h2>
        <Image
          className="my-12 w-full"
          src={imagePath + res.poster_path}
          width={800}
          height={800}
          priority
          alt={res.title}
        />
      </div>
    </div>
  );
}
