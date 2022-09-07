import React, { useEffect, useRef, useState } from "react"
import "./MainImages.css"
import Firebase from "../../service/Firebase/FirebaseService"

function MainImages() {
    const [imageFileURL, setImageFileURL] = useState([])
    const [imgIndex, setImgIndex] = useState(1)
    const imgPrevIndexRef = useRef()
    const currentImageRef = useRef(null)

    // times until next image will show. 
    // THIS DELAY MUST MATCH ANIMATION TIME!
    const presentationDelay = 15000

    // image presentation slideshow loop
    useEffect(() => {  
        setTimeout(() => {
            setImgIndex(imgIndex + 1)
            imgPrevIndexRef.current = imgIndex
            if (imgIndex > imageFileURL.length - 1) {
                setImgIndex(1)
            }
        }, presentationDelay)
    }, [imageFileURL.length, imgIndex])

    // firebase image files fetcher 
    useEffect(() => {
        async function getFilesURLFromStorage() {
            const firebase = new Firebase()
            setImageFileURL(await firebase.getAllFilesFromDB())
        }     
        getFilesURLFromStorage()
    }, [])

    function displayImages() {
           return imageFileURL.map((item, index) => {
                return (
                    <div key={index} className="main-column">
                        <li className="main-li-items">
                            <img style={{display:"none"}} className="main-img-items" id={`item`} src={item.url} alt={item.name} onClick={() => window.open(item.url)}></img>   
                        </li>
                    </div>
                )
            }
        )
    }

    // min 2 images, else presentation will not work
    function presentation() {
        const columnsArr = displayImages()
        const imagesArr = []
        for (let column of columnsArr) {
            imagesArr.push(column.props.children.props.children)
        }
        
        // setTimeout: waiting for img to load into dom - current delay: 500
        setTimeout(() => {
            // only one picture have been added to the presentation via admin
            if (imageFileURL.length <= 1) { 
                currentImageRef.current.children[0].style.display = "flex"
            } else {
                if (currentImageRef.current.children !== null) {
                    const currentImage = currentImageRef.current.children[imgIndex - 1]
                    const prevImage = currentImageRef.current.children[imgPrevIndexRef.current - 1]
                    if (currentImage !== null) {
                        currentImage.style.display = "flex"
                        currentImage.style.animation = `fading-animation ${presentationDelay / 1000}s infinite` 
                        prevImage.style.display = "none"
                    }
                }
            }
        }, 500)
        return imagesArr
    }
    return (
        <div className="main-list-container">
            <div className="main-text-container">
                <h1 id="main-text-title">
                    Velkommen Til
                <br></br> 
                    Galleri Taulo
                </h1>
                <p id="main-text-paragraph">
                    Se <u>udstillinger</u> eller kontakt <u>a-nett@hotmail.com</u> 
                    <br></br>
                    for en privat udstilling hos mig.
                </p>
            </div>
            <ul ref={currentImageRef}  className="main-list">
                {
                    presentation()
                }
            </ul>
        </div>
    );
}

export default MainImages;