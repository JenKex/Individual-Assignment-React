import { useStore } from '../data/store.js'
import ShoppingCard from './ShoppingCard.jsx'

const ShoppingCartContent = () => {
    const { orderedList } = useStore((state) => ({
        orderedList: state.orderedList
    }))

    return <section className="shopping-cart-page">
        <div className="shopping-cart-content">
            <div className="shopping-cart-orders-column">
                {(orderedList.length === 0) ?
                    <p>Din kundvagn är tom.</p> : orderedList.map((item) =>
                        <ShoppingCard item={item} key={item.id} />)}
            </div>
            <div className="price-column">
                <p className="total-price">Totalpris</p>
                <button className="buy-button">Köp</button>
            </div>
        </div>
    </section>
}

export default ShoppingCartContent