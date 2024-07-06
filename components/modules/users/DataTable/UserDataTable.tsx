'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import DataTable from "@/components/molecules/DataTable/DataTable";

import { IHeader } from "@/components/molecules/DataTable/types";
import { ReactNode } from "react";
import IconButton from "@/components/atoms/buttons/IconButton/IconButton";

import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

import classes from './user-data-table.module.css'
import Switch from "@/components/atoms/inputs/Switch/Switch";

export interface IUserDataTableProps {
  users: any[];
}

export default function UserDataTable(props: IUserDataTableProps) {
  const { users } = props;

  const headers: IHeader[] =  [
    { name: 'Nome do usuário', value: 'name', align: 'start' },
    { name: 'Telefone', value: 'phone', align: 'start' },
    { name: 'Status', value: 'status', align: 'start' },
    { name: '', value: 'action', align: 'end', width: '100px' }
  ]

  const getSlotStatus = (item: any): ReactNode => {
    
    return (
      <>
        <Switch  value={item.status} onChange={() => item.status = !item.status}/>
      </>
    );
  };

  const getSlotAction = (): ReactNode => {
    return (
      <div style={{ 
        display: 'flex', 
        gap: '.6rem', 
        width: '100%', 
        justifyContent: 'flex-end' 
      }}
      >
        <IconButton>
          <MdOutlineModeEditOutline size={20} />
        </IconButton>

        <IconButton>
          <MdOutlineDelete size={20} />
        </IconButton>
      </div>
    )
  }  

  return (
    <div className={classes.wrapper}>
      <DataTable 
        headers={headers} 
        items={users} 
        slotAction={getSlotAction}
        slotStatus={getSlotStatus}
      />
    </div>
  )
}