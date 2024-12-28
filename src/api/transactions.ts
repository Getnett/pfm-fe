export async function fetchTranscationRecords(month: number, year: number) {
  try {
    const res = await fetch(`http://13.50.203.130/api/transactions?month=${month}&year=${year}`)
    const transactionsData = await res.json()

    let transactionsGroupedByDate: any = {}
    transactionsData.forEach((item: any) => {
      if (transactionsGroupedByDate[item.transactionDate]) {
        transactionsGroupedByDate[item.transactionDate].push(item)
      } else {
        transactionsGroupedByDate[item.transactionDate] = [item]
      }
    })
    console.log('transactionsGroupedByDate', transactionsGroupedByDate)
    return transactionsGroupedByDate
  } catch (error: any) {
    throw error
  }
}

export async function deleteExpenseTransaction(id: number) {
  try {
    // http://13.50.203.130/api/incomes
    const res = await fetch(`http://13.50.203.130/api/expenses/${id}`, { method: 'DELETE' })
    console.log('res', res.body)
  } catch (error: any) {
    throw new Error(error)
  }
}
export async function deleteIncomeTransaction(id: number) {
  try {
    // http://13.50.203.130/api/incomes
    const res = await fetch(`http://13.50.203.130/api/incomes/${id}`, { method: 'DELETE' })
    console.log('res', res.body)
  } catch (error: any) {
    throw new Error(error)
  }
}
