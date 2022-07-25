
import React from "react"
import "./InstagramImages.css"
import GetImagesFromWeb from "../../service/FetchImages/GetImagesFromWeb"


//https://graph.instagram.com/me/media?fields=media_url&access_token=
// const url = `https://graph.instagram.com/me/media?fields=media_url&access_token=${process.env.REACT_APP_INSTAGRAM_TOKEN_MOM}`

function InstagramImages() {
    const arrMediaURL = GetImagesFromWeb(process.env.REACT_APP_INSTAGRAM_TOKEN_MOM)

    const showImages = () => {
        return arrMediaURL.map((item, index) => {
                return (<div key={index} className="column">
                    <li className="liItems" key={index}>
                        <img className="imgItems" src={item.media_url} alt={item.id} onClick={() => window.open(item.media_url)}></img>
                    </li>
                </div>)
            }
        )
    }

    return (
        <div className="list-container">
            <ul className="list">
                {
                    showImages() 
                }
            </ul>
        </div>
    );
}

export default InstagramImages;