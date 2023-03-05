import "./MovieItem.scss";
import { useHistory } from "react-router-dom";

function MovieItem({ movie }) {
	const history = useHistory();
	const { id, title, poster } = movie; // decontructing

	const handleSeeDetails = (id) => {
		history.push(`/details/${id}`);
	};

	return (
		<div onClick={() => handleSeeDetails(id)}>
			<h3>{title}</h3>
			<img src={poster} alt={title} />
		</div>
	);
}

export default MovieItem;
