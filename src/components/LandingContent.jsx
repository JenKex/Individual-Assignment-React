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
    const [checkRender, setCheckRender] = useState(true)

    // const resetToyList = async () => {
    //     Finns det något sätt att lägga till en hel lista i Firestore? Isåfall skulle jag kunna nollställa ifrån en Zustand-lista.
    // }

    // checkRender och toggleRender är en rent ut sakt äcklig liten fix för att omrendera webbsidan när den sorteras. När det funkade utan knussel var det som att Jesus själv uppenbarades för att ge mig tummen upp. Detta skrevs klockan 23:11 på kvällen.

    function toggleRender(){
        setCheckRender(!checkRender)
    }

    const handleSearch = (event) => {
        const value = event.target.value;
        
        const filteredToys = toyList.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) || item.category.toLowerCase().includes(value.toLowerCase())
        );
        setSearchValue(value);
        setSearchList(filteredToys);
    };

    const handleNameSortAsc = () => {
        toyList.sort((a, b) => (a.name > b.name) ? 1 : -1)
        console.log(toyList)
        toggleRender()
    }

    const handleNameSortDesc = () => {
        toyList.sort((a, b) => (b.name > a.name) ? 1 : -1)
        console.log(toyList)
        toggleRender()
    }

    const handlePriceSortAsc = () => {
        toyList.sort((a, b) => (a.price > b.price) ? 1 : -1)
        console.log(toyList)
        toggleRender()
    }

    const handlePriceSortDesc = () => {
        toyList.sort((a, b) => (b.price > a.price) ? 1 : -1)
        console.log(toyList)
        toggleRender()
    }

    // function compareNumbers(a, b) {
    //     return a - b;
    //   }

    // const handleSort = () => {
    //     const sortedToys = (toyList.item.price).sort(compareNumbers)
    //     setSearchList(sortedToys)
    // }      

    // const handleSort = () => {
    //     toyList.sort(toy.name)
    //     toyList.sort(toy.price)
    //     (function (a, b) {return a-b})
    // }
    //

    // if searchValue.includes `0-9`, const setErrorMessage('Vänligen skriv produktens namn med bokstäver.')

    return <div className="landing-page">
        <div className="landing-banner-image">
            <div className="banner-blurb">
                <h2>Lek ohoj!</h2>
                <p>Välkommen till Väderlek, en leksaksbutik utformat med fullfjädrat barnasinne. Under våra digitala segel kommer du alltid hitta stoj och stim.</p>
            </div>
        </div>
        <section className="product-section">
        <input className="product-search" placeholder="Badboll, solglasögon..." value={searchValue} onChange={handleSearch}></input>
        <div className="select-sort-type">
            <p>Sortera efter:</p>
            <p className="sorting-name">Namn</p>
            <p className="sorting-arrow" onClick={() => handleNameSortAsc()}>￪</p>
            <p className="sorting-arrow" onClick={() => handleNameSortDesc()}>￬</p>
            <p className="sorting-price">Pris</p>
            <p className="sorting-arrow" onClick={() => handlePriceSortAsc()}>￪</p>
            <p className="sorting-arrow" onClick={() => handlePriceSortDesc()}>￬</p>
        </div>
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