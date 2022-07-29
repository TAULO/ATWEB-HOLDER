import React, { useState } from "react";
import Firebase from "../../service/Firebase/FirebaseService";
import "./SubscribeForm.css"

function SubscribeForm() {
    async function handleOnClick(e)  {
        e.preventDefault()
        const email = document.getElementById("subscribe-form-input").value
        fetch("http://localhost:5012/welcome", {
            mode: 'no-cors',
            method: "POST",
            headers: {
                'Content-Type': 'text/html'
            },
            body: email
        })
        console.log("post send: ", email)
    }
        
    return (
        <div className="subscribe-form-container">
            <div className="subscribe-form">
                <div id="subscribe-form-title">
                    <h1 style={{padding: "0px", margin:"0px"}}>Følg med på mine kommende udstillinger</h1>
                </div>
                <div id="subscribe-form-description">
                    <p style={{padding: "0px", margin:"0px"}}> 
                        Abooner til mit nyhedsbrev for at aldirg gå glip af mine kommende udstillinger
                    </p>
                </div>
                <div className="subscribe-form-input-container">
                    <form onSubmit={handleOnClick} id="contact-form">
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