
import lodash from 'lodash';
import Clipboard from 'clipboard'

function getType (o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}
function isDiff (o1 = null, o2 = null, key = null) {
  if (o1 === o2) return false
  if (getType(o1) !== getType(o2)) return true
  if (o1 === null || o2 === null) return true
  if (getType(o1) === 'Array') {
    if (o1.length !== o2.length) return true
    return o1.some((item, index) => isDiff(item, o2[index], key))
  }
  if (getType(o1) === 'Object') {
    return key ? o1[key] !== o2[key] : Object.keys(o1).some((k) => isDiff(o1[k], o2[k], key))
  }
  if (getType(o1) === 'Date') return o1.getTime() !== o2.getTime()
  return true
}

function currency (value = 0, currency = '¥', decimals = 2) {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  const stringified = Math.abs(value).toFixed(decimals)
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  const i = _int.length % 3
  const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  const _float = decimals ? stringified.slice(-1 - decimals) : ''
  const sign = value < 0 ? ' -' : ' '
  return (
    currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float
  )
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function uuid() {
    return Date.now() + '_' + S4()
}

function deepClone(object) {
    return lodash.cloneDeep(object);
}

function copyText(text, className) {
    if (typeof text === 'object') {
        text = JSON.stringify(text)
    }
    var clipboard = new Clipboard(className, {
        text: () => text
    })
    return new Promise((resolve, reject) => {
        clipboard.on('success', () => {
            resolve()
            clipboard.destroy()
        })
        clipboard.on('error', () => {
            reject()
            clipboard.destroy()
        })
    })
}

function formatJson(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    function(match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

export {
    deepClone,
    copyText,
    uuid,
    S4,
    getType,
    isDiff,
    currency,
    formatJson
}