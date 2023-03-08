import "./DetailedView.scss";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function DetailedView() {
	const dispatch = useDispatch();
	const history = useHistory();
	let { movieId } = useParams(); // from url (string)
	const movieDetails = useSelector((store) => store.movieDetails); // reducer

	// on load
	useEffect(() => {
		dispatch({ type: "FETCH_MOVIE_DETAILS", payload: movieId });
	}, []);

	return (
		<div className="page-container">
			<section className="details">
				<h2 className="details__title">{movieDetails.title}</h2>
				<img
					className="details__image"
					src={movieDetails.poster}
					alt={movieDetails.title}
				/>
				<p className="details__description">
					{movieDetails.description}
				</p>
				<div className="details__genres-container">
					{movieDetails.genres?.map((genre, i) => (
						<p className="details__genre" key={i}>
							{genre}
						</p>
					))}
				</div>
			</section>
			<button
				className="back-to-gallery-btn"
				onClick={() => history.push("/")}
			>
				Back To List
			</button>
		</div>
	);
}

export default DetailedView;
