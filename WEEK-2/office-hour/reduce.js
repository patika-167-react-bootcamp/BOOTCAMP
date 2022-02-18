const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
]

const reduced = inventors.reduce((grouped, item) => {
  const key = item.first.charAt(0)
  if (grouped[key]) {
    grouped[key].push(item)
  } else {
    grouped[key] = [item]
  }
  return grouped
}, {})

const array = Object.entries(reduced)
array.sort((a, b) => {
  if (a[0] > b[0]) {
    return 1
  } else {
    return -1
  }
})
Object.fromArray = function (array) {
  return
}
const r = array.reduce((acc, curr) => {
  const key = curr[0]
  acc[key] = curr[1]
  return acc
}, {})

const j = {
  a: {
    name: 'hakan',
    surname: 'özoğlu',
  },
  b: { town: 'eyüp', job: 'developer' },
  c: [1, 2, 3],
}
const aa = [
  [
    'a',
    {
      name: 'hakan',
      surname: 'özoğlu',
    },
  ],
  ['b', { town: 'eyüp', job: 'developer' }],
  ['c', [1, 2, 3]],
]
console.log('a', 'b', 'c', 'd', 'e')
console.log(['a', 'b', 'c', 'd', 'e'])
console.log(...['a', 'b', 'c', 'd', 'e'])

function toplam(a,b,...dizi) {
  return dizi.reduce((toplam, oge) => toplam + oge, 0)
}
const [a, b,...rest] = ['hakan', 'ömer', 'birisi daha','ve birisi daha']
const user = { name: 'hakan', surname: 'özoğlu', job: 'developer', age:29 }

const { name, surname,...kalanlar } = user

console.log(toplam(1,2,3,4,5,6))
console.log(rest)