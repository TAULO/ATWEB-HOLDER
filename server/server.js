import express from "express";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import Nylas from "nylas"
import bodyParser from "body-parser";
import fetch from "node-fetch";

const port = 5012
const app = express();

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json());
app.use(bodyParser.text());

Nylas.config({
    clientId: "6izhh7mrazfut3e3y47yn0x6m",
    clientSecret: "7jhgquw43eacyrv02nkiouag6",
})

const firebaseConfig = {
    apiKey: "AIzaSyAtVqPYeAhzVA43mig1fg44Ylg8VblWRNo",
    authDomain: "atweb-8f6b2.firebaseapp.com",
    projectId: "atweb-8f6b2",
    storageBucket: "atweb-8f6b2.appspot.com",
    messagingSenderId: "551624378796",
    appId: "1:551624378796:web:a9711dbb0fc9955de39209"
  };

const _collectionEmailAdresses = "SubscribersEmail"

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

const dbRef3 = collection(db, _collectionEmailAdresses)

const nylas = Nylas.with("4btuzcbanAULrLncTtkNpHhLc2ZsBk")

// middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

async function getEmailAddressesFromTB() {
    const data = []
    const querySnapshot = await getDocs(dbRef3)
    querySnapshot.forEach(doc => {
        data.push(doc.data())
    })
    return data;
}

async function saveEmailAddressesToDB(email) {
    const docRef = doc(db, _collectionEmailAdresses, email)
    return await setDoc(docRef, {
        email: email
    })
    .then(console.log("[DATABASE]","Added:", email, " to emails"))
}

app.get("/new-exhibition", async (req, res) => {
    const data = await getEmailAddressesFromTB()
    const email = data.map(email => {
        return {
            email: email.email
        }
    })
    function sendNewExhibitionEmail(subject, body) {
        const draft = nylas.drafts.build({
            subject: subject,
            body: body, 
            to: email
        })
            draft.send().then(message => {
            console.log(message)
        })
    }
   
    // sendNewExhibitionEmail("Ny udstilling hos Galleri Taulo", "Kig ind på GalleriTaulo.dk for at se de kommende udstillinger")
    res.send("New Exhibition!")
});

app.post("/welcome", async (req, res) => {
    const email = req.body
    const allEmailsInDB = await getEmailAddressesFromTB()

    // fetch the HTML Welcome Body to display in email
    const resp = await fetch("http://127.0.0.1:5500/server/WelcomeEmailBody.html")
    const html = await resp.text()

    function sendWelcomeEmail(subject, body) {
        const draft = nylas.drafts.build({
            subject: subject,
            body: body,
            to: [{email: email}]
        })
        draft.send().then(message => {
            console.log(message)
        })
    }

    // guard that checks if email already exists in the DB
    // exits function if exists
    // for(let i = 0; i < allEmailsInDB.length; i++) {
    //     if (email === allEmailsInDB[i].email) {
    //         console.log("this email already exits in the db")
    //         // res.sendStatus(409) // already exists
    //         res.sendStatus(409)
    //         return
    //     }
    // }

    // email does not exists in the DB - send welcome email
    sendWelcomeEmail("Velkommen Til Galleri Taulo", html)
    // await saveEmailAddressesToDB(email)
    res.sendStatus(200)
})

app.listen(port, () => {
  console.log("Server is Running on " + port);
});