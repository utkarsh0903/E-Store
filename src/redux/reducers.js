//Always create different file for different reducers.

import {createReducer} from "@reduxjs/toolkit";

export const cartReducer = createReducer({
    cartItems:[],
    subTotal:0,
    shipping:0,
    tax:0,
    total:0
},{});