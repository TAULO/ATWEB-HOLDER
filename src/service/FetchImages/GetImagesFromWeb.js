import React, { useEffect, useState} from "react"

function GetImagesFromWeb(token) { 
    const [imgURL, setImgURL] = useState([])

    useEffect(() => {
        const getImages = async function() {
            async function fetchImage() {
                const url = `https://graph.instagram.com/me/media?fields=media_url&access_token=${token}`
                const response = await fetch(url)
                if (response.status === 200) {
                        console.log("Request succeeded")
                        return await response.json();
                    } else {
                        console.log("ERROR: ", response.status)
                    }
                }
            const data = await fetchImage();
            setImgURL(data.data)
            } 
        getImages()
    },[])

    return imgURL;
}

export default GetImagesFromWeb