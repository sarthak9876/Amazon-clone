export const initialState= {
    basket: [],
    user: null
};

// Context API and Redux are not the same but they use the same pattern i.e they work as a global storage location

export const getBasketTotal = (basket) => 
basket?.reduce((amount, item) => item.price + amount, 0); // we are adding the price of the item to the past amount and setting the default amount to 0

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case 'REMOVE_FROM_BASKET':
                const index =state.basket.findIndex(
                    (basketItem) => basketItem.id === action.id
                );
                let newBasket = [...state.basket];
                if(index >= 0){
                    newBasket.splice(index,1);

                }else{
                    console.warn(
                        `Can't remove product (id: ${action.id} as its not in basket!)`
                    )
                }
                return{
                    ...state,
                    basket: newBasket
                }
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            }
        default:
            return state;
    }
};

export default reducer; 