// Features.jsx
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './aboutPage.css'; // Import CSS file for styling

const Features = () => {
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

    return (
        <section className='feature' id="features">
            <div className='feature-container'>
                <h2 className='feature-heading'>Features</h2>
                <div className="feature-box">
                    <Carousel showDots={false} draggable={false} autoPlay={true} autoPlaySpeed={3000} removeArrowOnDeviceType={["tablet", "mobile"]} arrows={false} swipeable={false} responsive={responsive} infinite={true} className="feature-slider">
                        <div className="feature-item">
                            <h3 className="feature-title">Easy to Use</h3>
                        </div>
                        <div className="feature-item">
                            <h3 className="feature-title">Group Planning</h3>
                        </div>
                        <div className="feature-item">
                            <h3 className="feature-title">Interactive Platform</h3>
                        </div>
                        <div className="feature-item">
                            <h3 className="feature-title">Get Trip Details Emailed to You</h3>
                        </div>
                        <div className="feature-item">
                            <h3 className="feature-title">Join and Invite People to Groups</h3>
                        </div>
                        <div className="feature-item">
                            <h3 className="feature-title">Easily Edit Trip Plans</h3>
                        </div>
                        <div className="feature-item">
                            <h3 className="feature-title">Interactive Map to view Trip Locations</h3>
                        </div>
                        <div className="feature-item">
                            <h3 className="feature-title">Account to save you trip locations and User Info</h3>
                        </div>
                        {/* Add more features as needed */}
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

export default Features;