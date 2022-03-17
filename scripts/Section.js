export default class Section {
  constructor({ items, renderer }, containerSelector){
    this._initialArray = items;
    this._renderer = renderer;

    this._container = containerSelector;
  }

  addItem(element, position) {
    if (position === 'start') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
