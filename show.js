import img from './img/冰墩墩.jpeg';
import './css/components.css';

const a = 1;

// 操作 DOM 元素，把 content 显示到网页上
function show(content) {
  const rootEl = window.document.getElementById('app');
  console.log('rootEl', rootEl);
  rootEl.innerHTML = 'Hello,' + content;
  const imgElement = new Image();
  imgElement.src = img;
  rootEl.appendChild(imgElement);
  const devEl = document.createElement('div');
  devEl.className = 'bg-div';
  devEl.style.width = 200 + 'px';
  devEl.style.height = 200 + 'px';
  devEl.style.backgroundColor = 'red';
  rootEl.appendChild(devEl);
}

export {
  show
}
