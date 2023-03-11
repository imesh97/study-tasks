import { db } from "../../../lib/firebase"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore"


export default async function handler(req, res) {
    const { uid } = req.query
    
    const q = query(collection(db, "tasks"), where("userId", "==", uid), orderBy("date"))
    const unsub = onSnapshot(q, (snapshot) => {
        let ar = []
        snapshot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() })
        })
        console.log(ar)
        return res.status(200).json(ar)
    })
    return res.status(200).json({})
}