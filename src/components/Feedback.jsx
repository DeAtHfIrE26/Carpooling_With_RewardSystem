import React, { Children, useState } from "react";
import "./Feedback.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Feedback = () => {
  const { drivername } = useParams();
  const driver = JSON.parse(decodeURIComponent(drivername));
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState("");
  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleCommentsChange = (event) => {
    const inputValue = event.target.value;

    // Check if the input value exceeds the limit
    if (inputValue.length <= 150) {
      setComments(inputValue);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedbackData = {
      DriverUsername: driver,
      Rating: rating,
      Feedback: comments,
    };

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      };

      const res = await fetch(
        `https://software-gratler.onrender.com/feedback`,
        requestOptions
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      navigate("/Layout");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = () => {
    // Handle skip logic here, e.g., navigate to the next step/page.
    navigate("/Layout");
  };

  return (
    <div className="feedback-container">
      <div className="feedback-box">
        <h1>Feedback</h1>
        <form onSubmit={handleSubmit}>
          <h3>Rating:</h3>
          <select
            className="rating"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <h3>Additonal Comments:</h3>
          <textarea
            maxLength={150}
            className="comment"
            value={comments}
            placeholder="upto 150 character"
            onChange={handleCommentsChange}
          />
          <div className="btn-box">
            <button className="feedback-btn" type="submit">
              Submit{" "}
            </button>
            <button className="feedback-btn" type="button" onClick={handleSkip}>
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
