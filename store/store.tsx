import { createStore } from 'redux';
import { popupReducer } from './reducer';


const store = createStore(popupReducer);
export default store;