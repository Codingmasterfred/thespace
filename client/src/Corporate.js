import React from "react";
import Button from "react-bootstrap/Button";

function CorporateProfileComponent() {
    return (
        <div id="CorporateProfileComponentContainer">
            <div id="CorporateProfileContent">
                <div id="SnapshotAndProfileContainer">
                    <h4 id="CompanyProfileH4">Company Profile Snapshot</h4>
                    <div id="CompanyProfileSnapshot">
                        {/* Add your content for the company profile snapshot */}
                    </div>
                    <div id="CompanyProfile">
                        <h4>Company Profile Info</h4>
                        <div id="CompanyProfileContentContainer">
                            <h3>Add Logo</h3>
                            <div style={{ width: "60%", height: "25%", border: "none" }}>
                                <label for="companyLogoInput" class="file-label">
                                    {/* Add an SVG or logo placeholder */}
                                    <input type="file" id="companyLogoInput" class="file-input" />
                                </label>
                            </div>
                            <input placeholder="Company Name" />
                            <input placeholder="Company Email" />
                            <input placeholder="Company Phone Number" />
                            <input placeholder="Company Website Link" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CorporateProfileComponent;
