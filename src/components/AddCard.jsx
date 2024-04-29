import { useState } from 'react'
import { useStore } from '../data/store.js'

const AddCard = () => {
    const { addToyZustand } = useStore((state) => ({ toyList: state.toyList, addToyZustand: state.addToyZustand }))
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')

    const handleAdd = () => {
        const toy = {
            name: name,
            id: name,
            price: parseInt(price),
            image: image,
            category: category
        }
        addToyZustand(toy)
        addToyFirestore(toy)
    }

    return <div>
        <label> Namn:
            <input onChange={(e) => setName(e.target.value)}></input>
        </label>
        <label> Pris:
            <input onChange={(e) => setPrice(e.target.value)}></input>
        </label>
        <label> Bild:
            <input onChange={(e) => setImage(e.target.value)}></input>
        </label>
        <label> Kategori:
            <input onChange={(e) => setCategory(e.target.value)}></input>
        </label>
        <button onClick={() => handleAdd()}></button>
    </div>
}

export default AddCard