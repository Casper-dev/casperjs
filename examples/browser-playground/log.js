const log = (message, payload) => {
  const entry = `[${new Date().toLocaleString()}] ${message}: ${payload}\n`
  document.getElementById('log').value += entry
}

export default log