import React, {useEffect, useState} from "react";
import "./AdminLandingPage.css"
import {useNavigate} from "react-router-dom"
import Firebase from "../../../service/Firebase/FirebaseService";


function AdminLandingPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(undefined)
    const firebase = new Firebase()

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
       setUser(undefined) 
    }

    useEffect(() => {
        if (user !== undefined) {
            console.log(user)
        }
    }, [user])

    if (user === undefined) {
        return (
        <div>
            <form >
                <input type={"text"} onChange={(e) => setEmailValue(e)}></input>
                <input type={"password"} onChange={(e) => setPasswordValue(e)}></input>
                <input type={"submit"} onClick={(e) => {e.preventDefault(); loginWithEmail()}}></input>
            </form>
        </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => {handleLogout(); console.log(user)}}>logout</button>
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