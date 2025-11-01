const postcss = require('postcss')
const { equal } = require('node:assert')
const { test } = require('node:test')

const plugin = require('./')

async function run(input, output, opts = {}) {
  const result = await postcss([plugin(opts)]).process(input, { from: undefined })
  equal(result.css, output)
  equal(result.warnings().length, 0)
}

test('converts "@media container and" to "@container" (basic)', async () => {
  const input = `@media container and (min-width: 600px) {\n  .box { color: red; }\n}`
  const output = `@container (min-width: 600px) {\n  .box { color: red; }\n}`
  await run(input, output)
})

test('does not change normal @media rules', async () => {
  const input = `@media (min-width: 600px) {\n  .box { color: blue; }\n}`
  const output = input
  await run(input, output)
})

test('converts complex comma + and syntax to @container with or', async () => {
  const input = `@media container (max-width: 99.98px), container and (max-height: 99.98px) {\n  .box { color: green; }\n}`
  const output = `@container (max-width: 99.98px) or (max-height: 99.98px) {\n  .box { color: green; }\n}`
  await run(input, output)
})
