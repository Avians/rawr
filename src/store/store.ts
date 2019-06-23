import {createStore} from 'easy-peasy';
import {storeModel} from './models';

const store = createStore(storeModel);

export const useStoreState = store.useStoreState;
export default store;