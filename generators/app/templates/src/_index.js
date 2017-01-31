require('./index.less');

export default class <%= className %> extends HTMLElement {
  
  constructor() {
    super();
    this._model = null;
    this._session = null;
    this._rerender();
  }

  set model(m) {
    this._model = m;
    this._rerender();
  }

  set session(s) {
    this._session = s;
    if (!this._session.answer) {
      this._session.answer = false;
    }
    this._rerender();
  }

  get session() {
    return this._session;
  }

  _rerender() {
    let feedback = (function(model) {
      if (model && model.feedback) {
        return [
          "<div class='feedback'>",
            model.feedback,
          "</div>"
        ].join('\n');
      } else {
        return "";
      }
    }(this._model));

    let checked = this._session ? this._session.answer : false;

    this.innerHTML = [
      '<label class="switch">',
        '<input type="checkbox" ', (checked ? 'checked=""' : ''), '>',
        '<div class="slider round"></div>',
      '</label>',
      feedback
    ].join('\n');

    this.getElementsByTagName('input')[0].addEventListener('change', (e) => {
      this._session.answer = e.target.checked;
    });
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('pie.register', { bubbles: true }));
    this._rerender();
  }

}