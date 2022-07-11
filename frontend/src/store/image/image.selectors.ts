import { RootState } from '../reducers';
import { ImageModel } from '../../shared/models/image.model';

export const selectImageList = (state: RootState): ImageModel[] =>
  state.image.images;
