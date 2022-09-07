import React, { useEffect, useState } from "react";
import "./AddExhibitionsForm.css"
import Firebase from "../../../service/Firebase/FirebaseService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { async } from "@firebase/util";
import { confirmPasswordReset } from "firebase/auth";



function AddExhibtionsForm() {
    const PORT = 510

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

    const sendNewExhibitionEmail = async () => {
        const emailCheckbox = document.getElementById("admin-exhibition-email-checkbox")
        if (!emailCheckbox.checked) {
            return; 
        } else {
            const payload = {
                title: title,
                description: description,
                address: address,
                startDate: startDate,
                endDate: endDate,
                file: file
            }
            await fetch(`http://localhost:${PORT}/new-exhibition`, {
                mode:"cors",
                method: "POST", 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            console.log(payload)
        }
    }

    const uploadExhibition = async (e) => {
        e.preventDefault()
        firebase.uploadImagesToExhibitonStorage(file[0].name, file[0], file[0].type)
        .then(firebase.saveExhiptionToDB(title.trim(), description, address, startDate, endDate, await firebase.getExhibitonImagesFromStorage(file[0].name)))
        setTimeout(() => window.location.reload(), 1000);
        sendNewExhibitionEmail()
    }
    
    function deleteExhibition(e) {
        const titleElementText = document.querySelector(".exhibition-delete-button").nextSibling.innerHTML

        if(!window.confirm("Er du sikker på at du vil slette " + titleElementText)) {
            return 
        } else {
            firebase.deleteExhiptionFromDB(titleElementText)
            .then(setTimeout(() => {
                firebase.deleteExhibitionFileFromDB(titleElementText)
                // document.location.reload()
            }, 500))
        }
    }

    function previewTitle(e) {
        document.querySelector("#exhibiton-title").innerHTML = e.target.value.trim()
    }

    async function previewImage(e) {
        const imageFile = e.target.files[0]
        firebase.uploadImagesToExhibitonStorage(imageFile.name, imageFile, imageFile.type).finally(async () => {
            document.getElementById("exhibiton-image").childNodes[0].src = await firebase.getExhibitonImagesFromStorage(imageFile.name)
        }).then(async () =>{
            firebase.saveExhibitionFileToDB(imageFile.name, imageFile.type, await firebase.getExhibitonImagesFromStorage(imageFile.name))
        })
    }

    function previewDescription(e) {
        document.getElementById("exhibiton-description").innerHTML = e.target.value.trim()
    }

    function previewAddress(e) {
        document.getElementById("exhibiton-adress").innerHTML = e.target.value.trim()
    }

    function previewStartDate(e) {
        document.getElementById("exhibiton-start-date-text").innerHTML = e.target.value.replace("T", " kl ")
    }

    function previewEndDate(e) {
       document.getElementById("exhibiton-end-date-text").innerHTML = e.target.value.replace("T", " kl ")
    }

    return (
        <div className="admin-exhibition-form-container">
            <form action={`http://localhost:${PORT}/new-exhibition`} method="POST">
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
                    <div>
                        <input type="checkbox" id="admin-exhibition-email-checkbox"></input>
                        <label>Send Email</label>
                    </div>
                    <br></br>
                    <button onClick={uploadExhibition}>OK</button>
                </div>
            </form>
            <div className="admin-exhibition-added-container">
                <div className="exhibiton-main-container">
                        <div className="exhibiton-container">
                            <div id="exhibiton-title">
                                Titel
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
                            <div className="exhibiton-main-container" key={element.title}>
                                <div className="exhibiton-container">
                                    <FontAwesomeIcon className="exhibition-delete-button" icon={faTrashAlt} onClick={deleteExhibition}></FontAwesomeIcon>
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
                    })}
                </div>
        </div>
    )
}

export default AddExhibtionsForm