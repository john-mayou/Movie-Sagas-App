import "./MovieItem.scss";

function MovieItem({ movie }) {
	const { title, poster } = movie; // decontructing

	return (
		<div>
			<h3>{title}</h3>
			<img src={poster} alt={title} />
		</div>
	);
}

export default MovieItem;
