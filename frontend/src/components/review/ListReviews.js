import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div class="reviews mt-3">
      <h3>Reviews</h3>
      <hr/>
      {/* <hr /> */}

      {reviews &&
        reviews.map((review) => (
          <div key={review._id} class="review-card my-2">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
            </div>

            <p class="text-muted">by {review.name}</p>

            <p class="">{review.comment}</p>

            <hr/>
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
