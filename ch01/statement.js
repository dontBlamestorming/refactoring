import {readFile} from "fs/promises"

import createStatementData from "./createStatementData.js";

const invoices = JSON.parse(await readFile("./invoices.json"))
const plays = JSON.parse(await readFile("./plays.json"))

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${perf.amount} (${perf.audience}석)\n`
  }

  result += `총액: ${usd(data.totalAmount)}\n`
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`

  return result
}

function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>`
  result += "<table>\n"
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>"

  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>${perf.audience}석</td></tr>`
    result += `<td>${usd(perf.amount)}</td></tr>\n`
  }

  result += `</table>\n`
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>`
  result += `<p>적립 포인트: <em>%{data.totalVolumeCredits}</em></p>\n`

  return result
}

function usd(aNumber) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100)
}

const result = statement(invoices, plays)
console.log(result)
