import { CART_ADD_ITEM } from "../constants/cartConstants";


export const cartReducer = (state = {carItems: []}, action) => {
    switch(action.tpye){
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.carItems.find(x => x.product === item.product)

            if(existItem){
                return{
                    ...state,
                    carItems: state.carItems.map(x => x.product === existItem.product ? item : x)
                }
            }else {
                return {
                    ...state,
                    carItems: [...state.carItems, item]
                }
            }



        default:
            return state
}
}