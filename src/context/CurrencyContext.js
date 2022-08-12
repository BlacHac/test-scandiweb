import React, {useState} from 'react'

const currencyContext = React.createContext({});

export const CurrencyProvider = ({children}) => {
    const [currency, setCurrency] = useState("USD");
    const value = {currency, setCurrency}
    return (
        <currencyContext.Provider value={value}>
            {children}
        </currencyContext.Provider>
    )
}

export default currencyContext