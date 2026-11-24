import liff from '@line/liff'

let initialization

// Share one initialization promise across React StrictMode effect runs.
export function initializeLiff() {
  if (!initialization) {
    const liffId = import.meta.env.VITE_LIFF_ID
    initialization = liffId
      ? liff.init({ liffId })
      : Promise.reject(new Error('VITE_LIFF_ID is required'))
  }
  return initialization
}
