
export async function topBuyer(orders) {
    let customers = []
    for (const o of orders) {
        let notExists = true
        let temp = { firstName: o.firstName, lastName: o.lastName, email: o.email, total: 1, totalPrice: o.totalPrice }
        if (customers.length > 0) {
          customers.forEach((item) => {
            if (item.email === o.email) {
              notExists = false
              item.total += 1
              item.totalPrice += o.totalPrice
            }
          })
          if (notExists) {
            customers.push(temp)
          }
        }
        else {
          customers.push(temp)
        }
    }
    return customers
  
}

export async function topCustomer(customer) {
    let topCustomer
    let topTotal = 0
    customer.forEach((item) => {
      if (item.total > topTotal) {
        topTotal = item.total
        topCustomer = item
      }
    })
    console.log(topCustomer)
    return { topCustomer }
  }
  