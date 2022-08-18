import React, {useState} from 'react';

export const basketContext = React.createContext({});

function BasketProvider({children}) {

    const [basket, setBasket] = useState([]);
    //console.log(basket)
    let totalQuantity = 0;
    basket.forEach(_product => totalQuantity += _product.qty)

    const value = {basket, setBasket, totalQuantity} 
    
    return (
        <basketContext.Provider value={value}>
            {children}
        </basketContext.Provider>
    )
}

export default BasketProvider
