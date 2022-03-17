export default class Section {
  constructor({ items, renderer }, containerSelector){
    this._initialArray = items;
    this._renderer = renderer;

    this._container = containerSelector;
  }
}
