import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieList.scss";
import MovieItem from "../MovieItem/MovieItem";

function MovieList() {
	const history = useHistory();

	// redux
	const dispatch = useDispatch();
	const movies = useSelector((store) => store.movies);

	// on load
	useEffect(() => {
		dispatch({ type: "FETCH_MOVIES" });
	}, []);

	return (
		<main className="main">
			<h1 className="main__title">MovieList</h1>
			<button
				className="main__add-btn"
				onClick={() => history.push("/form")}
			>
				Add Movie
			</button>
			<section className="movies">
				{movies.map((movie) => {
					return <MovieItem key={movie.id} movie={movie} />;
				})}
			</section>
		</main>
	);
}

export default MovieList;
