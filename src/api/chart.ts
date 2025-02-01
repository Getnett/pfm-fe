export async function getExpensesYearlyAnalytics(year: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/analytics/expenses/yearly_data?year=${year}`)
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getExpensesMonthlyAnalytics(month: number, year: number) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/expenses/monthly_data?month=${month}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getYearlyMonthlySpend(year: number) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/expenses/yearly_monthly_spend?year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getYearlyExpenseAnalyticsByCategory(catId: number, year: number) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/analytics/expenses/category_yearly_data?catId=${catId}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}
