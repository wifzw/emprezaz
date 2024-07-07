import { IoMdSearch } from 'react-icons/io';

import classes from './search.module.css';

export interface IFilterProps {
  search: string;
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search(props: IFilterProps) {
  const { search, onChangeSearch } = props;

  return (
    <div className={classes.wrapper}>
      <div className={classes['input-wrapper']}>
        <IoMdSearch className={classes.icon} size={20} />
        <input
          type="search"
          placeholder="Buscar..."
          value={search}
          onChange={(event) => onChangeSearch(event)}
          className={classes.search}
        />
      </div>
    </div>
  );
}
