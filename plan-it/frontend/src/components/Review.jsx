// Reviews.jsx
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './reviews.css'; // Import CSS file for styling

const Reviews = () => {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    const reviews = [
        { name: "Alice Monroe", rating: 5, review: "PlanIt made trip planning so easy and enjoyable. Highly recommend!" },
        { name: "Bob Jones", rating: 4, review: "Great platform for coordinating group trips. A few minor bugs but overall excellent." },
        { name: "Charlie Kronx", rating: 5, review: "Love the interactive features! It's like having a virtual travel planner with you." },
        { name: "David Blane", rating: 3, review: "Decent app, but could use more customization options. Still, it gets the job done." },
        { name: "Emma Wong", rating: 4, review: "Very user-friendly interface. The voting system for trip ideas is a game-changer!" },
        { name: "Frank Zane", rating: 5, review: "PlanIt helped us plan the perfect vacation with ease. Thank you!" },
        { name: "Grace Heavens", rating: 3, review: "Had some trouble joining a group initially, but customer support was helpful in resolving it." },
        { name: "Henry King", rating: 4, review: "Impressed with the email summary feature. Makes accessing trip details super convenient." },
        { name: "Ivy Patel", rating: 5, review: "Highly intuitive platform. We've been using it for all our trips now!" },
        { name: "Jack Grealish", rating: 4, review: "Overall great experience. Looking forward to seeing future updates and improvements." },
        { name: "Cristiano Ronaldo", rating: 5, review: "Overall great experience especially when I need to plan trips in between from portugal and Saudi Arabia." }

    ];

    // Calculate average rating
    const totalRatings = reviews.reduce((total, review) => total + review.rating, 0);
    const averageRating = totalRatings / reviews.length;

    return (
        <section className='review' id="reviews">
            <div className='review-container'>
                <h2 className='review-heading'>Customer Reviews</h2>
                <div className="review-box">
                    <Carousel showDots={false} draggable={false} autoPlay={true} autoPlaySpeed={3000} removeArrowOnDeviceType={["tablet", "mobile"]} arrows={false} swipeable={false} responsive={responsive} infinite={true} className="review-slider">
                        {reviews.map((item, index) => (
                            <div key={index} className="review-item">
                                <div className="rating">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <span key={i} className="star">&#9733;</span>
                                    ))}
                                    {[...Array(5 - item.rating)].map((_, i) => (
                                        <span key={i + item.rating} className="star">&#9734;</span>
                                    ))}
                                </div>
                                <p className="review-text"><strong>{item.name}</strong>: {item.review}</p>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <p className="average-rating">Average Rating: {averageRating.toFixed(1)} stars</p>
            </div>
        </section>
    );
}

export default Reviews;
