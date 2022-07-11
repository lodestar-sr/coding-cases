import {
  GET_IMAGES,
  GetImagesAction,
  SET_IMAGES,
  SetImagesAction,
} from './image.types';
import { ImageModel } from '../../shared/models/image.model';
import { ImageParamInterface } from '../../shared/interfaces/imageParamInterface';

export const setImagesAction = (data: ImageModel[]): SetImagesAction => ({
  type: SET_IMAGES,
  payload: { data },
});

export const getImagesAction = (
  pageConfig?: ImageParamInterface
): GetImagesAction => ({
  type: GET_IMAGES,
  payload: { data: pageConfig },
});
