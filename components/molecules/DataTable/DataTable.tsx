import React, { ReactNode } from 'react';

import classes from './data-table.module.css';

import { HeaderAlign, IHeader } from './types';

export interface IDataTableProps {
  headers: IHeader[];
  children: ReactNode;
}

export default function DataTable(props: IDataTableProps) {
  const { headers, children } = props;

  const getClass = (align: HeaderAlign): string => {
    const alignClass = `text-${align}`;

    return classes[alignClass];
  };

  return (
    <table className={classes.table}>
      <thead className={classes.head}>
        <tr>
          {headers.map((header) => (
            <th
              key={header.value}
              style={{ width: header.width }}
              className={getClass(header.align)}
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
