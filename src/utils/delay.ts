export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function supplier(ms: number, cb: any) {
  await sleep(ms)
  return cb && cb()
}

export function runnable(ms: number, cb: any) {
  sleep(ms).then(() => cb && cb())
}

export const delay = {
  sleep,
  supplier,
  runnable
}

export default delay
