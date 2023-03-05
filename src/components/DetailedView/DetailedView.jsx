import "./DetailedView.scss";
import { useParams } from "react-router-dom";

function DetailedView() {
	const { id } = useParams();

	return <h1>ID: {id}</h1>;
}

export default DetailedView;
