const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
	const queryText = `SELECT * FROM movies ORDER BY "title" ASC`;
	pool.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.log(`Error GET ${queryText}`, error);
			res.sendStatus(500);
		});
});

router.get("/details/:id", (req, res) => {
	// Selecting all infomation with given movie id (aggregating genres into array)
	const queryText = `
    SELECT "movies".id, 
    "movies".title, 
    "movies".description,
    "movies".poster,
    array_agg("genres".name) AS "genres"
    FROM "movies_genres"
    JOIN "movies" ON "movies".id = "movies_genres".movie_id
    JOIN "genres" ON "genres".id = "movies_genres".genre_id
    GROUP BY "movies".id HAVING "movies".id=$1;
  `;

	pool.query(queryText, [req.params.id])
		.then((result) => {
			res.send(result.rows[0]); // sends object
		})
		.catch((error) => {
			console.log(`Error GET ${queryText}`, error);
			res.sendStatus(500);
		});
});

router.post("/", (req, res) => {
	const { title, poster, description, genres } = req.body; // deconstructing

	// RETURNING "id" will give us back the id of the created movie
	const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

	// FIRST QUERY MAKES MOVIE
	pool.query(insertMovieQuery, [title, poster, description])
		.then((result) => {
			const createdMovieId = result.rows[0].id;

			// Now handle the genre reference to joined table
			const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, 2);
      `;

			// SECOND QUERY ADDS EVERY GENRE OF NEW MOVIE
			Promise.all(
				genres.map((genreId) =>
					pool.query(insertMovieGenreQuery, [createdMovieId, genreId])
				)
			).then(() => {
				res.sendStatus(201);
			}); // This does not have a catch block!

			// Catch first query
		})
		.catch((error) => {
			console.log(error);
			res.sendStatus(500);
		});
});

module.exports = router;
