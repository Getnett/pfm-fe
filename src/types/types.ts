export interface Transaction {
  id: number
  amount: number
  note: string
  date: string
  transactionDate: string
  total: string
  type: string
}

export interface TransactionType {
  [key: string]: Transaction[]
}
