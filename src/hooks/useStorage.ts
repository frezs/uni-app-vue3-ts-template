import { ref, Ref, watch } from 'vue'

type StorageKeys = string

type ObjectType<T> = T extends Object ? Object : never

export function set<T extends StorageKeys>(key: T, data: ObjectType<T>): void {
  uni.setStorageSync(key, data)
}

export function get<T extends StorageKeys>(key: T, initValue: any = ''): ObjectType<T> {
  const data = uni.getStorageSync(key) || initValue
  return data as ObjectType<T>
}

export function getRef<T extends StorageKeys>(key: T, initValue: any = ''): Ref<ObjectType<T>> {
  const data = uni.getStorageSync(key) || initValue
  const result = ref(data)
  watch(result.value, () => {
    set(key, result.value)
  })
  return result as Ref<ObjectType<T>>
}

const useStorage = {
  get,
  set,
  getRef,
}

export default useStorage
