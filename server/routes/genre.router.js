const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
	const queryText = `
    SELECT * FROM "genres" ORDER BY "genres".name ASC;
  `;

	pool.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.log(`Error GET ${queryText}`, error);
			res.sendStatus(500);
		});
});

module.exports = router;
