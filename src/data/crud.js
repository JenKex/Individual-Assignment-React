import {collection, getDocs, addDoc, deleteDoc, updateDoc, doc} from 'firebase/firestore/lite'
import {db} from './fire.js'

const collectionName = 'toys'
const collectionRef = collection(db, collectionName)

async function getToyList(){
    const toyCollection = collection(db, collectionName)
    const toySnapshot = await getDocs(toyCollection)
    console.log('getToyList: snapshot is', toySnapshot)
    const toyList = toySnapshot.docs.map(doc => withKey(doc))
    return toyList
}

function withKey(doc){
    let o = doc.data()
    o.key = doc.id
    return o
}

async function addToyFirestore(toy) {
	await addDoc(collectionRef, toy)
}

async function deleteToyFirestore(key) {
	const docRef = doc(collectionRef, key)
	deleteDoc(docRef)
}

async function editToyFirestore(key, updatedToy) {
	const docRef = doc(collectionRef, key)
	await updateDoc(docRef, updatedToy)
}


export { getToyList, addToyFirestore, deleteToyFirestore, editToyFirestore }