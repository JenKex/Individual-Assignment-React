import { deleteToyFirestore, editToyFirestore, getToyList } from "../data/crud"
import { useState, useEffect } from 'react'
import { useStore } from '../data/store.js'

const EditCard = ({ item }) => {

    //Borde kanske bara ha ett kort med en ternary operator för både display och produkt, eftersom det annars kollar mot en global state-variabel, och flippar allting till att antingen vara editable eller ej. Det skulle kännas smidigt att bara ha en isEditing ? <EditCard/> : <ProductCard/> bara från en visuell ståndpunkt, men skulle få fixa någonting för individuella variabler.

    const { editToyZustand, deleteToyZustand, toyList, setToyList } = useStore((state) => ({ editToyZustand: state.editToyZustand, deleteToyZustand: state.deleteToyZustand, toyList: state.toyList, setToyList: state.setToyList }))
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [image, setImage] = useState(item.image)
    const [category, setCategory] = useState(item.category)
    const [editMode, setEditMode] = useState(false)
    const [nameError, setNameError] = useState(' ')
    const [imageError, setImageError] = useState(' ')
    const [priceError, setPriceError] = useState(' ')
    const [categoryError, setCategoryError] = useState(' ')
    const [isLoading, setIsLoading] = useState(false)
    // Sätt sedan 'disabled = {isLoading}'.

    useEffect(() => {
        if (nameError === '' && imageError === '' && priceError === '' && categoryError === '') {
            handleEdit(item);
        }
    }, [nameError, imageError, priceError, categoryError]);

    function toggleEdit() {
        setEditMode(!editMode)
    }

    // Eftersom Firestore behöver key-attributen för att veta vart den ska redigera och radera är det nog bäst att skrota tanken om att uppdatera Firestore och Zustand separat för att undvika laddning, utan bara spara+hämta från Firestore i ett svep så att key följer med i varje steg av listan. Men add/delete-funktionerna i Zustand är fortfarande bra att ha när det kommer till att lägga till i kundvagnen, så vi kan låtsas att det inte är bortslösad tid.

    const handleEdit = async (item) => {
		const updatedItem = {
            name: name,
            id: item.id,
            image: image,
            price: parseInt(price),
            category: category
        }
		await editToyFirestore(item.key, updatedItem)
		const updatedList = await getToyList()
		setToyList(updatedList)
        setNameError(' ')
        setPriceError(' ')
        setImageError(' ')
        setCategoryError(' ')
        toggleEdit()
	}

    const handleDelete = async (item) => {
		setIsLoading(true)
		await deleteToyFirestore(item.key)
		const toysFromFirestore = await getToyList()
		setToyList(toysFromFirestore)
		setIsLoading(false)
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

    // Skrotade funktioner för validering -- tanken var att leda in i en popup med en 'Är du säker?'-typ request, så att felmeddelandet sätts och sedan görs valideringen, för att dela upp det i två separata steg. Problemet är som de andra problemen -- att variabeln sätts samtidigt som den kollas 
    // Detta kommer också kvarstå för setdisabled om jag gör det med onChange-effekter. Använder useEffect och fulhacks trots allt.

    function checkError(){
        checkName()
        checkPrice()
        checkImage()
        checkCategory()
    }

    // function validateItem(item){
    //     if (nameError === '' && priceError === '' && imageError === '' && categoryError === ''){
    //         handleEdit(item)
    //     }
    //     else{
    //         setErrorVisible(true)
    //     }
    // }

    // function handleEdit(item) {
    //     console.log(item)
    //     let updatedItem = {
    //         name: name,
    //         id: item.id,
    //         image: image,
    //         price: parseInt(price),
    //         category: category
    //     }
    //     editToyZustand(updatedItem)
    //     toggleEdit()
    // }

    // function handleDelete(item) {
    //     console.log(item)
    //     deleteToyZustand(item.id)
    // }

    // Skriv funktioner för: Validering
    // Två möjligheter för detta:
    // 1: Gör onChange-events som sätter felmeddelanden, skriv en if-else funktion som Editknappen kör där den inte pushar förändringar om felmeddelanden finns
    // (Anmärkningar till detta: Samma problem som ursprungliga försöket i förra grupparbetet. Eftersom en onChange effekt både tar förändringen och kollar efter förändringen samtidigt ligger den ofta 'ett steg efter', alltså om man raderar sista bokstaven i fältet står det inget fel, men när man skriver in en bokstav dyker felet upp.)
    // 2: sätt edit-knappen till disabled om fälten inte är korrekt validerade, kolla om fälten är korrekt inskrivna i varje onChange (t.ex.  nameValidate(event){setName(event.target.value) checkErrorName()}, onChange {() => nameValidate})
    // Detta ska förhoppningsvis förhindra fulhacks med UseEffect som förra gången.
    // (Anmärkningar från framtiden: Fulhacks fortsätter.)

    return <section>
        {editMode ? <div className="edit-card">
                <input placeholder='Namn' value={name} onChange={(e) => setName(e.target.value)}></input>
            <p>{nameError}</p>
                <input placeholder='Pris' value={price} onChange={(e) => setPrice(e.target.value)}></input>
            <p>{priceError}</p>
                <input placeholder='Bildadress' value={image} onChange={(e) => setImage(e.target.value)}></input>
            <p>{imageError}</p>
                <input placeholder='Kategori' value={category} onChange={(e) => setCategory(e.target.value)}></input>
            <p>{categoryError}</p>
            <button onClick={() => checkError()}>Spara</button>
        </div> :
            <div className="display-card">
                <img src={item.image}></img>
                <div className="display-card-text-row">
                    <p>{item.name}</p>
                    <h3>{item.price}:-</h3>
                </div>
                <div className="button-row">
                    <button onClick={toggleEdit}>Redigera</button>
                    <button onClick={() => handleDelete(item)}>Radera</button>
                </div>
            </div>}
    </section>
}

export default EditCard