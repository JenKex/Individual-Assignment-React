import { create } from "zustand";

export const useStore = create((set) => ({
    toyList: [
        {
            name: "Badboll",
            id: 1,
            image: "https://m.media-amazon.com/images/I/61YL-c2pZOL._AC_UF894,1000_QL80_.jpg",
            price: 29,
            category: "Sport"
        },
        {
            name: "Solglasögon",
            id: 2,
            image: "https://babysafety.se/cdn/shop/products/Solglasogonbarnbla.jpg?v=1674045737&width=1445",
            price: 39,
            category: "Clothes"
        }
    ],

    setToyList: newToyList => set((state) => ({
        toyList: newToyList
    })),
    
    addToyZustand: toy => set(state => ({
        toyList: [...state.toyList,
        {
            name: toy.name,
            id: toy.name,
            image: toy.image,
            price: toy.price,
            category: toy.category
        }]
    })),

    deleteToyZustand: (id) =>
    set((state) => ({
      toyList: state.toyList.filter((item) => item.id !== id)
    })),

    editToyZustand: (updatedItem) =>
    set((state) => ({
      toyList: state.toyList.map((item) => item.id === updatedItem.id ? {
        ...item,
  
        name: updatedItem.name,
        price: updatedItem.price,
        image: updatedItem.image,
        category: updatedItem.category
      } : item)
    })),

    searchList: [],

    setSearchList: (items) => set({ searchList: items }),

    orderedList: [],

    setOrderedList: (items => set({ orderedList: items })),

    addOrderedToy: (item) => set((state) => ({
        orderedList: [
            ...state.orderedList,
            {
                ...item,

                id: Date.now()
            }
        ]
    })),

    deleteOrderedToy: (id) =>
    set((state) => ({
      orderedList: state.orderedList.filter((item) => item.id !== id)
    })),



}))
