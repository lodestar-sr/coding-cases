import { combineReducers } from 'redux';

import { imageReducer } from './image';
import { currentRequestReducer } from './global-request';

export const rootReducer = combineReducers({
  image: imageReducer,
  currentRequest: currentRequestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
