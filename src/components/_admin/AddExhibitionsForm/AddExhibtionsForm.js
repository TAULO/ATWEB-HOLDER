import React, { useEffect } from "react";
import "./AddExhibitionsForm.css"
import { useState } from "react";
import Firebase from "../../../service/Firebase/FirebaseService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/fontawesome-free-solid'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";



function AddExhibtionsForm() {
    const firebase = new Firebase()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [file, setFile] = useState([])

    const [exhibition, setExhibition] = useState([])

    useEffect(() => {
        async function fetchExhibitions() {
            const firebase = new Firebase()
            setExhibition(await firebase.getExhibitonFromDB())
        }    
        fetchExhibitions()    
    }, [])

    const handleOnClick = async (e) => {
        e.preventDefault()
        firebase.uploadFilesToStorage(file[0].name, file[0], file[0].type)
        .then(firebase.saveExhiptionToDB(title, description, address, startDate, endDate, await firebase.getFilesURLFromStorage(file[0].name)))
        setTimeout(() => window.location.reload(), 500);
    }

    function deleteExhibition() {
        const titleElement = document.getElementsByClassName("exhibition-delete-button")[0].nextElementSibling
        firebase.deleteExhiptionFromDB(titleElement.innerText)
        .then(setTimeout(() => {
            document.location.reload()
        }, 500))
    }

    function previewTitle(e) {
        const titleText = document.getElementById("exhibiton-title").childNodes[0].innerHTML = e.target.value
    }

    // image MUST currently already be saved in firebase storage
    async function previewImage(e) {
        const currImageFile = e.target.files[0].name
        const imageFile = document.getElementById("exhibiton-image").childNodes[0].src = await firebase.getFilesURLFromStorage(currImageFile)
    }

    function previewDescription(e) {
        const descriptionText = document.getElementById("exhibiton-description").innerHTML = e.target.value
    }

    function previewAddress(e) {
        const addressText = document.getElementById("exhibiton-adress").innerHTML = e.target.value
    }

    // DET ER MULIGT AT VÆLGE EN SLUTDATO FØR STARDATOEN
    function previewStartDate(e) {
        const startDateText = document.getElementById("exhibiton-start-date-text").innerHTML = e.target.value.replace("T", " kl ")
    }

    function previewEndDate(e) {
        const endDateText = document.getElementById("exhibiton-end-date-text").innerHTML = e.target.value.replace("T", " kl ")

    }
    return (
        <div className="admin-exhibition-form-container">
            <form>
                <div className="admin-exhibition-form-flex-container">
                    <label>Titel</label>
                    <input minLength="1" maxLength="40" value={title} onChange={e => {setTitle(e.target.value); previewTitle(e)}}></input>
                    <br></br>
                    <label>Beskrivelse</label>
                    <textarea value={description} onChange={e => {setDescription(e.target.value); previewDescription(e)}} rows="4" minLength="1" maxLength="400"></textarea>
                    <br></br>
                    <label minLength="1" maxLength="50">Adresse</label>
                    <input value={address} onChange={e => {setAddress(e.target.value); previewAddress(e)}}></input>
                    <br></br>
                    <label>Start Tidspunkt</label>
                    <input type="datetime-local" value={startDate} onChange={e => {setStartDate(e.target.value); previewStartDate(e)}}></input>
                    <br></br>
                    <label>Slut Tidspunkt</label>
                    <input type="datetime-local" value={endDate} onChange={e => {setEndDate(e.target.value); previewEndDate(e)}}></input>
                    <br></br>
                    <label>Billede</label>
                    <input type="file" file={file} onChange={e => {setFile(e.target.files); previewImage(e)}}></input>
                    <br></br>
                    <button onClick={handleOnClick}>OK</button>
                </div>
            </form>
            <div className="admin-exhibition-added-container">
                <div className="exhibiton-main-container">
                        <div className="exhibiton-container">
                            <div id="exhibiton-title">
                                <h1>Titel</h1>
                            </div>
                            <div id="exhibiton-image">
                                <img src="test" alt=""></img>
                            </div>
                            <div className="exhibiton-flex-container">
                                <div id="exhibiton-description">
                                    Beskrivelse
                                </div>
                                <div id="exhibition-line"></div>
                                <div id="exhibiton-adress">
                                    Adresse
                                </div>
                            </div>
                            <div id="exhibiton-date-container">
                                    <div id="exhibiton-start-date-text">
                                        Starter Den: Start Dato
                                    </div>
                                <div id="exhibition-start-date-line"></div>
                                    <div id="exhibiton-end-date-text">
                                        Til {"&"} Med: Slut Dato
                                    </div>
                                <div id="exhibition-end-date-line"></div>
                            </div>
                        </div>
                    </div>
            </div>
                <div className="admin-exhibition-from-db">
                    {exhibition.map(element => {
                        return (
                            <div className="exhibiton-main-container">
                                <div className="exhibiton-container">
                                    <FontAwesomeIcon className="exhibition-delete-button" icon={faTrashAlt} onClick={deleteExhibition}></FontAwesomeIcon>
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
                    })}
                </div>
        </div>
    )
}

export default AddExhibtionsForm