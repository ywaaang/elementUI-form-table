const has = browser => {
  const ua = navigator.userAgent
  if (browser === 'ie') {
    const isIE = ua.indexOf('compatible') > -1 && ua.indexOf('MSIE') > -1
    if (isIE) {
      const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
      reIE.test(ua)
      return parseFloat(RegExp.$1)
    } else {
      return false
    }
  } else {
    return ua.indexOf(browser) > -1
  }
}

const newLine = '\r\n'
const appendLine = (content, row, { separator, quoted }) => {
  const line = row.map(data => {
    if (!quoted) return data
    // quote data
    data = typeof data === 'string' ? data.replace(/"/g, '"') : data
    return `"${data}"`
  })
  content.push(line.join(separator))
}

const defaults = {
  separator: ',',
  quoted: false
}
const csv = {
  _isIE11() {
    let iev = 0
    const ieold = /MSIE (\d+\.\d+);/.test(navigator.userAgent)
    const trident = !!navigator.userAgent.match(/Trident\/7.0/)
    const rv = navigator.userAgent.indexOf('rv:11.0')

    if (ieold) {
      iev = Number(RegExp.$1)
    }
    if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
      iev = 10
    }
    if (trident && rv !== -1) {
      iev = 11
    }

    return iev === 11
  },

  _isEdge() {
    return /Edge/.test(navigator.userAgent)
  },

  _getDownloadUrl(text) {
    const BOM = '\uFEFF'
    // Add BOM to text for open in excel correctly
    if (window.Blob && window.URL && window.URL.createObjectURL) {
      const csvData = new window.Blob([BOM + text], { type: 'text/csv' })
      return URL.createObjectURL(csvData)
    } else {
      return 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(text)
    }
  },

  download(filename, text) {
    if (has('ie') && has('ie') < 10) {
      // has module unable identify ie11 and Edge
      const oWin = window.top.open('about:blank', '_blank')
      oWin.document.charset = 'utf-8'
      oWin.document.write(text)
      oWin.document.close()
      oWin.document.execCommand('SaveAs', filename)
      oWin.close()
    } else if (has('ie') === 10 || this._isIE11() || this._isEdge()) {
      const BOM = '\uFEFF'
      const csvData = new Blob([BOM + text], { type: 'text/csv' })
      navigator.msSaveBlob(csvData, filename)
    } else {
      const link = document.createElement('a')
      link.download = filename
      link.href = this._getDownloadUrl(text)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  },
  getStrFunction(str, obj) {
    str = str.replace(/(\.\d)/g, '[$1]').replace(/\.\[/g, '[')
    const Fn = Function
    try {
      return new Fn(`return this.${str}`).call(obj)
    } catch (error) {
      return undefined
    }
  },
  format(columns, datas, options) {
    options = Object.assign({}, defaults, options)
    const content = []
    const column = columns.map(v => v.label)
    appendLine(content, column, options)
    datas.forEach(row => {
      if (!Array.isArray(row)) {
        row = columns.map(obj => {
          let text
          if (typeof obj.format === 'function') {
            text = obj.format(row)
          } else {
            text = this.getStrFunction(obj.prop, row)
          }
          text = typeof text !== 'undefined' ? text : ''
          return `\t${text}`.replace(/,/g, '???')
        })
      }
      appendLine(content, row, options)
    })
    return content.join(newLine)
  }
}

export default csv
