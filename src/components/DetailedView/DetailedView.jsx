import "./DetailedView.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function DetailedView() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const movieDetails = useSelector((store) => store.movieDetails);

	useEffect(() => {
		dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id });
	}, []);

	return (
		<>
			<h1>ID: {id}</h1>
			<h1>{JSON.stringify(movieDetails)}</h1>
		</>
	);
}

export default DetailedView;
