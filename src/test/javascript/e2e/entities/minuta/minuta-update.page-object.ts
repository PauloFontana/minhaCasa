import { element, by, ElementFinder } from 'protractor';

export default class MinutaUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.minuta.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  conteudoInput: ElementFinder = element(by.css('textarea#minuta-conteudo'));
  imovelSelect: ElementFinder = element(by.css('select#minuta-imovel'));
  proprietarioSelect: ElementFinder = element(by.css('select#minuta-proprietario'));
  compradorSelect: ElementFinder = element(by.css('select#minuta-comprador'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setConteudoInput(conteudo) {
    await this.conteudoInput.sendKeys(conteudo);
  }

  async getConteudoInput() {
    return this.conteudoInput.getAttribute('value');
  }

  async imovelSelectLastOption() {
    await this.imovelSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async imovelSelectOption(option) {
    await this.imovelSelect.sendKeys(option);
  }

  getImovelSelect() {
    return this.imovelSelect;
  }

  async getImovelSelectedOption() {
    return this.imovelSelect.element(by.css('option:checked')).getText();
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

  async compradorSelectLastOption() {
    await this.compradorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async compradorSelectOption(option) {
    await this.compradorSelect.sendKeys(option);
  }

  getCompradorSelect() {
    return this.compradorSelect;
  }

  async getCompradorSelectedOption() {
    return this.compradorSelect.element(by.css('option:checked')).getText();
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
