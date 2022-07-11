/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { get } from 'lodash';
import clsx from 'clsx';

import { ReactComponent as ArrowUpIcon } from '../../assets/icons/icon-sort-up.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/icon-sort-down.svg';
import { TableColumnInterface } from '../../shared/interfaces/table-column.interface';
import { OrderTypeEnum } from '../../shared/enums/order-type.enum';

import './styles.scss';

interface ITableProps {
  columns: TableColumnInterface[];
  tableData: { [key: string]: string | number | any }[];
  loading: boolean;
  order?: OrderTypeEnum;
  sortBy?: string;
  onChangeSortBy?: (sortKey: string) => void;
}

const Table: React.FC<ITableProps> = ({
  columns,
  tableData,
  loading,
  order = OrderTypeEnum.DESC,
  sortBy,
  onChangeSortBy = () => null,
}) => {
  const handleSortChange = (value: string) => {
    onChangeSortBy(value);
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead className="head">
            <tr>
              {columns.map((column, key: number) => (
                <th
                  key={key}
                  className={clsx({ sortable: column.sortable })}
                  onClick={() =>
                    column.sortable && handleSortChange(column.key)
                  }
                >
                  <div
                    className={clsx('column-label', {
                      active: sortBy === column.key,
                    })}
                  >
                    <p>{column.label}</p>
                    {column.sortable && (
                      <div className="sort-arrow">
                        <ArrowUpIcon
                          className={clsx({
                            active:
                              order === OrderTypeEnum.ASC &&
                              sortBy === column.key,
                          })}
                        />
                        <ArrowDownIcon
                          className={clsx({
                            active:
                              order === OrderTypeEnum.DESC &&
                              sortBy === column.key,
                          })}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {loading && <tr />}
            {!loading &&
              tableData &&
              tableData.map((row, key: number) => (
                <tr key={key}>
                  {columns.map((column, columnKey: number) => (
                    <td key={columnKey} className={column.className}>
                      {column.render
                        ? column.render(row)
                        : column.fixed
                        ? get(row, column.key)
                          ? (+get(row, column.key)).toFixed(2)
                          : 0
                        : get(row, column.key)}
                    </td>
                  ))}
                </tr>
              ))}
            {!loading && (!tableData || tableData.length === 0) && (
              <tr>
                <td colSpan={columns.length} className="empty">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
