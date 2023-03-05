import "./DetailedView.scss";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function DetailedView() {
	const dispatch = useDispatch();
	const history = useHistory();
	let { movieId } = useParams(); // from url (string)
	const movieDetails = useSelector((store) => store.movieDetails); // reducer
	const { id, title, poster, description, genres } = movieDetails; // deconstructing

	// on load
	useEffect(() => {
		dispatch({ type: "FETCH_MOVIE_DETAILS", payload: movieId });
	}, []);

	return (
		<>
			<h1>ID: {id}</h1>
			{/* <h1>{JSON.stringify(movieDetails)}</h1> */}
			<p>{id}</p>
			<p>{title}</p>
			<img src={poster} alt={title} />
			<p>{description}</p>
			<h5>Genres:</h5>
			{genres?.map((genre, i) => (
				<p key={i}>{genre}</p>
			))}
			<button onClick={() => history.push("/")}>Back To List</button>
		</>
	);
}

export default DetailedView;
