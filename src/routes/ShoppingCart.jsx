import { useStore } from '../data/store.js'
import ShoppingCard from '../components/ShoppingCard.jsx'
import './ShoppingCart.css'

const ShoppingCart = () =>{
    const { orderedList, setOrderedList } = useStore((state) => ({
        orderedList: state.orderedList,
        setOrderedList: state.setOrderedList
    }))

    let total = orderedList.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price}, 0)

    return <section className="shopping-cart-page">
        <div className="shopping-cart-content">
            {(orderedList.length === 0) ?
                <p>Din kundvagn är tom.</p> : <>
                    <div className="shopping-cart-orders-column">
                        {orderedList.map((item) =>
                            <ShoppingCard item={item} key={item.id} />)}
                    </div>
                    <div className="price-column">
                        <p>Alla köp är slutgiltiga. Väderlek tar ansvar för skadade, slitna, eller trasiga produkter mot uppvisning av kvitto om förseglad förpackning kan bevisas.</p>
                        <h2 className="total-price">{total}:-</h2>
                        <button className="buy-button" onClick={() => setOrderedList([])}>Köp</button>
                    </div>
                    </>}
        </div>
    </section>
}

export default ShoppingCart