import { AnyAction } from 'redux'

export const popupReducer = (state='', action: AnyAction) =>{
    switch (action.type) {
        case 'ERROR':
        return action.payload;
        default:
        return action.payload;
    }
}