import React, {useEffect, useState} from "react";
import "./AdminLandingPage.css"
import {useNavigate} from "react-router-dom"
import Firebase from "../../../service/Firebase/FirebaseService";


function AdminLandingPage(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const firebase = new Firebase()

    useEffect(() => {
        async function checkIfLoggedIn() {
            setUser(await firebase.getUser())
        }
        checkIfLoggedIn()
        if (user !== null) {
            firebase.loginWithEmail(email, password)
        }
        setTimeout(() => {
            console.log(user)
        }, 3000);
    }, [user])

    function setEmailValue(e) {
        setEmail(e.target.value)
    }

    function setPasswordValue(e) {
        setPassword(e.target.value)
    }

    async function loginWithEmail() {
        try {
            await firebase.loginWithEmail(email, password)
            setUser(await firebase.getUser())
        } catch (e) {
            alert(e)
        }
    }

    function handleLogout() {
       firebase.logoutOfEmail()
       setUser(null) 
       window.location.reload()
    }

    if (user === null) {
        return (
        <div>
            <form >
                <input type="text" onChange={(e) => setEmailValue(e)}></input>
                <input type="password" onChange={(e) => setPasswordValue(e)}></input>
                <input type="submit" onClick={(e) => {e.preventDefault(); loginWithEmail()}}></input>
            </form>
        </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => { handleLogout() }}>logout</button>
                <div className="admin-landing-container">
                    <div id="admin-landing-add-pictures" onClick={() => navigate("/admin/tilfoj-billeder")}>
                        <img alt="" src="https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg"></img>
                        <div id="admin-landing-add-pictures-text">Tilføj Billeder</div>
                    </div>
                    <div id="admin-landing-add-exhibitions"  onClick={() => navigate("/admin/tilfoj-udstillinger")}> 
                        <img alt="" src="https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg"></img>
                        <div id="admin-landing-exhibitions-text">Tilføj Udstillinger</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminLandingPage