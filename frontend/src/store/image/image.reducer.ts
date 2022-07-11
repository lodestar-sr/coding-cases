import { ImageActionTypes, ImageState, SET_IMAGES } from './image.types';

const initialState: ImageState = {
  images: [],
};

const reducer = (
  state = initialState,
  action: ImageActionTypes
): ImageState => {
  switch (action.type) {
    case SET_IMAGES: {
      return {
        ...state,
        images: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
