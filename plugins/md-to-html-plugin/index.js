const { readFileSync } = require('fs');
const path = require('path');
const { compilerHtml } = require('./compiler');

const INNER_MARK = '<!-- inner -->';

class MdToHtmlPlugin {
  constructor({ template, filename }) {
    if (!template) {
      throw new Error('The config for "template" must be configured')
    }
    this.template = template;
    this.filename = filename ? filename : 'md.html'
  }

  apply(compiler) {
    compiler.hooks.emit.tap('md-to-html-plugin', (compilation) => {
      // 打包后的资源
      const _assets = compilation.assets;
      const mdContent = readFileSync(this.template, 'utf8');
      const _templateHtml = readFileSync(path.join(__dirname, 'template.html'), 'utf8');
      const htmlStr = compilerHtml(mdContent);
      const finalHtml = _templateHtml.replace(INNER_MARK, htmlStr);
      // 添加到打包后的文件夹中
      _assets[this.filename] = {
        source() {
          return finalHtml
        },
        size() {
          return finalHtml.length
        }
      }
    })
  }
}

module.exports = MdToHtmlPlugin