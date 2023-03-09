export class FormValidator {
  constructor (validationSettings, modal) {
    this._validationSettings = validationSettings;
    this._modal = modal;
  }

  _showInputError (formElement, inputElement, errorMessage) {
    inputElement.classList.add(this._validationSettings.inputErrorClass);

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.errorClass);
  };

  _hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = '';
  };

  _isValid (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _setEventListeners (formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(this._validationSettings.inputSelector));
    this._submitButtonSelector = formElement.querySelector(this._validationSettings.submitButtonSelector);

    this._toggleButtonState(this._inputList, this._submitButtonSelector);

    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(this._inputList, this._submitButtonSelector);
      }, 0);
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._modal, inputElement);
        this._toggleButtonState(this._inputList, this._submitButtonSelector);
      });
    });
  };

  enableValidation () {
    const formElement = this._modal.querySelector(this._validationSettings.formSelector)

    this._setEventListeners (formElement);
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState () {
    if (this._hasInvalidInput (this._inputList)) {
      this._submitButtonSelector.classList.add(this._validationSettings.inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove(this._validationSettings.inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    };
  }
}
