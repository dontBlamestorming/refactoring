const invoices = require('./invoices.json')
const plays = require('./plays.json')

function statement(invoice, plays) {
  function usd(aNumber) {
    return new Intl.NumberFormat("es-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100)
  }

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

  function totalVolumeCredits() {
    let result = 0;

    for (let perf of invoice[0].performances) {
      result += volumeCreditsFor(perf)
    }

    return result
  }

  function totalAmount() {
    let result = 0;

    for(let perf of invoice[0].performances) {
      result += amountFor(perf)
    }

    return result
  }

  let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;

  for (let perf of invoice[0].performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`
  }

  result += `총액: ${usd(totalAmount())}\n`
  result += `적립 포인트: ${totalVolumeCredits()}점\n`

  return result
}

const result = statement(invoices, plays)
console.log(result)
