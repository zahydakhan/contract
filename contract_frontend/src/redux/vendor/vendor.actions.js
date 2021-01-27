import * as Vendor_Action_types from './vendor.types';

// ROWS Fetching Actions
export const fetchROWSStart = () => ({
    type: Vendor_Action_types.FETCH_ROWS_START
});

export const fetchROWSSuccess = stateList => ({
    type: Vendor_Action_types.FETCH_ROWS_SUCCESS,
    payload: stateList
});

export const fetchROWSFailure = errorMessage => ({
    type: Vendor_Action_types.FETCH_ROWS_FAILURE,
    payload: errorMessage
});

// ROWS Addition Actions
export const addROWSStart = (newData) => ({
    type: Vendor_Action_types.ADD_ROWS_START,
    payload: newData
});

export const addROWSSuccess = stateList => ({
    type: Vendor_Action_types.ADD_ROWS_SUCCESS,
    payload: stateList
});

export const addROWSFailure = errorMessage => ({
    type: Vendor_Action_types.ADD_ROWS_FAILURE,
    payload: errorMessage
});
