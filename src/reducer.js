
const reducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_CART':
            return {...state, cart: []}
            break;

        case 'REMOVE':
            return {...state, cart:state.cart.filter(cartItem => cartItem.id !== action.payload)}
            break;

        case 'INCREASE':
            let tempCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload) {
                    return {...cartItem, amount: cartItem.amount + 1}
                }
                return cartItem;
            })
            return {...state, cart:tempCart}
            break; 

        case 'DECREASE':
            let reduceCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload) {
                    return {...cartItem, amount: cartItem.amount - 1}
                }
                return cartItem;
            })
            //setting up filter to remove the item if it is less than 1
            .filter(cartItem => cartItem.amount !== 0)
            return {...state, cart:reduceCart}
            break; 
        
        case 'GET_TOTALS':
            let {total,amount} = state.cart.reduce((cartTotal, cartItem) => {
                const {price, amount} = cartItem;
                const itemTotal = price * amount //for the total price
                cartTotal.total += itemTotal
                cartTotal.amount += amount //for the number of items in the cart
                return cartTotal
            }, {total: 0, amount: 0})
            total = parseFloat(total.toFixed(2)) //to handle the decimals to 2 decimal places
            return {...state, total, amount}
            break;
        
        //fetching data
        case 'LOADING':
            return {...state, loading: true}
            break;
        
        case 'DISPLAY_ITEMS':
            return {...state, cart: action.payload, loading: false}
    
        default:
            return state
            break;
    }
}
 
export default reducer

