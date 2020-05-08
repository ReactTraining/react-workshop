const fs = require('fs')
const path = require('path')
const { mdToPdf } = require('md-to-pdf')

const src = path.resolve(__dirname, '../glossary.md')
const dest = path.resolve(__dirname, '../glossary.pdf')

mdToPdf({ path: src })
  .then(pdf => {
    if (pdf) {
      fs.writeFileSync(dest, pdf.content)
    }
  })
  .catch(console.error)
