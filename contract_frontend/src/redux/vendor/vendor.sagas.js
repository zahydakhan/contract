import { takeEvery, takeLatest, put, call } from 'redux-saga/effects'

import * as Vendor_Action_types from './vendor.types';
import axios from '../../utils1.js/axios'

import {
    fetchROWSStart,
    fetchROWSSuccess,
    fetchROWSFailure,
    addROWSStart,
    addROWSSuccess,
    addROWSFailure,
} from './vendor.actions';

//Fetch ROWS Saga
export function* fetchROWSs() {
    try {
        console.log('running axios')
        const rowsperpage = yield axios.get(`/vendor/rowsperpage/`);
        console.log(rowsperpage)

        yield put(fetchROWSSuccess(rowsperpage.data));
    } catch (error) {
        yield put(fetchROWSFailure(error.message));
    }
}

export function* onFetchROWSStart() {
        yield takeLatest(Vendor_Action_types.FETCH_ROWS_START, fetchROWSs);
    }
    //Add ROWS Saga
export function* addROWSs(action) {
    try {
        console.log('running axios')
        const rowsperpage = yield axios.put(`/vendor/rowsperpage/2/`, {rowsper: action.payload});
        // console.log(rowsperpage)

        yield put(addROWSSuccess(rowsperpage.data));
        yield put(fetchROWSStart());
    } catch (error) {
        yield put(addROWSFailure(error.message));
    }
}

export function* onAddROWSStart() {
    yield takeLatest(Vendor_Action_types.ADD_ROWS_START, addROWSs);
}
