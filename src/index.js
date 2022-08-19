import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloProvider} from '@apollo/client';
import {Client} from './client';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    //<React.StrictMode>
        <ApolloProvider client={Client}>
            <App />
        </ApolloProvider>
    //</React.StrictMode>
);


