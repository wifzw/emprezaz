import { MdOutlineFilterList } from 'react-icons/md';

import Search from '@/components/atoms/inputs/Search/Search';
import classes from './filter.module.css';

export interface IFilterProps {
  search: string;
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Filter(props: IFilterProps) {
  const { search, onChangeSearch } = props;

  return (
    <div className={classes.wrapper}>
      <Search search={search} onChangeSearch={onChangeSearch} />

      <MdOutlineFilterList size={24} />
    </div>
  );
}
