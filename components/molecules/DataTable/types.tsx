export type HeaderAlign = 'start' | 'center' | 'end'

export interface IHeader {
  name: string;
  align: HeaderAlign,
  value: string;
  width?: string;
}