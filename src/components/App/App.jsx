import { HashRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import MovieList from "../MovieList/MovieList";
import DetailedView from "../DetailedView/DetailedView";

function App() {
	return (
		<div className="App">
			<h1>The Movies Saga!</h1>
			<Router>
				<Route path="/" exact>
					<MovieList />
				</Route>

				<Route path="/details/:id">
					<DetailedView />
				</Route>
				{/* Details page */}

				{/* Add Movie page */}
			</Router>
		</div>
	);
}

export default App;
