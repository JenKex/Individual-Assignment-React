import { useStore } from '../data/store.js'

const ProductCard = ({item}) =>{
    const { addOrderedToy } = useStore((state) => ({
        addOrderedToy: state.addOrderedToy}))

    function orderToy(item){
        addOrderedToy(item)
    }

    return <div className="product-card">
        <img src={item.image}></img>
        <div className="product-card-text-row">
        <h2>{item.name}</h2>
        <p>{item.category}</p>
        <h3>{item.price}:-</h3>
        <button className="add-button" onClick={() => orderToy(item)}>+</button>
        </div>
    </div>
}

export default ProductCard