import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderType: '',
    paymentMethod: '',
    paidOrder: false,
    checkOut: true,
    changed: false,
    orderDetail: [],
    user: [],
    discount: ''
  },
  reducers: {
    addpaymentMethod(state, action) {
      state.changed = true;
      state.paymentMethod = action.payload;
    },
    addOrderType(state, action) {
      state.changed = true;
      state.orderType = action.payload;
    },
    checkOutStatus(state, action) {
      state.changed = true;
      state.checkOut = action.payload;
    },
    payStatus(state, action) {
      state.changed = true;
      state.paidOrder = action.payload;
    },
    userInfo(state, action) {
      state.changed = true;
      state.user = action.payload;
    },
    orderInfo(state, action) {
      state.orderDetail = action.payload
    },
    addDiscount(state, action) {
      state.discount = action.payload
    }
  }
})

export const orderActions = orderSlice.actions;

export default orderSlice;