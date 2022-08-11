import React from "react";
import "./AdminLandingPage.css"
import {useNavigate, Link} from "react-router-dom"


function AdminLandingPage() {
    const navigate = useNavigate()
    return (
        <div>
            <div className="admin-landing-container">
                <div id="admin-landing-add-pictures" onClick={() => navigate("/admin/tilfoj-billeder")}>
                    tilfoj billeder
                    <img alt="" src="https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg"></img>
                </div>
                <div id="admin-landing-add-exhibitions"  onClick={() => navigate("/admin/tilfoj-udstillinger")}>
                    tilfoj udstillinger 
                    <img alt="" src="https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg"></img>
                </div>
            </div>
        </div>
    )
}

export default AdminLandingPage