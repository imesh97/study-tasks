import { db } from "./firebase"
import { doc, addDoc, deleteDoc, updateDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore"

export async function getUserData(uid) {
    let tasks = []
    let subjects = []

    let q = query(collection(db, "tasks"), where("userId", "==", uid), orderBy("date"))
    let snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() })
    })

    q = query(collection(db, "subjects"), where("userId", "==", uid))
    snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
        subjects.push({ id: doc.id, ...doc.data() })
    })
    
    let data = {
        userId: uid,
        tasks: tasks,
        subjects: subjects
    }

    return { data }
}

export async function addTask(task) {
    try {
        await addDoc(collection(db, "tasks"), task)
    } catch (err) { }
}

export async function addSubject(subject) {
    try {
        await addDoc(collection(db, "subjects"), subject)
    } catch (err) { }
}

export async function deleteTask(id) {
    try {
        await deleteDoc(doc(db, "tasks", id))
    } catch (err ) { }
}

export async function deleteSubject(id) {
    try {
        await deleteDoc(doc(db, "subjects", id))
    } catch (err ) { }
}

export async function toggleTaskStatus(id, status) {
    try {
        await updateDoc(doc(db, "tasks", id), { status })
    } catch (err) { }
}

export async function updateTask(id, taskData) {
    try {
        await updateDoc(doc(db, "tasks", id), taskData)
    } catch (err) { }
}

export async function updateSubject(id, subjectData) {
    try {
        await updateDoc(doc(db, "subjects", id), subjectData)
    } catch (err) { }
}