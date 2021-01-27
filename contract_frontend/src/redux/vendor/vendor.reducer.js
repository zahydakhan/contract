import * as Vendor_Action_types from './vendor.types';

const INITIAL_STATE = {
    rowsperpage: [],
    isRowFetching: false,
    errorRPPMessage: undefined
};


const configROWSReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        //ROWS Fetch
        case Vendor_Action_types.FETCH_ROWS_START:
            return {
                ...state,
                isRowFetching: true
            };
        case Vendor_Action_types.FETCH_ROWS_SUCCESS:
            return {
                ...state,
                isRowFetching: false,
                rowsperpage: action.payload
            };
        case Vendor_Action_types.FETCH_ROWS_FAILURE:
            return {
                ...state,
                isRowFetching: false,
                errorRPPMessage: action.payload
            };
            //ROWS Add
        case Vendor_Action_types.ADD_ROWS_START:
            return {
                ...state,
                isRowFetching: true
            };
        case Vendor_Action_types.ADD_ROWS_SUCCESS:
            return {
                ...state,
                isRowFetching: false,
                rowsperpage:  action.payload
            };
        case Vendor_Action_types.ADD_ROWS_FAILURE:
            return {
                ...state,
                isRowFetching: false,
                errorRPPMessage: action.payload
            };
            
        default:
            return state;
    }
};

export default configROWSReducer;