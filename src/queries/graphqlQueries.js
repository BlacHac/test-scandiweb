import {gql} from '@apollo/client';


export const MASTER_DATA = gql`
query{
    categories{
      name
      products{
        id
        name
        inStock
        gallery
        description
        category
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        prices{
          currency{
            label
            symbol
          }
          amount
        }
        brand
      }
    }
}
`

export const CURRENCY = gql`
  query{
    currencies{
      label
      symbol
    }
}
`