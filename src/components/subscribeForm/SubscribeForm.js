import React, { useState } from "react";
import Firebase from "../../service/Firebase/FirebaseService";
import "./SubscribeForm.css"

function SubscribeForm() {

    async function sendWelcomeEmail(e)  {
        const PORT = 510

        e.preventDefault()
        const data = document.getElementById("subscribe-form-input").value
        const email = {email: data}
        
        await fetch(`http://localhost:${PORT}/welcome`, {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(email)
        })
        console.log("post send: ", email)
    }
        
    return (
        <div className="subscribe-form-container">
            <div className="subscribe-form">
                <div id="subscribe-form-title">
                    Følg Med På Mine Kommende Udstillinger
                </div>
                <div id="subscribe-form-description">
                    <p style={{padding: "0px", margin:"0px"}}> 
                        Abooner til mit nyhedsbrev for at aldirg gå glip af mine kommende udstillinger
                        <br></br>
                        samt andre spændende nyheder
                    </p>
                </div>
                <div className="subscribe-form-input-container">
                    <form onSubmit={sendWelcomeEmail} id="contact-form">
                        <input type="hidden" id="message" name="message" value="hello from:D"></input>
                        <input type="hidden" id="reply_to" name="reply_to"></input>
                        <input type="email" id="subscribe-form-input" placeholder="Email Adresse" required></input>
                        <input type="submit" id="subscribe-form-button" value="Abonner"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SubscribeForm