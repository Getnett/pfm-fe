export async function getExpensesYearlyAnalytics(year: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/analytics/expenses/yearly_data?year=${year}`)
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getExpensesMonthlyAnalytics() {}
