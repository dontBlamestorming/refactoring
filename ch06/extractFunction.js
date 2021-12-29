function printOwing(invoice) {
  // 지역변수를 참조만 하는 것이 아니라 특정 값을 대입해야 한다면 다음을 따른다.

  printBanner()

  let outstanding = 0; // #1 맨 위에 있던 선언문을 이 위치로 이동.
  for(const o of invoice.orders) {
    outstanding += o.amount
  }

  recordDueDate(invoice)
  printDetails(invoice, outstanding)
}

/*
  이전 2개의 커밋과 같이 지역 변수에 다른 값을 대입하는 것이 아닌 참조(Read)만 하는 경우
  매개변수로 넘겨서 활용해도 된다. 객체인 경우는 필드값을 수정할 수 있다(참조의 관계이므로).
*/

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