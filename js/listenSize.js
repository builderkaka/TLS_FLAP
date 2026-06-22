// 防抖函数实现
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}

// 统一始终展示 index.html，不再区分手机端和 PC 端
function showPcOrMobile() {
  const currentPath = window.location.pathname;
  const isIndexPage = currentPath.endsWith('/index.html') || currentPath === '/' || currentPath === '';

  // 只要当前不是 index.html，就跳回 index.html
  if (!isIndexPage) {
    window.location.href = '/index.html';
  }
}

window.addEventListener('resize', debounce(showPcOrMobile, 300));

showPcOrMobile();
