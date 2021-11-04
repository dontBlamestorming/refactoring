export default function createStatementData(invoice, plays) {
  const result = {} // 중간 데이터
  result.customer = invoice.customer // 고객데이터를 중간데이터로
  result.performances = invoice.performances.map(enrichPerformance)
  result.totalAmount = totalAmount(result)
  result.totalVolumeCredits = totalVolumeCredits(result)

  return result

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result) // 중간 데이터에 연극 정보 저장
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)

    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) { // 값이 바뀌지 않는 변수는 매개변수로 전달
    let result = 0; // 변수를 초기화 && 명확한 이름으로 변경

    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) result += 1000 * (aPerformance.audience - 30)
        break;

      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) result += 1000 * (aPerformance.audience - 30)
        break;

      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
    }

    return result
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5)

    return result
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
}