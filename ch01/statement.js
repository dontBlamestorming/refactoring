import {readFile} from "fs/promises"

import createStatementData from "./createStatementData.js";

const invoices = JSON.parse(await readFile("./invoices.json"))
const plays = JSON.parse(await readFile("./plays.json"))

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${perf.amount} (${perf.audience}석)\n`
  }

  result += `총액: ${usd(data.totalAmount)}\n`
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`

  return result

  function usd(aNumber) {
    return new Intl.NumberFormat("es-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100)
  }
}

const result = statement(invoices, plays)
console.log(result)
