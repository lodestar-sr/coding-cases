import qs from 'query-string';

import { get } from '../../shared/api';
import { ImageModel } from '../../shared/models/image.model';
import { ResponseInterface } from '../../shared/interfaces/response.interface';
import { ImageParamInterface } from '../../shared/interfaces/imageParamInterface';

export const getImagesApi = (
  params?: ImageParamInterface
): Promise<ResponseInterface<'images', ImageModel>> => {
  const queryString =
    Object.keys({ ...params }).length > 0
      ? `?${qs.stringify({ ...params })}`
      : '';
  return get<ResponseInterface<'images', ImageModel>>(`/images${queryString}`);
};
