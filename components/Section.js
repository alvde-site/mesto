export default class Section {
  constructor({ items, renderer }, containerSelector){
    this._initialArray = items;
    this._renderer = renderer;

    this._container = containerSelector;
  }

  rendererItems() {
    this._initialArray.reverse().forEach(item => {
      //console.log(item)
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
