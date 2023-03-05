import "./Form.scss";
import { useState } from "react";

function Form() {
	const [titleInput, setTitleInput] = useState("");
	const [imageInput, setImageInput] = useState("");
	const [descriptionInput, setDescriptionInput] = useState("");

	const handleFormSubmit = () => {
		return;
	};

	return (
		<div className="form-page__container">
			<form onSubmit={handleFormSubmit}>
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
					<option>Select Genres</option>
				</select>
			</form>
		</div>
	);
}

export default Form;
