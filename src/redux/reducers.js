//Always create different file for different reducers.

import {createReducer} from "@reduxjs/toolkit";

export const cartReducer = createReducer({
    cartItems:[],
    subTotal:0,
    shipping:0,
    tax:0,
    total:0
},{
    addToCart : (state, action) => {
        const item = action.payload;
        const isItemExist = state.cartItems.find((i) => i.id === item.id);

        if(isItemExist){
            state.cartItems.forEach((i) => {
                if(i.id === item.id) {
                    i.quantity++;
                }
            })

        } else{
            state.cartItems.push(item);
        }

    },

    increment : (state, action) =>{

        state.cartItems.forEach((i) => {
            if(i.id === action.payload) {
                i.quantity++;
            }
        })
    },

    decrement : (state, action) =>{
        const item = state.cartItems.find((i) => i.id === action.payload);
            if(item.quantity > 1) {
                item.quantity--;
            } else {

            }

    },

    deleteFromCart : (state, action) =>{
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },

    calculatePrice : (state) => {
        let sum = 0;
        state.cartItems.forEach((i) => sum += i.price*i.quantity);
        state.subTotal = sum;
        state.shipping = state.subTotal > 0 ? (state.subTotal > 15000 ? 0 : 200) : 0;
        state.tax = (state.subTotal * 0.18).toFixed();
        state.total = state.subTotal + state.shipping + state.tax;
    }
});