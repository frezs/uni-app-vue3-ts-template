export type Conf<T> = Partial<T>
export type ConfKeys<T> = keyof T

export type ProcessRest<T> = Partial<Conf<[ConfKeys<T>]>> & { [x: string]: any }
export type FuncProcess<T extends Object> = ((t?: T) => ProcessRest<T>) | (() => void)

export enum ColEnum {
  '',
  primary, // 颜色
}

export enum RowEnum {
  '',
  btn, // 按钮
}

export type Row = {
  key?: string
  text?: string
  icon?: string
  type?: RowEnum
}

export type Col = {
  title?: string
  key?: string,
  text?: string
  type?: ColEnum
  children?: Row[]
}
