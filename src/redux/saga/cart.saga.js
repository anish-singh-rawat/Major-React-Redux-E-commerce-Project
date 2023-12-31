import { put, takeLatest } from "redux-saga/effects"
import { addCartError, addCartSuccess, deleteCartError, getCartError, getCartStart, getCartSuccess, updateCartError } from "../action/cart.action"
import { ADD_CART_START, DELETE_CART_START, GET_CART_START, UPDATE_CART_START } from "../constant/cart.constent"
import { addCartToFireBase, deleteCartFromFireBase, getCartFromFirebase, updateCartFromFireBase } from "../service/cart.service"

function* getCart() {
    try {
       let data =  yield getCartFromFirebase()
       yield put(getCartSuccess(data))

    } catch (error) {
        yield put(getCartError(error.message))
    }
}

function* addCart({payload}) {
    try {
       let result =  yield addCartToFireBase(payload)
       yield put(getCartStart())
       yield put(addCartSuccess(payload))
    } catch (error) {
        yield put(addCartError(error.message))
    }
}

function* updateCart({payload}) {
    try {
       let result =  yield updateCartFromFireBase(payload.id, payload.data)
       yield put(getCartStart())
    } catch (error) {
        yield put(updateCartError(error.message))
    }
}

function* deleteCart({payload}) {
    try {
       let result =  yield deleteCartFromFireBase(payload)
       yield put(getCartStart())
    } catch (error) {
        yield put(deleteCartError(error.message))
    }
}

export function* cart() {
    yield takeLatest(GET_CART_START, getCart)
    yield takeLatest(ADD_CART_START, addCart)
    yield takeLatest(UPDATE_CART_START, updateCart)
    yield takeLatest(DELETE_CART_START, deleteCart)
}