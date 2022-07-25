import React from "react";
import Firebase from "../../service/Firebase/FirebaseService";
import "./SubscribeForm.css"
import emailjs from '@emailjs/browser';


function SubscribeForm() {
    const firebase = new Firebase()

    async function handleOnClick(e)  {
        e.preventDefault()
        const email = document.getElementById("subscribe-form-input").value
        // await firebase.saveEmailAddressesToDB(email)
        // console.log(await firebase.getEmailAddressesFromTB())

        const element = document.getElementById("reply_to")

        const emails = await firebase.getEmailAddressesFromTB()
        if (emails !== undefined) {
            element.value = ""
            for (let i = 0; i < emails.length; i++) {
                // element.value += emails[i].email + " "
            }
        }

        console.log(element.value)
        element.value = "besttauloeu@gmail.com"

        // setTimeout(() => {
        //     emailjs.sendForm('service_p1aieir', 'template_d7tb3vq', e.target, 'L-4ZEWQAhzpfNeb1P')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
        // }, 5000);
    }

    return (
        <div className="subscribe-form-container">
            <div className="subscribe-form">
                <div id="subscribe-form-title">
                    <h1 style={{padding: "0px", margin:"0px"}}>Følg med på de kommende udstillinger</h1>
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