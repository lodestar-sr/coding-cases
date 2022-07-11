import React from 'react';
import moment from 'moment';

import { TableColumnInterface } from '../../shared/interfaces/table-column.interface';
import { ImageModel } from '../../shared/models/image.model';

export const tableColumn: TableColumnInterface<ImageModel>[] = [
  {
    label: '',
    key: '',
    render: ({ media }) => (
      <img className="min-w-[80px] max-w-[150px]" src={media.m} alt="ship" />
    ),
  },
  {
    label: 'Link',
    key: 'link',
    sortable: true,
    render: ({ link }) => (
      <a href={link} target="_blank" rel="noreferrer">
        {link}
      </a>
    ),
  },
  {
    label: 'Author',
    key: 'author',
    sortable: true,
    render: ({ author, author_id }) => (
      <React.Fragment>
        {author} - {author_id}
      </React.Fragment>
    ),
  },
  {
    label: 'Published At',
    key: 'published',
    sortable: true,
    render: ({ date_taken }) => (
      <React.Fragment>
        {moment(date_taken).format('YYYY/MM/DD hh:mm a')}
      </React.Fragment>
    ),
  },
  {
    label: 'Tags',
    key: 'tags',
    sortable: true,
    className: 'max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis',
  },
];
