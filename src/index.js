import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloProvider} from '@apollo/client';
import {Client} from './client';
import DataLayerProvider from './context/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    //<React.StrictMode>
        <ApolloProvider client={Client}>
            <DataLayerProvider>
                <App />
            </DataLayerProvider>    
        </ApolloProvider>
    //</React.StrictMode>
);


