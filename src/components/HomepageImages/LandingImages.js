import React, {useEffect, useRef, useState} from 'react'
import Firebase from "../../service/Firebase/FirebaseService"
import Loader from "../../components/SpinningLoader/SpinningLoader"
import "./LandingImages.css"


export default function LandingImages() {
    const [imageFileURL, setImageFileURL] = useState([])
    const [loading, setLoading] = useState(false)

    const backgroundNodeRef = useRef(null)

    useEffect(() => {
        setLoading(true)
        async function getFilesURLFromStorage() {
            const firebase = new Firebase()
            setImageFileURL(await firebase.getAllLandingFilesFromDB())
        }     
        getFilesURLFromStorage()
    }, [])

    function onClick(e) {
        const currImage = e.target;

        [...document.querySelectorAll("#landing-page-img")]
        .filter(image => image !== currImage)
        .forEach((image, index) => {
            image.style.zIndex = index.toString()
            image.style.transition = "all 3s ease"
            image.style.boxShadow = "none"
            if (index % 2 === 0) {
                image.style.position = "absolute"
                image.style.transition = "top 1s ease 0s"
                image.style.top = 500
                image.style.left = 0
                image.style.marginLeft = "50px"
            } else {
                image.style.position = "absolute"
                image.style.transition =  "all 1s"
                image.style.top = 100
                image.style.right = 0
                image.style.marginRight = "50px"
            }
        })
        currImage.style.transition = "all 1s ease"
        currImage.style.display = "block"
        currImage.style.width = "800px"
        currImage.style.height = "auto"
    }

    function displayImages() {
        setTimeout(() => {setLoading(false)}, 1000)
        return imageFileURL.map((image, index) => {
            return (
                <div className='landing-page-img-container' key={index}>
                    <div id='landing-page-img-frame' >
                        <img id='landing-page-img' src={image.url} alt={image.name} onClick={(e) => onClick(e)}></img>
                    </div>
                </div>
            )        
          })
    }

    return (
        <div className='landing-page-main-container' ref={backgroundNodeRef}>
            {loading ? <Loader backgroundNode={backgroundNodeRef.current} ></Loader> : displayImages()}
        </div>
    )
}
