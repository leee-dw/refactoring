import createStatementData from './createStatementData.js'
// import invoices from '../database/invoices.json'
// import plays from '../database/plays.json'

const invoices = {
  customer: 'BigCo',
  performances: [
    {
      playId: 'hamlet',
      audience: 55,
    },

    {
      playId: 'as-like',
      audience: 35,
    },

    {
      playId: 'othello',
      audience: 40,
    },
  ],
}

const plays = {
  hamlet: {
    name: 'Hamlet',
    type: 'tragedy',
  },
  'as-like': {
    name: 'As You Like It',
    type: 'comedy',
  },
  othello: {
    name: 'Othello',
    type: 'tragedy',
  },
}

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText(data, plays) {
  let result = `청구내역 (고객명: for ${data.customer}`
  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`
  }
  result += `총액: ${usd(data.totalAmount)}\n`
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`
  return result
}

function htmlStatement(invoice, plays) {
  return renderHTML(createStatementData(invoice, plays))
}

function renderHTML(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})\n</h1>`

  result += `<table>\n`
  result += `<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>`

  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`
    result += `<td>${usd(perf.amount)}</td>\n`
  }

  result += `</table>\n`

  result += `</p>총액: <em>${usd(data.totalAmount)}</em></p>\n`
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`
  return result
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100)
}

statement(invoices, plays)
