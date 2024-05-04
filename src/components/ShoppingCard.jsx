import { useStore } from '../data/store.js'

const ShoppingCard = ({item}) =>{
    const { deleteOrderedToy } = useStore((state) => ({
        deleteOrderedToy: state.deleteOrderedToy }))

    function deleteToy(item){
        console.log(item)
        deleteOrderedToy(item.id)
    }

    return <div className="shopping-card">
        <img src={item.image}></img>
        <div className="shopping-card-text-row">
        <p>{item.name}</p>
        <h3>{item.price}</h3>
        </div>
        <button className="remove-button" onClick={() => deleteToy(item)}>-</button>
    </div>
}

export default ShoppingCard