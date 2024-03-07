export type IKey = 'default'
export type IConf = Partial<Record<IKey, any>>

export const getConf = (cons: IConf, key: IKey) => {
  for (const field in cons) {
    if (field == key) {
      return cons[field]
    }
  }
  for (const field of Object.keys(cons)) {
    if (key && key.includes(field)) {
      return cons[field]
    }
  }
  return cons.default
}