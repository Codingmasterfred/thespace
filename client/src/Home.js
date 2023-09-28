import React from "react"
import "./App.css"
import { Link } from 'react-router-dom';

function HomeComponent() {


    return (
        <div id="HomeComponentContainer">
            <div id="HomeContainer">
                <div id="TopContainer">
                    <div id="AboutTheSpace">
                        <h4>About The Space </h4>
                        <p> Integer pellentesque velit non tellus. Pellentesque libero tortor, tincidunt et, tincidunt eget,
                            semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet,
                            felis eros vehicula leo, at malesuada velit leo quis pede. Donec interdum, metus et hendrerit
                            aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi.</p>
                        <p>Integer pellentesque velit non tellus. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi.</p>
                    </div>
                    <div id="PhotoContainer">
                        <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" />
                    </div>

                </div>
                <div id="BottomContainer">
                    <div id="Category1">
                        <h4>Find Work</h4>
                        <p>Integer pellentesque velit non tellus. Pellentesque libero tortor, tincidunt et, tincidunt eget,
                            semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet,
                            felis eros vehicula leo,</p>
                    </div>
                    <div id="Category2">
                        <h4>View Propects</h4>
                        <p>Integer pellentesque velit non tellus. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo,</p>
                    </div>
                    <div id="Category3">
                        <h4>AI Training</h4>
                        <p>Integer pellentesque velit non tellus. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo,</p>
                    </div>
                </div>
            
                <div id="PricingContainer">
                    <h1 id="PrimaryH1">Create Your Profile</h1>
                    <div className="PricingTiers">
                        <div className="PricingTier">
                            <h2>Tier 1</h2>
                            <p>Basic features</p>
                            <span>$10/month</span>
                            <button className="Create-profile-button">Create Profile</button>
                        </div>
                        <div className="PricingTier">
                            <h2>Tier 2</h2>
                            <p>Additional features</p>
                            <span>$20/month</span>
                            <button className="Create-profile-button">Create Profile</button>
                        </div>
                        <div className="PricingTier">
                            <h2>Tier 3</h2>
                            <p>Premium features</p>
                            <span>$30/month</span>
                            <button className="Create-profile-button"> <Link to="/UserProfile" className="Create-profile-button">
    Create Profile
  </Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default HomeComponent