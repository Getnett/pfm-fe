export async function fetchTranscationRecords() {
  let result
  try {
    const res = await fetch('http://localhost:3000/api/expenses')
    const resData = await res.json()
    result = resData.map((expense: any) => ({ ...expense, type: 'expense' }))
    console.log('Result data', result)
    return result
  } catch (error: any) {
    throw error
  }
}
