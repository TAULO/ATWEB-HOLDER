import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc, orderBy, query } from 'firebase/firestore/lite';
import { uploadBytes, getStorage, ref, getDownloadURL } from "firebase/storage"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAtVqPYeAhzVA43mig1fg44Ylg8VblWRNo",
  authDomain: "atweb-8f6b2.firebaseapp.com",
  projectId: "atweb-8f6b2",
  storageBucket: "atweb-8f6b2.appspot.com",
  messagingSenderId: "551624378796",
  appId: "1:551624378796:web:a9711dbb0fc9955de39209"
};

const images_path = "images/"

const landingPagePath = "landingImages/"
const exhibitionPagePath = "exhibitonImage/"

const _collection = "images"
const _collectionExhibition = "exhibitions"
const _collectionEmailAdresses = "SubscribersEmail"

// Initialize Firebase auth 
// const auth = getAuth(firebaseConfig)

// Initialize Firebase database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const dbRefURL = collection(db, _collection)
const dbRefExhibition = collection(db, _collectionExhibition)
const dbRefEmail = collection(db, _collectionEmailAdresses)

// Initialize Firebase storage
const storage = getStorage()

class Firebase {
    // ------------------STORAGE------------------
    async uploadFilesToStorage(name, file, type) {
        const metadata = {
            contentType: type
        }
        const storageRef = ref(storage, images_path + name)
        return await uploadBytes(storageRef, file, metadata)
        .then(console.log("[STORAGE]","Added:", name))
        .catch(e => console.log("[STORAGE]","Error when trying to upload: ", name, e))
    }

    async getFilesURLFromStorage(name) {
        const storageRef = ref(storage, images_path + name)
        return await getDownloadURL(storageRef)
    }
    
    // ------------------DATEBASE (URL)------------------
    async saveFilesURLToDB(name, type, url) {
        const docRef = doc(db, _collection, name)
        return await setDoc(docRef, {
            name: name,
            type: type,
            url: url
        })
        .then(console.log("[DATABASE]","Added:", name))
        .catch(e => console.log("[DATABASE]","Error when trying to add:", name, e))
    }

    async getAllFilesFromDB() {
        const data = []
        const querySnapshot = await getDocs(dbRefURL)
        querySnapshot.forEach(doc => {
            data.push(doc.data())
        })
        return data;
    }

    async deleteFileFromDB(name) {
        return await deleteDoc(doc(db, _collection, name))
        .then(console.log("[DATABASE]", "Deleted:", name))
        .catch(e => console.log("[DATABASE]", "Error when trying to delete:", name, e))
    }

    // ------------------DATABASE (EXHIBITION)------------------
    async saveExhiptionToDB(title, description, address, startDate, endDate, url) {
        const docRef = doc(db, _collectionExhibition, title)
        return await setDoc(docRef, {
            title: title,
            description: description,
            address: address,
            startDate: startDate,
            endDate: endDate,
            url: url
        })
        .then(console.log("[DATABASE]","Added:", title, " to exhibitions"))
    }

    async getExhibitonFromDB() {
        const data = []
        const querySnapshot = await getDocs(dbRefExhibition)
        querySnapshot.forEach(doc => {
            data.push(doc.data())
        })
        return data;
    }

    async deleteExhiptionFromDB(title) {
        return await deleteDoc(doc(db, _collectionExhibition, title))
        .then(console.log("[DATABASE]", "Deleted:", title, "from exhibitions database"))
        .catch(e => console.log("[DATABASE]", "Error when trying to delete:", title, e))
    }

    async filterExhibitionStartDateAsc() {
        const filterArr = []
        const order = query(dbRefExhibition, orderBy("startDate", "asc"))
        const docSnap = await getDocs(order)
        docSnap.forEach(e => {
            filterArr.push(e.data())
        })
        return filterArr
    }

    async filterExhibitionEndDateAsc() {
        const filterArr = []
        const order = query(dbRefExhibition, orderBy("startDate", "desc"))
        const docSnap = await getDocs(order)
        docSnap.forEach(e => {
            filterArr.push(e.data())
        })
        return filterArr
    }

    async filterExhibitionTitleAsc() {
        const filterArr = []
        const order = query(dbRefExhibition, orderBy("title".toLowerCase(), "asc"))
        const docSnap = await getDocs(order)
        docSnap.forEach(e => {
            filterArr.push(e.data())
        })
        console.log(filterArr)
        return filterArr
    }

    // ------------------DATABASE (EMAIL ADRESSES)------------------
    async saveEmailAddressesToDB(email) {
        const docRef = doc(db, _collectionEmailAdresses, email)
        return await setDoc(docRef, {
            email: email
        })
        .then(console.log("[DATABASE]","Added:", email, " to emails"))
    }

    async getEmailAddressesFromTB() {
        const data = []
        const querySnapshot = await getDocs(dbRefEmail)
        querySnapshot.forEach(doc => {
            data.push(doc.data())
        })
        return data;
    }
}

export default Firebase
