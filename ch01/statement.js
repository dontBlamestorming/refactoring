const invoices = require('./invoices.json')
const plays = require('./plays.json')

function statement(invoice, plays) {
  const format = new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5)

    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) { // 값이 바뀌지 않는 변수는 매개변수로 전달
    let result = 0; // 변수를 초기화 && 명확한 이름으로 변경

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) result += 1000 * (aPerformance.audience - 30)
        break;

      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) result += 1000 * (aPerformance.audience - 30)
        break;

      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }

    return result
  }

  for (let perf of invoice[0].performances) {
    // 포인트 적립
    volumeCredits += volumeCreditsFor(perf)

    if ("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(perf.audience / 5)

    // 청구내역 출력
    result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`
    totalAmount += amountFor(perf)
  }

  result += `총액: ${format(totalAmount / 100)}\n`
  result += `적립 포인트: ${volumeCredits}점\n`

  return result
}

const result = statement(invoices, plays)
console.log(result)
