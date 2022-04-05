function compilerHtml(mdContent) {
  const mdContentArr = mdContent.replace(/(?<!\\)\r/g, '').split('\n').filter(i => i);
  console.log('mdContentArr--------》', mdContentArr);
  // todo 将md的格式转为html标签
  return mdContent
}

module.exports = {
  compilerHtml
}