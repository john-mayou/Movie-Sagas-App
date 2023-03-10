import "./Form.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Form() {
	const history = useHistory();

	// redux
	const dispatch = useDispatch();
	const genres = useSelector((store) => store.genres);

	// local
	const [titleInput, setTitleInput] = useState("");
	const [imageInput, setImageInput] = useState("");
	const [descriptionInput, setDescriptionInput] = useState("");
	const [genresInput, setGenresInput] = useState([]); // holds array of genre id's

	// on load
	useEffect(() => {
		dispatch({ type: "FETCH_GENRES" });
	}, []);

	/**
	 * Grabs the value of the checkbox, removes or adds to local state
	 * based on if it aleady exists or not
	 * @param {event} event
	 */
	const handleAddGenre = (event) => {
		const {
			target: { value },
		} = event; // deconstruct

		setGenresInput(
			genresInput.includes(value) // if already exists
				? genresInput.filter((genre) => genre !== Number(value)) // yes -> remove
				: [...genresInput, Number(value)] // no -> add
		);
	};

	/**
	 * Takes local state of the current inputs and dispatches them to a POST saga
	 * @param {event} e
	 */
	const handleFormSubmit = (e) => {
		e.preventDefault();

		const newMovie = {
			title: titleInput,
			poster: imageInput,
			description: descriptionInput,
			genres: genresInput, // array of genre id's
		};

		dispatch({ type: "ADD_MOVIE", payload: newMovie });

		history.push("/");
	};

	return (
		<div className="form-page__container">
			<form className="movie-form" onSubmit={handleFormSubmit}>
				<h1 className="movie-form__title">Add Movie!</h1>
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
					rows="7"
				></textarea>
				<fieldset className="movie-form__checkbox-container">
					<legend className="movie-form__checkbox-title">
						<strong>Pick Genres</strong>
					</legend>
					{genres.map(({ id, name }) => {
						return (
							<div key={id}>
								<input
									type="checkbox"
									value={id}
									id={`${id}-${name}`}
									onChange={handleAddGenre}
								/>
								<label htmlFor={`${id}-${name}`}>{name}</label>
							</div>
						);
					})}
				</fieldset>
				<button className="movie-form__submit" type="submit">
					Save
				</button>
				<button
					className="movie-form__cancel"
					onClick={() => history.push("/")}
				>
					Cancel
				</button>
			</form>
		</div>
	);
}

export default Form;
