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

export async function addExpenseTransaction(payload: any) {
  try {
    const res = await fetch('http://localhost:3000/api/expenses', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const resData = await res.json()
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function addIncomeTransaction(payload: any) {
  try {
    const res = await fetch('http://localhost:3000/api/incomes', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const resData = await res.json()
  } catch (error: any) {
    throw new Error(error)
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

export async function getExpenseTransaction(id: number) {
  try {
    const res = await fetch(`http://13.50.203.130/api/expenses/${id}`)
    const resData = await res.json()
    console.log('expense-resData', resData)
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getIncomeTransaction(id: number) {
  try {
    const res = await fetch(`http://13.50.203.130/api/incomes/${id}`)
    const resData = await res.json()
    console.log('income-resData', resData)
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function updateExpenseTransaction(id: number, payload: any) {
  try {
    await fetch(`http://13.50.203.130/api/expenses/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function updateIncomeTransaction(id: number, payload: any) {
  try {
    await fetch(`http://13.50.203.130/api/incomes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

// May be move out of this file

export async function getAllCategories() {
  try {
    const res = await fetch('http://13.50.203.130/api/categories')
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getAllIncomeSources() {
  try {
    const res = await fetch('http://13.50.203.130/api/income-sources')
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getTotalSpendingInMonth(month: number, year: number) {
  try {
    const res = await fetch(
      `http://13.50.203.130/api/analytics/expenses/monthly_total_spend?month=${month}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getTotalIncomeInMonth(month: number, year: number) {
  try {
    const res = await fetch(
      `http://13.50.203.130/api/analytics/incomes/monthly_total_income?month=${month}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}
