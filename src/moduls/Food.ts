class Food {
  //定义属性
  element: HTMLElement;
  constructor() {
    // 获取页面的元素并将其赋值给element
    this.element = document.getElementById('food')!;

  }
  get X() {
    return this.element.offsetLeft;
  }
  get Y() {
    return this.element.offsetTop;
  }
  change() {
    let left = Math.round(Math.random() * 29) * 10
    let top = Math.round(Math.random() * 29) * 10
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}

export default Food;