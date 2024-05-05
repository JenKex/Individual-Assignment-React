import { useState } from 'react'
import { useStore } from '../data/store.js'
import { addToyFirestore} from '../data/crud.js'
import ProductCard from './ProductCard.jsx'
import EditCard from './EditCard.jsx'
import AddCard from './AddCard.jsx'

const EditPageContent = () => {
    const { toyList, addToyZustand } = useStore((state) => ({ toyList: state.toyList, addToyZustand: state.addToyZustand }))

    return <section className="edit-page-content">
        <div className="edit-toy-grid">
            {toyList.map((item) =>
            <EditCard item={item} key={item.name}/>)}
            <AddCard/>
        </div>
    </section>

}

export default EditPageContent

// Föredrar detta -- att ha två komponenter åtskilda med en ternary operator -- men kräver att man passar upp parametern editMode från
// ett barn till en förälder, vilket kanske känns krångligare än det måste vara?

// {editMode ?
//     toyList.map((toy) =>
//     <EditCard toy={toy} key={toy.name}/>)
//     : toyList.map((toy) =><div>
//         <ProductCard toy={toy} key={toy.name} />
//         <button onClick={toggleEdit}>Edit</button>
//         </div>)}