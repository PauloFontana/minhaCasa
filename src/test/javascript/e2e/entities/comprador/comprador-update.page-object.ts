import { element, by, ElementFinder } from 'protractor';

export default class CompradorUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.comprador.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  rendaInput: ElementFinder = element(by.css('input#comprador-renda'));
  garantiasInput: ElementFinder = element(by.css('input#comprador-garantias'));
  userSelect: ElementFinder = element(by.css('select#comprador-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRendaInput(renda) {
    await this.rendaInput.sendKeys(renda);
  }

  async getRendaInput() {
    return this.rendaInput.getAttribute('value');
  }

  async setGarantiasInput(garantias) {
    await this.garantiasInput.sendKeys(garantias);
  }

  async getGarantiasInput() {
    return this.garantiasInput.getAttribute('value');
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
