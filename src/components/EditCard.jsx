import { deleteToyFirestore, editToyFirestore, getToyList } from "../data/crud"
import { useState } from 'react'
import { useStore } from '../data/store.js'

const EditCard = ({ item }) => {

    //Borde kanske bara ha ett kort med en ternary operator för både display och produkt, eftersom det annars kollar mot en global state-variabel, och flippar allting till att antingen vara editable eller ej. Det skulle kännas smidigt att bara ha en isEditing ? <EditCard/> : <ProductCard/> bara från en visuell ståndpunkt, men skulle få fixa någonting för individuella variabler.

    const { editToyZustand, deleteToyZustand, toyList, setToyList } = useStore((state) => ({ editToyZustand: state.editToyZustand, deleteToyZustand: state.deleteToyZustand, toyList: state.toyList, setToyList: state.setToyList }))
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [image, setImage] = useState(item.image)
    const [category, setCategory] = useState(item.category)
    const [editMode, setEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // Sätt sedan 'disabled = {isLoading}'.

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
	}

    const handleDelete = async (item) => {
		setIsLoading(true)
		await deleteToyFirestore(item.key)
		const toysFromFirestore = await getToyList()
		setToyList(toysFromFirestore)
		setIsLoading(false)
	}

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
    // 2: sätt edit-knappen till disabled om fälten inte är korrekt validerade, kolla om fälten är korrekt inskrivna i varje onChange (t.ex.  nameValidate(event){setName(event.target.value) checkErrorName()}, onChange {() => nameValidate})
    // Detta ska förhoppningsvis förhindra fulhacks med UseEffect som förra gången.

    return <section>
        {editMode ? <div className="edit-card">
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
            <button onClick={() => handleEdit(item)}></button>
        </div> :
            <div className="display-card">
                <img src={item.image}></img>
                <div className="display-card-text-row">
                    <p>{item.name}</p>
                    <h3>{item.price}</h3>
                </div>
                <div className="button-row">
                    <button onClick={toggleEdit}>Redigera</button>
                    <button onClick={() => handleDelete(item)}>Radera</button>
                </div>
            </div>}
    </section>
}

export default EditCard