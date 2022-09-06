import React, { useState } from "react";
import Firebase from "../../service/Firebase/FirebaseService";
import { useEffect, useRef } from "react";
import "./ExhibitionTemplate.css"
import SubscribeForm from "../subscribeForm/SubscribeForm";
import FilterNewestBtn from "./FilterNewestBtn";

function ExhibitionTemplate() {
    const firebase = new Firebase()

    const [exhibition, setExhibition] = useState([])
    const [filterIsVisible, setFilterIsVisible] = useState(false)

    const filterIconRef = useRef(null)
    const filterItemsRef = useRef(null)
    const filterItemsContainer = useRef(null)

    // fetch exhibitions from firebase db
    useEffect(() => {
        async function fetchExhibitions() {
            setExhibition(await firebase.getExhibitonFromDB())
        }
        fetchExhibitions()
    }, [])

    //keeps tracks on expired exhibitions and deletes them if expired
    useEffect(() => {
        let dates = []
        const date = new Date()
        const firebase = new Firebase()
        function deleteExpiredExhibitions() {
            for (let i = 0; i < exhibition.length; i++) {
                if (exhibition[i] !== undefined) {
                    dates = exhibition.map(currDate => new Date(currDate.endDate.split("T")[0]))
                }
                if (date.getDay() > dates[i].getDay() && date.getMonth() >= dates[i].getMonth()) {
                    firebase.deleteExhiptionFromDB(exhibition[i].title)
                }
            }
        }
        deleteExpiredExhibitions()
    }, [exhibition])

    useEffect(() => {
        setTimeout(() => {
            filterItemsContainer.current.addEventListener("mouseover", () => {
                filterItemsRef.current.style.display = "block"
            })
            filterItemsContainer.current.addEventListener("mouseleave", () => {
                filterItemsRef.current.style.display = "none"
            })
            
        }, 2000)
    }, [])

    function toggleFilterItems() {
        filterItemsRef.current.style.animation = "growDown 400ms ease-in-out forwards"
        setFilterIsVisible(!filterIsVisible)
    }     

    function filterNewestClick() {
        filter(firebase.filterExhibitionStartDateAsc())
        
    }

    function filterOldestClick() {
        filter(firebase.filterExhibitionEndDateAsc())
    }

    function filterNameClick() {
        filter(firebase.filterExhibitionTitleAsc())
    }

    async function filter(fitlerMethod) {
        setExhibition(await fitlerMethod)
        setFilterIsVisible(false)
    }

    const childProps = {
        toggleFilterItems,
        filterNewestClick,
        filterOldestClick,
        filterNameClick,
        filterItemsRef,
        filterIsVisible,
        filterIconRef,
        filterItemsContainer
    }
   
    if (exhibition.length > 0) {
        return (
            <div className="exhibiton-landing-container">
                <FilterNewestBtn {...childProps}></FilterNewestBtn>
                    {exhibition.map(element => {
                        return( 
                            <div className="exhibiton-main-container" key={element.title}>
                                <div className="exhibiton-container">
                                    <div id="exhibiton-title">
                                        {element.title}
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
                    }
                )
            }
        </div>
        )
    } else {
        return(
            <div className="no-exhibiton-main-container">
                <div className="no-exhibiton-container">
                    <div id="no-exhibiton-title">
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