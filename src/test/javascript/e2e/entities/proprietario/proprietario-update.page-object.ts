import { element, by, ElementFinder } from 'protractor';

export default class ProprietarioUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.proprietario.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contaCorrenteInput: ElementFinder = element(by.css('input#proprietario-contaCorrente'));
  userSelect: ElementFinder = element(by.css('select#proprietario-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setContaCorrenteInput(contaCorrente) {
    await this.contaCorrenteInput.sendKeys(contaCorrente);
  }

  async getContaCorrenteInput() {
    return this.contaCorrenteInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
