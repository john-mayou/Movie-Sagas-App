import "./Form.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Form() {
	const dispatch = useDispatch();

	// redux
	const genres = useSelector((store) => store.genres);

	// local
	const [titleInput, setTitleInput] = useState("");
	const [imageInput, setImageInput] = useState("");
	const [descriptionInput, setDescriptionInput] = useState("");
	const [genresInput, setGenresInput] = useState([]);

	useEffect(() => {
		dispatch({ type: "FETCH_GENRES" });
	}, []);

	const handleFormSubmit = () => {
		return;
	};

	return (
		<div className="form-page__container">
			<form className="movie-form" onSubmit={handleFormSubmit}>
				<input
					type="text"
					placeholder="Title"
					onChange={(e) => setTitleInput(e.target.value)}
					value={titleInput}
				/>
				<input
					type="text"
					placeholder="Image URL"
					onChange={(e) => setImageInput(e.target.value)}
					value={imageInput}
				/>
				<textarea
					placeholder="Description"
					onChange={(e) => setDescriptionInput(e.target.value)}
					value={descriptionInput}
				></textarea>
				<select>
					<option value="">Select Genres</option>
					{genres.map(({ id, name }) => {
						return (
							<option key={id} value={id}>
								{name}
							</option>
						);
					})}
				</select>
			</form>
		</div>
	);
}

export default Form;
