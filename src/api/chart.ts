// expesnes

export async function getExpensesYearlyAnalytics(year: number) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/expenses/yearly_data?year=${year}`,
    )
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

export async function getMonthlyDailySpend(month: number, year: number) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/expenses/monthly_daily_spend?month=${month}&year=${year}`,
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
      `https://pfm.mypfmpupwrk.info/api/analytics/expenses/category_yearly_data?catId=${catId}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getMonthlyExpenseAnalyticsByCategory(
  catId: number,
  month: number,
  year: number,
) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/expenses/category_monthly_data?catId=${catId}&month=${month}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

// incomes

export async function getIncomesYearlyAnalytics(year: number) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/incomes/yearly_data?year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}
export async function getIncomesMonthlyAnalytics(month: number, year: number) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/incomes/monthly_data?month=${month}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}
export async function getYearlyIncomeAnalyticsByIncomeSource(icsId: number, year: number) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/incomes/income-source-yearly-data?icsId=${icsId}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getYearlyMontlyIncomeSources(year: number) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/incomes/yearly_monthly_sources?year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}
export async function getMonthlyDailySourceIncomes(month: number, year: number) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/incomes/monthly_daily_sources?month=${month}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}
export async function getMonthlyIncomeAnalyticsByIncomeSource(
  icsId: number,
  month: number,
  year: number,
) {
  try {
    const res = await fetch(
      `https://pfm.mypfmpupwrk.info/api/analytics/incomes/income-source-monthly-data?icsId=${icsId}&month=${month}&year=${year}`,
    )
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}
