import { createSlice,current } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';
enableMapSet()
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    totalPrice: 0,
    watchlist:[]
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1
      state.totalPrice -= action.payload.price * action.payload.quantity;
      state.products.splice(
        state.products.findIndex(item => item._id === action.payload), 1
      )

    },
    increaseQuantity: (state, action) => {
     

      state.products.map(product => {
        if (product._id === action.payload._id) {
          product.quantity += 1
          state.totalPrice += action.payload.price 
        }
       
      })
    
    },
    decreaseQuantity: (state, action) => {
    
      state.products.map(product => {
        if (product._id === action.payload._id) {
         if(product.quantity > 1){
          product.quantity -= 1
          state.totalPrice -= action.payload.price 
         }
        }
      
      })

    },
addToWatchList:(state, action) => {

  const item = action.payload;
            // if (!state.watchlist.find(elem => elem.item._id === item.item._id)) {
                state.watchlist.push(item);
// }
},
removeFromWatchlist:(state, action) => {
  state.watchlist.splice(
    state.watchlist.findIndex(item => item._id === action.payload), 1
  )
}
  }
});


export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity, addToWatchList, removeFromWatchlist } = cartSlice.actions;
export default cartSlice.reducer;