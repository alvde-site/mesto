export default class Section {
  constructor({ items, renderer }, containerSelector){
    this._initialArray = items;
    this._renderer = renderer;

    this._container = containerSelector;
  }

  rendererItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, position) {
    if (position === 'start') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
