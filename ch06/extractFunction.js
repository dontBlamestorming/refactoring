function printOwing(invoice) {
  let outstanding = 0;

  console.log("***********")
  console.log("* 고객 채무 *")
  console.log("***********")

  // 미해결 채무 계산
  for(const o of invoice.orders) {
    outstanding += o.amount
  }

  // 마감일 기록
  const today = Clock.today
  console.log(today)
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)

  // 세부사항 출력
  console.log(`고객명: ${invoice.customer}`)
  console.log(`채무액: ${outstanding}`)
  console.log(`마감일: ${invoice.dueDate.toLocaleTimeString()}`)
}