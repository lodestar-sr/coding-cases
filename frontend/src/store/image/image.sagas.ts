import { AxiosError } from 'axios';
import {
  call,
  CallEffect,
  put,
  PutEffect,
  SelectEffect,
  takeLatest,
} from 'redux-saga/effects';

import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../global-request';
import { setImagesAction } from './image.actions';
import { getImagesApi } from './image.api';
import { ImageActionTypes, GET_IMAGES, GetImagesAction } from './image.types';
import { ImageModel } from '../../shared/models/image.model';
import { ResponseInterface } from '../../shared/interfaces/response.interface';

function* getImageList(
  action: GetImagesAction
): Generator<
  | CallEffect<ResponseInterface<'images', ImageModel>>
  | PutEffect<GlobalRequestActions | ImageActionTypes>
  | SelectEffect
  | void
> {
  const { type: actionType, payload } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { images } = (yield call(
      getImagesApi,
      payload.data
    )) as ResponseInterface<'images', ImageModel>;
    yield put(setImagesAction(images));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* imageSaga(): Generator {
  yield takeLatest(GET_IMAGES, getImageList);
}
