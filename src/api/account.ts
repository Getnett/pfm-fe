export async function getAccounts() {
  try {
    const res = await fetch('https://pfm.mypfmpupwrk.info/api/accounts')
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function createAccount(payload: any) {
  try {
    const res = await fetch(`https://pfm.mypfmpupwrk.info/api/accounts`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const resData = await res.json()
    console.log('resData', resData)
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getAccountTypes() {
  try {
    const res = await fetch('https://pfm.mypfmpupwrk.info/api/account-type')
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function createAccountType(accountType: string) {
  try {
    const res = await fetch('https://pfm.mypfmpupwrk.info/api/account-type', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ accountType }),
    })
    const resData = await res.json()
    return resData
  } catch (error: any) {
    throw new Error(error)
  }
}
