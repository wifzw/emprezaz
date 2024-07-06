import React, { ReactNode } from 'react';

import classes from './data-table.module.css'

import { HeaderAlign, IHeader } from "./types";

export interface IDataTableProps {
  headers: IHeader[]
  items: any[]
  slotStatus: (item: any) => ReactNode;
  slotAction: (item: any) => ReactNode;
}

export default function DataTable(props: IDataTableProps) {
  const { headers, items, slotAction, slotStatus } = props;

  const getClass = (align: HeaderAlign ): string => {
    const alignClass = `text-${align}`

    return classes[alignClass]
  }

  const renderSlotStatus = (item: any) => {
    if (typeof slotStatus === 'function') {
      return slotStatus(item);
    }
    return slotStatus;
  };

  const renderSlotAction = (item: any) => {
    if (typeof slotAction === 'function') {
      return slotAction(item);
    }
    return slotAction;
  };

  return (
    <table className={classes.table}>
      <thead className={classes.head}>
        <tr>
          {headers.map((header) => (
            <th 
              key={header.value} 
              style={{ width: header.width}} 
              className={getClass(header.align)}
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            {headers.map((header) => (
              <React.Fragment key={header.value}>
                {header.value === 'action' ? (
                  <td key={header.value} className={getClass(header.align)}>
                    {renderSlotAction(item)}
                  </td>
                ): header.value === 'status' ? (
                  <td key={header.value} className={getClass(header.align)}>
                    {renderSlotStatus(item)}
                  </td>
                ) : (
                  <td key={header.value} className={getClass(header.align)}>
                    {item[header.value]}
                  </td>
                )
              }
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
