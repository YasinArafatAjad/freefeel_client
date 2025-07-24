import { useState } from "react";
import { SlUser } from "react-icons/sl";
import StarRatings from "react-star-ratings";

const CustomerReview = ({ product }) => {
  const [showAllReviews, setShowAllReviews] = useState(false); // State to track visibility of reviews
  // console.log(product);
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  const handleShowMore = () => {
    setShowAllReviews(true); // Set state to show all reviews
  };

  return (
    <div className="w-full h-full relative">
      {product?.reviews?.length > 0 && (
        <div className="space-y-5">
          {product?.reviews?.slice(0, showAllReviews ? product?.reviews?.length : 1).map((review, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-start gap-2.5">
                  {review?.profileImage ? (
                    <img src={review?.profileImage} className="w-5 h-5 rounded-full object-cover" alt="Profile Image" />
                  ) : (
                    <SlUser size={20}></SlUser>
                  )}

                  <div className="flex justify-start items-center gap-2">
                    <h3 className="text-lg font-primary font-semibold">{review?.yourName}</h3>
                    <StarRatings
                      rating={Number(review?.ratings)}
                      starRatedColor="#F6BD16"
                      starEmptyColor="#CDCECE"
                      starDimension="20px"
                      starSpacing="2px"
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>
                </div>

                <div>
                  <p className="font-primary text-[15px] font-medium text-gray-500">{formatDate(review?.addedAt)}</p>
                </div>
              </div>

              <p className="text-[15px] font-normal mb-2.5">{review?.comment}</p>

              <div>
                {review?.photos?.length > 0 && (
                  <div className="grid grid-cols-4 lg:grid-cols-8 gap-2.5">
                    {review?.photos?.map((photo, index) => (
                      <img key={index} src={photo} className="h-28 lg:h-16 w-full object-cover" alt={index} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Show More Button */}
          {!showAllReviews && (
            <div className="flex justify-center items-center">
              <button
                onClick={handleShowMore}
                className="mx-auto py-1.5 px-5 bg-black text-white rounded text-[15px] font-normal"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerReview;
