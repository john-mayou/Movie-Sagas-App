import { HashRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import MovieList from "../MovieList/MovieList";
import DetailedView from "../DetailedView/DetailedView";
import Form from "../Form/Form";

function App() {
	return (
		<div className="App">
			<Router>
				<Route path="/" exact>
					<MovieList />
				</Route>
				<Route path="/details/:movieId" exact>
					<DetailedView />
				</Route>
				<Route path="/form">
					<Form />
				</Route>
			</Router>
		</div>
	);
}

export default App;
