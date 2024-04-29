import { useStore } from '../data/store.js'
import { useState } from 'react'
import ProductCard from './ProductCard.jsx'
import { getToyList } from '../data/crud.js'

const LandingContent = () => {
    const { toyList,  setToyList, searchList, setSearchList } = useStore((state) => ({
        toyList: state.toyList,
        setToyList: state.setToyList,
        searchList: state.searchList,
        setSearchList: state.setSearchList } ))
    console.log('LandingPage:', toyList)
    const [searchValue, setSearchValue] = useState('')

    const handleGetToyList = async () => {
        setToyList(await getToyList())
    }

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchValue(value);

        const filteredToys = toyList.filter(toy =>
            toy.name.toLowerCase().includes(value.toLowerCase()) || toy.category.toLowerCase().includes(value.toLowerCase())
        );
        setSearchList(filteredToys);
    };

    // const handleSort(){
    //     toyList.sort(toy.name)
    //     toyList.sort(toy.price)
    //     (function (a, b) {return a-b})
    // }
    //

    return <div className="landing-page">
        <div className="landing-banner-image">
        </div>
        <section className="product-section">
        <input className="product-search" placeholder="Badboll, solglasögon..." value={searchValue} onChange={handleSearch}></input>
        <button onClick={handleGetToyList}>Hämta från Firestore</button>
            <div className="product-grid">
                {searchValue === '' ? toyList.map((toy) =>
                    <ProductCard toy={toy} key={toy.name} />) :
                    searchList.map((toy) =>
                    <ProductCard toy={toy} key={toy.name} />)}
            </div>
        </section>
    </div>
}

export default LandingContent