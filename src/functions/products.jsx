

export async function getProductTotals(orders) {
  let products = []
  for (const o in orders) {
    for (const p of orders[o].products) {
      let notExists = true
      let temp = { id: p.id, total: p.quantity, size: p.option }
      if (products.length > 0) {
        products.forEach((item) => {
          if (item.id === p.id && item.option === p.option) {
            notExists = false
            item.total += p.quantity
          }
        })
        if (notExists) {
          products.push(temp)
        }
      }
      else {
        products.push(temp)
      }
    }
  }
  console.log(products)
  return products
}

export async function topProduct(orderProductTotals) {
  let tempTopId
  let tempTopTotal = 0
  let tempOption
  orderProductTotals.forEach((item) => {
    if (item.total > tempTopTotal) {
      tempTopTotal = item.total
      tempTopId = item.id
      tempOption = item.size
    }
  })
  return { topId: tempTopId, topTotal: tempTopTotal, size: tempOption }
}
export async function mostPopularSize(orderProductTotals) {
  let products = []
  
    for (const p of orderProductTotals) {
      console.log(p)
      let notExists = true
      let temp = { size: p.size, total: p.total }
      if (products.length > 0) {
        products.forEach((item) => {
          if (item.size === p.size) {
            notExists = false
            item.total += p.total
          }
        })
        if (notExists) {
          products.push(temp)
        }
      }
      else {
        products.push(temp)
      }
    }
  
  console.log(products)
  let tempSizeTotal = 0
  let tempSize
  products.forEach((item) => {
    if (item.total > tempSizeTotal) {
      tempSizeTotal = item.total
      tempSize = item.size
    }
  })
  console.log(tempSize, tempSizeTotal)
  return { size: tempSize, total: tempSizeTotal }
}

export function orderTotal(orders) {
  let total = 0
  for (const order in orders) {
    total += orders[order].totalPrice
  }
  return total
}
