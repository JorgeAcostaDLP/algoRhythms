export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return
    try {
      const input = ['tacocat', 'jorge', 'MADDAM']
      const output = [true, false, true]
      const code = e.data
      let bodyCode = code.slice(code.indexOf('{') + 1)
      bodyCode = bodyCode.slice(0, -1)

      let fn = new Function('str', bodyCode + '')
      const results = []
      input.forEach((str, index) => {
        //Check if input matches output after calling the fn
        let palindrome = fn(str)

        let passed = palindrome === output[index]
        let res = `Expected ${str} to equal ${output[index]}: ${passed}`
        results[index] = res
      })
      postMessage(results)
    } catch (error) {
      postMessage([error.message])
    }
  })
}
