import "./MovieItem.scss";
import { useHistory } from "react-router-dom";

function MovieItem({ movie }) {
	const history = useHistory();
	const { id, title, poster } = movie; // decontructing

	const handleSeeDetails = (id) => {
		history.push(`/details/${id}`);
	};

	return (
		<div className="gallery-card" onClick={() => handleSeeDetails(id)}>
			<img className="gallery-card__image" src={poster} alt={title} />
			<h3 className="gallery-card__title">{title}</h3>
		</div>
	);
}

export default MovieItem;
