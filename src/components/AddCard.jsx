import { useState } from 'react'
import { useStore } from '../data/store.js'
import { getToyList, addToyFirestore } from '../data/crud.js'

const AddCard = () => {
    const { addToyZustand, toyList, setToyList } = useStore((state) => ({
        addToyZustand: state.addToyZustand,
        toyList: state.toyList,
        setToyList: state.setToyList }))
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleAdd = async () => {
        setIsLoading(true)
        // Får 'event is undefined' när jag försöker kalla den som async (event)
        // event.preventDefault()
        const item = {
            name: name,
            id: name,
            price: parseInt(price),
            image: image,
            category: category,
        }

        try {
            await addToyFirestore(item)
            setName('')
            setPrice('')
            setImage('')
            setCategory('')
            setToyList(await getToyList())
        } catch {
            console.log('Något gick fel med servern.')

        } finally {
            console.log(toyList)
            setIsLoading(false)
        }
    }

    // const handleAdd = () => {
    //     const item = {
    //         name: name,
    //         id: name,
    //         price: parseInt(price),
    //         image: image,
    //         category: category
    //     }
    //     addToyZustand(item)
    //     addToyFirestore(item)
        // setName('')
        // setPrice('')
        // setImage('')
        // setCategory('')
    // }

    return <div className="add-card">
        <label> Namn:
            <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </label>
        <label> Pris:
            <input value={price} onChange={(e) => setPrice(e.target.value)}></input>
        </label>
        <label> Bild:
            <input value={image} onChange={(e) => setImage(e.target.value)}></input>
        </label>
        <label> Kategori:
            <input value={category} onChange={(e) => setCategory(e.target.value)}></input>
        </label>
        <button disabled={isLoading} onClick={() => handleAdd()}>Lägg till</button>
    </div>
}

export default AddCard