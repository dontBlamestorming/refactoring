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

  for (let perf of invoice[0].performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) thisAmount += 1000 * (perf.audience - 30)

        break;

      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) thisAmount += 1000 * (perf.audience - 30)

        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`)
    }

    // 포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);

    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5)

    // 청구내역 출력
    result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`
    totalAmount += thisAmount
  }
  result += `총액: ${format(totalAmount / 100)}\n`
  result += `적립 포인트: ${volumeCredits}점\n`


  return result
}

const result = statement(invoices, plays)
console.log(result)
