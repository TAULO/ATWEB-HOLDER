import React, { useState } from "react";
import Firebase from "../../service/Firebase/FirebaseService";
import { useEffect } from "react";
import "./ExhibitionTemplate.css"
import SubscribeForm from "../subscribeForm/SubscribeForm";

function ExhibitionTemplate() {
    const [exhibition, setExhibition] = useState([])
    
    useEffect(() => {
        async function fetchExhibitions() {
            const firebase = new Firebase()
            setExhibition(await firebase.getExhibitonFromDB())
        }
        fetchExhibitions()
    }, [])

    if (exhibition.length > 0) {
        return (
            exhibition.map(element => {
                return( 
                    <div className="exhibiton-main-container">
                        <div className="exhibiton-container">
                            <div id="exhibiton-title">
                                <h1>{element.title}</h1>
                            </div>
                            <div id="exhibiton-image">
                                <img src={element.url} alt=""></img>
                            </div>
                            <div className="exhibiton-flex-container">
                                <div id="exhibiton-description">
                                    {element.description}
                                </div>
                                <div id="exhibition-line"></div>
                                <div id="exhibiton-adress">
                                    {element.address}
                                </div>
                            </div>
                            <div id="exhibiton-date-container">
                                    <div id="exhibiton-start-date-text">
                                        Starter Den: {element.startDate.replace("T", " kl ")}
                                    </div>
                                <div id="exhibition-start-date-line"></div>
                                    <div id="exhibiton-end-date-text">
                                        Til {"&"} Med: {element.endDate.replace("T", " kl ")}
                                    </div>
                                <div id="exhibition-end-date-line"></div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    } else {
        return(
            <div className="exhibiton-main-container">
                <div className="exhibiton-container" style={{
                    boxShadow: "none"}}>
                    <div id="exhibiton-title">
                        <h1>Ingen udstillinger i den nærmeste fremtid</h1>
                    </div>
                    <div className="exhibiton-subscribe-form-container">
                        <SubscribeForm></SubscribeForm>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExhibitionTemplate