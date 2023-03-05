import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/App/App.jsx";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
	// GET
	yield takeEvery("FETCH_MOVIES", fetchAllMovies);
	yield takeEvery("FETCH_MOVIE_DETAILS", fetchMovieDetails);
	yield takeEvery("FETCH_GENRES", fetchGenres);

	// POST
	yield takeEvery("ADD_MOVIE", addMovie);

	// PUT
	// DELETE
}

// GETS BELOW THIS LINE
function* fetchMovieDetails(action) {
	try {
		const movieDetails = yield axios.get(
			`/api/movie/details/${action.payload}` // movieId
		);
		yield put({ type: "SET_MOVIE_DETAILS", payload: movieDetails.data });
	} catch (error) {
		console.log("Error fetchMovieDetails", error);
	}
}

function* fetchAllMovies() {
	try {
		const movies = yield axios.get("/api/movie");
		yield put({ type: "SET_MOVIES", payload: movies.data });
	} catch (error) {
		console.log("Error fetchAllMovies", error);
	}
}

function* fetchGenres() {
	try {
		const genres = yield axios.get("/api/genre");
		yield put({ type: "SET_GENRES", payload: genres.data });
	} catch (error) {
		console.log("Error fetchGenres", error);
	}
}

// POSTS BELOW THIS LINE
function* addMovie(action) {
	try {
		yield axios.post("/api/movie", action.payload); // new movie
		yield put({ type: "FETCH_MOVIES" });
	} catch (error) {
		console.log("Error addMovie", error);
	}
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
	switch (action.type) {
		case "SET_MOVIES":
			return action.payload;
		default:
			return state;
	}
};

// Used to store the movie genres
const genres = (state = [], action) => {
	switch (action.type) {
		case "SET_GENRES":
			return action.payload;
		default:
			return state;
	}
};

// Used to store current selected movie details
const movieDetails = (state = {}, action) => {
	switch (action.type) {
		case "SET_MOVIE_DETAILS":
			return action.payload;
		default:
			return state;
	}
};

// Create one store that all components can use
const storeInstance = createStore(
	combineReducers({
		movies,
		genres,
		movieDetails,
	}),
	// Add sagaMiddleware to our store
	applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={storeInstance}>
			<App />
		</Provider>
	</React.StrictMode>
);
