const ProductCard = ({toy}) =>{

    function orderToy(toy){
        // orderedList: addToy
    }

    return <div className="product-card">
        <img src={toy.image}></img>
        <div className="product-card-text-row">
        <p>{toy.name}</p>
        <h3>{toy.price}</h3>
        </div>
    </div>
}

export default ProductCard