import { element, by, ElementFinder } from 'protractor';

export default class RepasseUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.repasse.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  valorInput: ElementFinder = element(by.css('input#repasse-valor'));
  proprietarioSelect: ElementFinder = element(by.css('select#repasse-proprietario'));
  corretorSelect: ElementFinder = element(by.css('select#repasse-corretor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setValorInput(valor) {
    await this.valorInput.sendKeys(valor);
  }

  async getValorInput() {
    return this.valorInput.getAttribute('value');
  }

  async proprietarioSelectLastOption() {
    await this.proprietarioSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async proprietarioSelectOption(option) {
    await this.proprietarioSelect.sendKeys(option);
  }

  getProprietarioSelect() {
    return this.proprietarioSelect;
  }

  async getProprietarioSelectedOption() {
    return this.proprietarioSelect.element(by.css('option:checked')).getText();
  }

  async corretorSelectLastOption() {
    await this.corretorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async corretorSelectOption(option) {
    await this.corretorSelect.sendKeys(option);
  }

  getCorretorSelect() {
    return this.corretorSelect;
  }

  async getCorretorSelectedOption() {
    return this.corretorSelect.element(by.css('option:checked')).getText();
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
