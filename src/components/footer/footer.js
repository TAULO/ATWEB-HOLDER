import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faPhone, faMailBulk } from "@fortawesome/free-solid-svg-icons";


import "./footer.css"

function Footer() {
    return ( 
            <div className="footer">
                <div id="telf-container">
                    <FontAwesomeIcon icon={faPhone} id="telf-icon"></FontAwesomeIcon>
                    45+ 22 95 55 88
                </div>
                
                <div id="mail-container">
                    <FontAwesomeIcon icon={faMailBulk} id="mail-icon"></FontAwesomeIcon>
                    a-nett@live.dk
                </div>

                <div id="instagram-icon-container">
                    <a href="https://www.instagram.com/anettetaulo/" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="fa-4x"/>                   
                    </a>
                </div>
            </div>
     );
}

export default Footer;