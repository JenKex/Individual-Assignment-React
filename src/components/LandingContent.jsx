import { useStore } from '../data/store.js'
import { useState, useEffect } from 'react'
import { getToyList } from '../data/crud.js'
import ProductCard from './ProductCard.jsx'

const LandingContent = () => {

    const { toyList,  setToyList, searchList, setSearchList } = useStore((state) => ({
        toyList: state.toyList,
        setToyList: state.setToyList,
        searchList: state.searchList,
        setSearchList: state.setSearchList } ))
    console.log('LandingPage:', toyList)
    const [searchValue, setSearchValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleGetToyList = async () => {
        setToyList(await getToyList())
    }

    // const resetToyList = async () => {
    //     Finns det något sätt att lägga till en hel lista i Firestore? Isåfall skulle jag kunna nollställa ifrån en Zustand-lista.
    // }

    const handleSearch = (event) => {
        const value = event.target.value;
        
        const filteredToys = toyList.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) || item.category.toLowerCase().includes(value.toLowerCase())
        );
        setSearchValue(value);
        setSearchList(filteredToys);
    };

    // const handleSort(){
    //     toyList.sort(toy.name)
    //     toyList.sort(toy.price)
    //     (function (a, b) {return a-b})
    // }
    //

    // if searchValue.includes `0-9`, const setErrorMessage('Vänligen skriv produktens namn med bokstäver.')

    return <div className="landing-page">
        <div className="landing-banner-image">
        </div>
        <section className="product-section">
        <input className="product-search" placeholder="Badboll, solglasögon..." value={searchValue} onChange={handleSearch}></input>
            <div className="product-grid">
                {searchValue === '' ? toyList.map((item) =>
                    <ProductCard item={item} key={item.name} />) :
                    searchList.map((item) =>
                    <ProductCard item={item} key={item.name} />)}
            </div>
        </section>
    </div>
}

export default LandingContent