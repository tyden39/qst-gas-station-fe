import { create } from "zustand"

const useInvoice = create((set, get) => ({
  selected: [],
  setSelected: (invoiceIds) => set(({ selected: invoiceIds })),
}))

export default useInvoice