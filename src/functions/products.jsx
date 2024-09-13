
export let tempTopId
export let tempTopTotal =  0

export async function getProductTotals(orders){
    let products = []
      for (const o in orders){
        for (const p of orders[o].products){
          let notExists = true
          let temp = { id: p.id, total: p.quantity}
          if (products.length > 0) {
            products.forEach((item) => {
              if (item.id === p.id) {
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
      return products
}

export async function topProduct(orderProductTotals){
      orderProductTotals.forEach((item)=>{
        if (item.total > tempTopTotal) {
            tempTopTotal = item.total
          tempTopId = item.id
        }
      })
}

export function orderTotal(orders) {  
    let total = 0
    for (const order in orders) {
      total += orders[order].totalPrice
    }
    return total
}
