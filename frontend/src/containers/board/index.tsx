import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, get } from 'lodash';

import LogoImage from '../../assets/images/logo.png';
import { Button, Input, Table } from '../../components';
import { OrderTypeEnum } from '../../shared/enums/order-type.enum';
import {
  GET_IMAGES,
  getImagesAction,
  selectImageList,
} from '../../store/image';
import { selectRequestIsLoading } from '../../store/global-request';
import { tableColumn } from './constants';

import './styles.scss';

const Board: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  const [searchKey, setSearchKey] = useState('');
  const [sortingKey, setSortingKey] = useState<string | undefined>('published');
  const [sortingOrder, setSortingOrder] = useState(OrderTypeEnum.ASC);

  const isLoading = useSelector(selectRequestIsLoading(GET_IMAGES));
  const imageList = useSelector(selectImageList);

  const filteredList = useMemo(() => {
    const list = cloneDeep(imageList);
    if (sortingKey) {
      list.sort((item1, item2) =>
        get(item1, sortingKey) > get(item2, sortingKey)
          ? sortingOrder === OrderTypeEnum.ASC
            ? 1
            : -1
          : sortingOrder === OrderTypeEnum.DESC
          ? 1
          : -1
      );

      return list;
    }

    return list;
  }, [imageList, sortingKey, sortingOrder]);

  useEffect(() => {
    dispatch(getImagesAction());
  }, [dispatch]);

  const fetchImages = () => {
    dispatch(getImagesAction({ tags: searchKey }));
  };

  const handleChangeSortKey = useCallback(
    (sortKey) => {
      if (sortKey === sortingKey) {
        switch (sortingOrder) {
          case OrderTypeEnum.ASC:
            setSortingOrder(OrderTypeEnum.DESC);
            break;
          case OrderTypeEnum.DESC:
            setSortingOrder(OrderTypeEnum.ASC);
            setSortingKey(undefined);
            break;
        }
      } else {
        setSortingKey(sortKey);
        setSortingOrder(OrderTypeEnum.ASC);
      }
    },
    [sortingKey, sortingOrder]
  );

  const handleEnterInput = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchImages();
    }
  };

  return (
    <div className="board-container">
      <div className="page-header">
        <img className="logo" src={LogoImage} alt="logo" />
        <div className="search-section">
          <div className="search-box">
            <Input
              placeholder="Search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyPress={handleEnterInput}
            />
            <Button className="search-button" onClick={fetchImages}>
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="main-board">
        <span className="mr-auto mr-2 mb-6 text-xl text-gray-800">
          Feed list - Showing {imageList.length || 0} items
        </span>
        <div className="table-section">
          <Table
            tableData={filteredList}
            columns={tableColumn}
            loading={isLoading}
            sortBy={sortingKey}
            order={sortingOrder}
            onChangeSortBy={handleChangeSortKey}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
