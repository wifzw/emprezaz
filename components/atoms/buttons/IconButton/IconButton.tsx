import { MouseEvent, ReactNode } from 'react'
import classes from './icon-button.module.css'

export interface IconButtonProps {
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}



export default function IconButton(props: IconButtonProps) {
  const { children, onClick } = props

  return (
    <button type="button" className={classes.button} onClick={onClick}>
      {children}
    </button>
  )
}