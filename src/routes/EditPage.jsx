import { useStore } from '../data/store.js'
import './EditPage.css'

const EditPage = () =>{
    const { toyList, addToyZustand } = useStore((state) => ({ toyList: state.toyList, addToyZustand: state.addToyZustand }))

    return <section className="edit-page-content">
        <div className="edit-toy-grid">
            {toyList.map((item) =>
            <EditCard item={item} key={item.name}/>)}
            <AddCard/>
        </div>
    </section>
}

export default EditPage