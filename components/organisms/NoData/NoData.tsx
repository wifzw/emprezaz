import Image from 'next/image';
import classes from './no-data.module.css';
import NoDataImage from '@/public/assets/no-data.svg';
import { Montserrat } from 'next/font/google';

export interface INoDataProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const montSerrat = Montserrat({ subsets: ['latin'] });

export default function NoData(props: INoDataProps) {
  const { title, subtitle, children } = props;

  return (
    <div className={classes.wrapper}>
      <Image src={NoDataImage} width={450} height={450} alt="no-found" />
      <h2 className={montSerrat.className}>{title}</h2>
      {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
      {children}
    </div>
  );
}
