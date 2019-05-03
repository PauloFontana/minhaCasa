import { element, by, ElementFinder } from 'protractor';

export default class ImovelUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.imovel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  categoriaInput: ElementFinder = element(by.css('input#imovel-categoria'));
  tipoInput: ElementFinder = element(by.css('input#imovel-tipo'));
  valorInput: ElementFinder = element(by.css('input#imovel-valor'));
  atributosInput: ElementFinder = element(by.css('input#imovel-atributos'));
  proprietarioSelect: ElementFinder = element(by.css('select#imovel-proprietario'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCategoriaInput(categoria) {
    await this.categoriaInput.sendKeys(categoria);
  }

  async getCategoriaInput() {
    return this.categoriaInput.getAttribute('value');
  }

  async setTipoInput(tipo) {
    await this.tipoInput.sendKeys(tipo);
  }

  async getTipoInput() {
    return this.tipoInput.getAttribute('value');
  }

  async setValorInput(valor) {
    await this.valorInput.sendKeys(valor);
  }

  async getValorInput() {
    return this.valorInput.getAttribute('value');
  }

  async setAtributosInput(atributos) {
    await this.atributosInput.sendKeys(atributos);
  }

  async getAtributosInput() {
    return this.atributosInput.getAttribute('value');
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
