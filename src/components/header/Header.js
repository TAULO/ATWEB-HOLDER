import React, { useEffect } from "react"
import "./Header.css"
import { useLocation } from "react-router-dom";
import {useNavigate, Link} from "react-router-dom"

function Header({ history }) {
    const navigate = useNavigate();
    const location = useLocation()

    let currentElement = null

    function goToAbout() {
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

    // useEffect(() => {
    //     if (currentElement !== null) currentElement.style.textDecoration = "underline"
    // }, [location])

    // remove underline when at the current route
    function removeUnderline(e) {
        // const elementClassName = e.target.className
        // currentElement = document.querySelector(`.${elementClassName}`)
        // currentElement.style.textDecoration = "none"
    }

    return ( 
        <div className="header">
            <div className="header-home-text-container">
                <h1 id="header-home-text" onClick={() => navigate("/")}>Galleri Taulo</h1>
            </div>
            <div id="list">
                <Link to="/instagram" className="header-list-link-instagram" id="header-list-links" onClick={(e) => removeUnderline(e)}>INSTAGRAM</Link>
                <div className="header-list-link-about" id="header-list-links" onClick={(e) => {removeUnderline(e); goToAbout()}}>MIG</div>
                <Link className="header-list-link-exhibition" to="/udstillinger" id="header-list-links" onClick={(e) => removeUnderline(e)}>UDSTILLINGER</Link>
            </div>
        </div>
     );
}

export default Header;