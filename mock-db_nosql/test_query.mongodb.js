use("sample_mflix");

// db.movies.find({})

// db.comments.findOne({ _id: ObjectId("5a9427648b0beebeb69579f5") })

// db.comments.findOne({ email: "john_bishop@fakegmail.com"})

// db.comments.findOne({ name: "John Bishop" });

// db.movies.findOne({ type: "movie", rated: "TV-G" });

// db.movies.find({ type: "movie", rated: "TV-G" }).count()

// db.theaters.find({ "location.address.state": "AL" }).count()

// db.theaters.find({ "location.address.city": "La Quinta" }).count()

// db.theaters.findOne({ "location.address.city": "La Quinta" })

// db.movies.find({ plot: { $regex: "American", $options: "i" } }).count()

// db.movies.find({ plot: { $regex: "street.$", $options: "i" } }).count()

// db.movies.find({ plot: { $regex: "street.$", $options: "i" } })

// db.movies.find({}).sort({ runtime: -1 }).limit(5)

// db.movies.find({ runtime: { $lt: 60 } }).sort({ runtime: -1 }).limit(5)

// db.movies.find({ year: { $gt: 1954, $lt: 1966 } }).sort({ year: 1 }).limit(3)

// db.movies.find({ released: { $gte: ISODate("1990-01-01T00:00:00Z"), $lt: ISODate("2001-01-01T00:00:00Z") } }).count()

// Find all movies in the "movies" collection released between 1950 and 1970 (inclusive) that are documented as being shown in countries located in the USA.
// What is the number of movies in the "movies" collection with genres "Drama" and "History" released after the year 1970?
// In how many films is Roy L. McCardell credited as an actor?
// How many movies did Hal Roach directed?
// What is the movie with the earliest release year directed by Hal Roach?
// How many awards did Hal Roach’s movies win?

// db.movies.find({
//   countries: {$in: ["USA"]},
//   year: {$gte: 1950, $lte: 1970}
// })

// db.movies.find({
//   genres: { $all: ["Drama", "History"] },
//   released: { $gt: ISODate("1970-01-01T00:00:00Z") }
// }).count()

// db.movies.find({ cast: "Roy L. McCardell" }).count()

// db.movies.find({ directors: "Hal Roach" }).count()

// db.movies.find({ directors: { $in: ["Hal Roach"] } });

// db.movies.find(
//   {
//     directors: { $in: ["Hal Roach"] },
//   },
//   {
//     title: 1,
//     "awards.wins": 1,
//     _id: 0,
//   }
// );

// Example - Implicit AND (multiple field conditions)

// db.movies.find(
//   {
//     year: 1995,              // condition #1
//     genres: "Action"         // condition #2  → implicit AND
//   },
//   { _id: 0, title: 1, year: 1, genres: 1 }   // projection
// );

// Example - Explicit OR ($or array)

// db.movies.find(
//   {
//     $or: [
//       { languages: "French" },
//       { languages: "Spanish" }
//     ]
//   },
//   { _id: 0, title: 1, languages: 1 }
// );

// Example - Combined AND + OR (nesting operators)

// db.movies.find(
//   {
//     year: { $gt: 2010 },
//     $or: [
//       { genres: "Drama" },
//       { "imdb.rating": { $gte: 8 } }
//     ]
//   },
//   { _id: 0, title: 1, year: 1, genres: 1, "imdb.rating": 1 }
// ).limit(10);

// Aggregation Pipelinellll

// Example - Quick filter + sort + limit
// Retrieve the five most-recent films directed by Christopher Nolan.

// db.movies.aggregate([
// 	{$match: {directors: "Christopher Nolan"}},
// 	{$sort: {year: -1}},
// 	{$limit: 5},
// 	{$project: {_id: 0, title: 1, year: 1}}
// ])

// Example - Grouping & counting
// Count how many movies were released each year between 2000 - 2010 (inclusive).

// db.movies.aggregate([
//   { $match: { year: { $gte: 2000, $lte: 2010 } } },
//   { $group: { _id: "$year", totalMovies: { $sum: 1 } } },
//   { $sort: { _id: 1 } },
// ]);

// Example - Exploding arrays + frequency ranking
// Find the 10 most common genres across the entire dataset.

// db.movies.aggregate([
//   { $unwind: "$genres" },
//   { $sortByCount: "$genres" },   // groups + counts + sorts, all in one
//   { $limit: 10 }
// ])

// Example - $lookup
// For each comment, attach the movie title it belongs to.

// db.comments.aggregate([
//   {
//     $lookup: {
//       from: "movies",          // right-hand collection
//       localField: "movie_id",  // value present in comments
//       foreignField: "_id",     // matching field in movies
//       as: "movie"              // new array field to hold matches
//     }
//   },
//   { $unwind: "$movie" },       // flatten the single match
//   {
//     $project: {                // keep it tidy
//       _id: 0,
//       text: 1,
//       movieTitle: "$movie.title"
//     }
//   },
//   { $limit: 3 }
// ])

// Example - Explicit $and
// Find all movies released after 2010 and with an IMDb rating of at least 8.0.

// db.movies.aggregate([
//   {
//     $match: {
//       $and: [
//         { year: { $gt: 2010 } },
//         { "imdb.rating": { $gte: 8.0 } }
//       ]
//     }
//   },
//   { $project: { _id: 0, title: 1, year: 1, "imdb.rating": 1 } }
// ])

// Example - Explicit $or
// Find movies where the primary spoken language is English or French.db.movies.aggregate([

// db.movies.aggregate([
//   {
//     $match: {
//       $or: [
//         { languages: "English" },
//         { languages: "French" }
//       ]
//     }
//   },
//   { $project: { _id: 0, title: 1, languages: 1 } }
// ])

// Example - Combined $and + $or
// Get up to 10 movies that
//   Have “Drama” in their genres or an IMDb rating ≥ 7,
//   and were released in the 2000s (2000–2009).

// db.movies.aggregate([
//   {
//     $match: {
//       $and: [
//         { year: { $gte: 2000, $lte: 2009 } },
//         {
//           $or: [{ genres: "Drama" }, { "imdb.rating": { $gte: 7.0 } }],
//         },
//       ],
//     },
//   },
//   { $limit: 10 },
//   { $project: { _id: 0, title: 1, year: 1, genres: 1, "imdb.rating": 1 } },
// ]);

// exer 1-2
// Calculate the average rating for each movie genre.

// db.movies.aggregate([
//   { $unwind: "$genres" },
//   { $unwind: "$imdb.rating" },
//   { $group: {
//       _id: "$genres",
//       averageRating: { $avg: "$imdb.rating" }
//     }
//   },
//   { $sort: { averageRating: -1 } }
// ])

// Find the top 5 most productive directors, i.e., directors who have directed the most number of movies.

// db.movies.aggregate([
//   { $unwind: "$directors" },
//   { $group: {
//       _id: "$directors",
//       movieCount: { $sum: 1 }
//     }
//   },
//   { $sort: { movieCount: -1 } },
//   // { $limit: 5 }
// ])

// Calculate the total number of movies released each year.

// db.movies.aggregate([
//   {
//     $group: {
//       _id: "$year",
//       movieCount: { $sum: 1 }
//     }
//   },
//   { $sort: { _id: 1 } }
// ])

// Find all comments made by the user with the email "jason_momoa@gameofthron.es".

// db.comments.aggregate([
//   {
//     $lookup: {
//       from: "users",
//       localField: "email",
//       foreignField: "email",
//       as: "user_info"
//     }
//   },
//   { $unwind: "$user_info" },
//   { $match: { "user_info.email": "jason_momoa@gameofthron.es" } },
//   { $project: { text: 1, date: 1, _id: 0 } }
// ])

// Count the number of comments made for each movie and include the title of the movie.

// db.comments.aggregate([
//   {
//     $group: {
//       _id: "$movie_id",
//       commentCount: { $sum: 1 },
//     },
//   },
//   {
//     $lookup: {
//       from: "movies",
//       localField: "_id",
//       foreignField: "_id",
//       as: "movie_info",
//     },
//   },
//   { $unwind: "$movie_info" },
//   {
//     $project: {
//       _id: 0,
//       movie_id: "$_id",
//       title: "$movie_info.title",
//       commentCount: 1,
//     },
//   },
//   { $sort: { commentCount: -1 } },
// ]);

// Join the comments collection with the movies collection to group comments by the title of the movie, with comments stored in an array.

// db.comments.aggregate([
//   {
//     $lookup: {
//       from: "movies",
//       localField: "movie_id",
//       foreignField: "_id",
//       as: "movie_info"
//     }
//   },
//   { $unwind: "$movie_info" },
//   {
//     $group: {
//       _id: "$movie_info.title",
//       comments: { $push: "$text" }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       movieTitle: "$_id",
//       comments: 1
//     }
//   }
// ])

