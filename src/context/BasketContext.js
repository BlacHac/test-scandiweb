import React, {useState} from 'react';

export const basketContext = React.createContext({});

function BasketProvider({children}) {

    const [basket, setBasket] = useState([]);
    //console.log(basket)
    const value = {basket, setBasket} 
    
    return (
        <basketContext.Provider value={value}>
            {children}
        </basketContext.Provider>
    )
}

export default BasketProvider
