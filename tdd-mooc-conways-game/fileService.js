const fs = require('fs').promises

const readFile = async (file) => {
  const extension = file.split('.')[file.split('.').length - 1]
  if (extension !== 'rle') {
    return undefined
  }
  try {
    const content = await fs.readFile(file, 'utf8')
    return content
  } catch (err) {
    return undefined
  }
}

module.exports = { readFile }