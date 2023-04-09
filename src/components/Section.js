export default class Section {
  constructor({renderer}, placeContainerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(placeContainerSelector);
  }

  rendererItem (items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem (item) {
    this._container.prepend(item);
  }

  addItemInversion (item) {
    this._container.append(item);
  }
}
