import React, { useEffect, useRef, useState } from "react"
import "./Header.css"
import {useNavigate, Link} from "react-router-dom"

function Header() {
    const navigate = useNavigate();

    const goToAbout = (e) => {
        const aboutElement = document.getElementsByClassName("main-container")[0]
        if (aboutElement !== null && aboutElement !== undefined) {
            aboutElement.scrollIntoView({behavior:"smooth"})
        } else {
            navigate("/")
            setTimeout(() => {
                document.getElementsByClassName("main-container")[0].scrollIntoView({behavior: "smooth"})
            }, 1200)
        }
    }

    return ( 
        <div className="header">
            <div className="header-home-text-container">
                <h1 id="header-home-text" onClick={() => navigate("/")}>Galleri Taulo</h1>
            </div>
                <div id="list">
                    <Link to="/instagram" id="header-list-links">INSTAGRAM</Link>
                    <div id="header-list-links" onClick={goToAbout}>MIG</div>
                    <Link to="/udstillinger" id="header-list-links">UDSTILLINGER</Link>
                </div>
        </div>
     );
}

export default Header;