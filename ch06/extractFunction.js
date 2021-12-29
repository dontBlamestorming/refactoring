function printOwing(invoice) {
  // 지역변수를 참조만 하는 것이 아니라 특정 값을 대입해야 한다면 다음을 따른다.
  printBanner()
  const outstanding = calculateOutstanding(invoice) // #3 함수 추출 완료. 추출한 함수가 반환한 값을 원래 변수에 저장
  recordDueDate(invoice)
  printDetails(invoice, outstanding)
}

function calculateOutstanding(invoice) {
  let result = 0;
  for(const o of invoice.orders) {
    result += o.amount
  }

  return result
}

function recordDueDate(invoice) {
  const today = Clock.today
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`)
  console.log(`채무액: ${outstanding}`)
  console.log(`마감일: ${invoice.dueDate.toLocaleTimeString()}`)
}

function printBanner() {
  console.log("***********")
  console.log("* 고객 채무 *")
  console.log("***********")
}