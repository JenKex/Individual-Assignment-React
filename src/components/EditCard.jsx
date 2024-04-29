import { deleteToyFirestore, editToyFirestore } from "../data/crud"
import { useState } from 'react'
import { useStore } from '../data/store.js'

const EditCard = ({ toy }) => {

    //Borde kanske bara ha ett kort med en ternary operator för både display och produkt, eftersom det annars kollar mot en global state-variabel, och flippar allting till att antingen vara editable eller ej. Det skulle kännas smidigt att bara ha en isEditing ? <EditCard/> : <ProductCard/> bara från en visuell ståndpunkt, men skulle få fixa någonting för individuella variabler.

    const { editToyZustand, deleteToyZustand } = useStore((state) => ({ editToyZustand: state.editToyZustand, deleteToyZustand: state.deleteToyZustand }))
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [editMode, setEditMode] = useState(false)
    function toggleEdit() {
        setEditMode(!editMode)
    }

    function handleEdit(item) {
        let updatedItem = {
            name: name,
            id: item.id,
            image: image,
            price: parseInt(price),
            category: category
        }
        editToyZustand(updatedItem)
        !editMode
    }

    function handleDelete(item) {
        deleteToyZustand(item.id)
    }

    // Skriv funktioner för: Validering
    // Två möjligheter för detta:
    // 1: Gör onChange-events som sätter felmeddelanden, skriv en if-else funktion som Editknappen kör där den inte pushar förändringar om felmeddelanden finns 
    // 2: sätt edit-knappen till disabled om fälten inte är korrekt validerade, kolla om fälten är korrekt inskrivna i varje onChange (t.ex.  nameValidate(event){setName(event.target.value) checkErrorName()}, onChange {() => nameValidate})
    // Detta ska förhoppningsvis förhindra fulhacks med UseEffect som förra gången.

    return <section>
        {editMode ? <div>
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
            <button onClick={() => handleEdit()}></button>
        </div> :
            <div className="display-card">
                <img src={toy.image}></img>
                <div className="display-card-text-row">
                    <p>{toy.name}</p>
                    <h3>{toy.price}</h3>
                </div>
                <div className="button-row">
                    <button onClick={toggleEdit}>Redigera</button>
                    <button onClick={handleDelete}>Radera</button>
                </div>
            </div>}
    </section>
}

export default EditCard