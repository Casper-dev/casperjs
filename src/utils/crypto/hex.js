const toBytes = hex => {
  const bytes = []
  while (hex.length >= 2) {
    bytes.push(parseInt(hex.substring(0, 2), 16))
    hex = hex.substring(2, hex.length)
  }
  return bytes
}

module.exports = {
  toBytes
}