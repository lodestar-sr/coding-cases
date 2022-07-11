import { ImageModel } from '../../shared/models/image.model';
import { ImageParamInterface } from '../../shared/interfaces/imageParamInterface';

export const SET_IMAGES = 'SET_IMAGES';
export const GET_IMAGES = 'GET_IMAGES';

export interface ImageState {
  images: ImageModel[];
}

export interface SetImagesAction {
  type: typeof SET_IMAGES;
  payload: { data: ImageModel[] };
}

export interface GetImagesAction {
  type: typeof GET_IMAGES;
  payload: { data: ImageParamInterface | undefined };
}

export type ImageActionTypes = SetImagesAction | GetImagesAction;
