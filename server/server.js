import express from "express";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import Nylas from "nylas"
import bodyParser from "body-parser";
import fetch from "node-fetch";
import pug from "pug"

const port = 510
const app = express();

app.use(express.static('views'));
// app.set("view-engine", "html")
app.set("view engine", "pug");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(express.json());
// app.use(bodyParser.text());

// nylas setup
Nylas.config({
    clientId: "6izhh7mrazfut3e3y47yn0x6m",
    clientSecret: "7jhgquw43eacyrv02nkiouag6",
})
const nylas = Nylas.with("4btuzcbanAULrLncTtkNpHhLc2ZsBk")

// firebase setup
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


// middleware to handle CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// database 
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

// email
app.get("/", (req, res) => {
    res.render("pug.pug")
})

function htmlBody(title, startDate, endDate) {
    const hey = ``
    return `<div style={{"color:red"}}>
        <div>Ny udstilling Præsenteres: ${title}</div>
        <br></br>
        <div  style={{backgroundColor: "red"}}>Kom og se med hvor min nye udstilling starter den. ${startDate} indtil ${endDate} </div>
        <br></br>
        <div>Kig forbi <a href="a">Galleri Taulo</a> for flere informationer</div>
    </div>`
}

app.post("/new-exhibition", async (req, res) => {
    const payload = req.body
    const data = await getEmailAddressesFromTB()
    const htmlResp = await fetch("http://127.0.0.1:5500/server/views/newExhibitionEmail.html")
    const html = await htmlResp.text()

    const pugRes = await fetch("http://localhost:510/")
    const pug = await pugRes.text()

    const emails = data.map(email => {
        return {
            email: email.email
        }
    })

    function sendNewExhibitionEmail(subject, body) {
        const draft = nylas.drafts.build({
            subject: subject,
            body: body, 
            to: emails
        })
            draft.send().then(message => {
            console.log(message)
        })
    }
    sendNewExhibitionEmail("Ny udstilling hos Galleri Taulo", htmlBody(payload.title, payload.startDate.replace("T", " kl "), payload.endDate.replace("T", " kl ")))
    res.sendStatus(200)
});

app.post("/welcome", async (req, res) => {
    const email = req.body
    const allEmailsInDB = await getEmailAddressesFromTB()

    // guard that checks if email already exists in the DB
    // exits function if email exists
    for(let i = 0; i < allEmailsInDB.length; i++) {
        if (email.email === allEmailsInDB[i].email) {
            console.log(email.email, "already exits in the db") 
            res.sendStatus(409) // already exists
            return
        }
    }

    // fetch the HTML Welcome Body to display in email
    const resp = await fetch("http://127.0.0.1:5500/server/views/WelcomeEmailBody.html")
    const html = await resp.text()

    function sendWelcomeEmail(subject, body) {
        const draft = nylas.drafts.build({
            subject: subject,
            body: body,
            to: [{email: email.email}]
        })
        draft.send().then(message => {
            console.log(message)
        })
    }

    // email does not exists in the DB - send welcome email
    sendWelcomeEmail("Velkommen Til Galleri Taulo", html)
    await saveEmailAddressesToDB(email.email)
    res.sendStatus(200)
})

app.listen(port, () => {
  console.log("Server is Running on " + port);
});