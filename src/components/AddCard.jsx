import { useState, useEffect } from 'react'
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
    const [nameError, setNameError] = useState(' ')
    const [imageError, setImageError] = useState(' ')
    const [priceError, setPriceError] = useState(' ')
    const [categoryError, setCategoryError] = useState(' ')

    useEffect(() => {
        if (nameError === '' && imageError === '' && priceError === '' && categoryError === '') {
            handleAdd();
        }
    }, [nameError, imageError, priceError, categoryError]);

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
        setNameError(' ')
        setPriceError(' ')
        setImageError(' ')
        setCategoryError(' ')
    }

    function checkName() {
        if (name.length === 0) {
            setNameError('Vänligen fyll i ett namn.')
        }
        else {
            setNameError('')
        }
    }

    function checkImage() {
        if (image.length === 0) {
            setImageError('Vänligen fyll i en bildlänk.')
        }
        else if (!image.includes('http')) {
            setImageError('Länken måste ha ett giltigt format.')
        }
        else {
            setImageError('')
        }
    }

    function checkPrice() {
        if (price.length === 0) {
            setPriceError('Vänligen fyll i ett pris.')
        }
        else if (!(/[0-9]+$/.test(price))) {
            setPriceError('Detta fält kan bara ha siffror i sig.')
        }
        else {
            setPriceError('')
        }
    }

    function checkCategory() {
        if (category.length === 0) {
            return setCategoryError('Vänligen fyll i en beskrivning.')
        }
        else if (category.includes(' ')) {
            return setCategoryError('En kategori måste vara enbart ett ord.')
        }
        else {
            setCategoryError('')
        }
    }

    function checkError(){
        checkName()
        checkPrice()
        checkImage()
        checkCategory()
    }

    return <div className="add-card">
            <input placeholder='Namn' value={name} onChange={(e) => setName(e.target.value)}></input>
            <p>{nameError}</p>
            <input placeholder='Pris' value={price} onChange={(e) => setPrice(e.target.value)}></input>
            <p>{priceError}</p>
            <input placeholder='Bildadress' value={image} onChange={(e) => setImage(e.target.value)}></input>
            <p>{imageError}</p>
            <input placeholder='Kategori' value={category} onChange={(e) => setCategory(e.target.value)}></input>
            <p>{categoryError}</p>
        <button disabled={isLoading} onClick={() => checkError()}>Lägg till</button>
    </div>
}

export default AddCard