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
            // console.log(e.target.readyState)
            // if (e.target.readyState === "complete") {
            //     document.getElementsByClassName("main-container")[0].scrollIntoView({behavior: "smooth"})
            // }
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
                    {/* <li id="header-list-links">INSTAGRAM</li> */}
                    <div id="header-list-links" onClick={goToAbout}>OM</div>
                    <Link to="/udstillinger" id="header-list-links">UDSTILLINGER</Link>
                    {/* <div id="header-list-links">MINE MALERIER</div> */}
                </div>
        </div>
     );
}

export default Header;