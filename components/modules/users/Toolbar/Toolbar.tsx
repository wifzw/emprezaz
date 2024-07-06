import MediumButton from '@/components/atoms/buttons/Medium/MediumButton'
import Filter from './Filter/Filter'

import classes from './toolbar.module.css'

export default function Toolbar() {
  return (
    <header className={classes.header}>
      <Filter />
      
      <div className={classes.action}>
        <MediumButton>
          Adicionar Usuário
        </MediumButton>
      </div>
    </header>
  )
}