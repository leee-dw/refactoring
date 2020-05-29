const invoices = require('./invoices.json')
const plays = require('./plays.json')

function statement(invoice, plays) {
  function amountFor(aPerformance) {
    // 필요 없어진 매개변수 제거
    let result = 0
    switch (
      playFor(aPerformance).type // play를 playFor() 호출로 변경
    ) {
      case 'tragedy': //비극
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break

      case 'comedy': // 희극
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }

        result += 300 * aPerformance.audience
        break

      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`) // play를 playFor() 호출로 변경
    }
    return result
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playId]
  }

  function volumeCredits(aPerformance) {
    let result = 0
    result += Math.max(aPerformance.audience - 30, 0)
    if ('comedy' === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5)
    }
    return result
  }

  let totalAmount = 0
  let volumeCredits = 0
  let result = `청구 내역 (고객명: ${invoice.customer})\n`

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format

  for (let perf of invoice.performances) {
    // 포인트를 적립한다.
    volumeCredits += volumeCredits(perf) // 추출한 함수를 이요해 값을 누적
    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    }석) \n`
    totalAmount += amountFor(perf)
  }
  result += `총액: ${format(totalAmount / 100)}\n`
  result += `적립 포인트: ${volumeCredits}점\n`
  return result
}

console.log(statement(invoices, plays))
