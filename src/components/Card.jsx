import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

function Card({
  name,
  category,
  imageUrl,
  ingredients,
  avoidIngredients,
  instructions,
  cookingTime,
  userName,
  id,
  savedRecipes,
  bool,
  loggedInUser,
}) {
  const [is, setIs] = useState(bool);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/reviews/${id}`);
      setReviews(response.data);
      const avgRating = response.data.reduce((acc, review) => acc + review.rating, 0) / response.data.length;
      setAverageRating(avgRating);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const submitReview = async () => {
    try {
      await axios.post("http://localhost:9000/reviews", {
        rating,
        reviewText,
        userId: loggedInUser,
        recipeId: id,
      });
      fetchReviews();
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const saveRecipe = async (key) => {
    const userID = useGetUserID();
    try {
      const response = await axios.put("http://localhost:9000/recipes/save", {
        userID,
        recipeID: id,
      });
      setIs(true);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="w-full border rounded-lg shadow border-gray-900">
      <a>
        <img
          className="rounded-t-lg w-full object-cover object-bottom h-48"
          src={imageUrl}
          alt=""
        />
      </a>
      <div className="py-2 px-5">
        <a href="#">
          <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-center text-indigo-600">
            {name}
          </h5>
          <h3 className="text-green-700 font-bold">Food Type: {category}</h3>
        </a>
        <div className="mb-3">
          <p className="font-normal text-base md:text-lg text-black">Ingredients:</p>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-900 text-base">
                &nbsp; ➡️{ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-3">
          <p className="font-normal text-base md:text-lg text-black">You Can Avoid This Ingredients</p>
          <ul>
            {avoidIngredients.map((avoidIngredients, index) => (
              <li key={index} className="text-gray-900 text-base">
                &nbsp; ➡️{avoidIngredients}
              </li>
            ))}
          </ul>
        </div>
        <p className="mb-3 font-normal text-gray-700 text-center">{instructions}</p>
        <p className="mb-3 text-center bg-indigo-600 font-normal w-fit mx-auto px-4 rounded-lg text-white">
          Cooking Time: {cookingTime} minutes
        </p>
        <a className="inline-flex items-center px-3 py-2 text-base md:text-md font-medium text-center text-black">
          🙋🏻‍♂️ {userName}
        </a>
        {loggedInUser === null ? null : (
          <button
            onClick={() => saveRecipe(id)}
            className="mb-3 text-center bg-indigo-600 font-normal w-fit mx-auto px-4 rounded-lg text-white"
          >
            {is ? "✨ Saved" : "⭐"}
          </button>
        )}
        <div>
          <h3 className="text-lg font-semibold">Average Rating: {averageRating ? averageRating.toFixed(1) : "No ratings yet"}</h3>
          <h3 className="text-lg font-semibold">Submit Your Review</h3>
          <select value={rating} onChange={(e) => setRating(e.target.value)} className="mb-2">
            <option value="0">Rate...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here"
            className="w-full mb-2 p-2 border rounded-md"
          />
          <button onClick={submitReview} className="mb-3 text-center bg-indigo-600 font-normal w-fit mx-auto px-4 rounded-lg text-white">
            Submit
          </button>
          <h3 className="text-lg font-semibold">Reviews:</h3>
          {reviews.map((review) => (
            <div key={review._id} className="mb-2 p-2 border rounded-md">
              <p><strong>{review.user.username}</strong> rated {review.rating} stars</p>
              <p>{review.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
