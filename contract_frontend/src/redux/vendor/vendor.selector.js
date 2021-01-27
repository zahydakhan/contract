import { createSelector } from 'reselect';

const selectRows = state => state.configROWSReducer


export const selectBUList = createSelector(
    [selectRows],
    rowsperpage => rowsperpage.rowsperpage
)