import { element, by, ElementFinder } from 'protractor';

export default class ImovelUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.imovel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  categoriaInput: ElementFinder = element(by.css('input#imovel-categoria'));
  tipoInput: ElementFinder = element(by.css('input#imovel-tipo'));
  valorInput: ElementFinder = element(by.css('input#imovel-valor'));
  atributosInput: ElementFinder = element(by.css('input#imovel-atributos'));
  clienteProprietarioSelect: ElementFinder = element(by.css('select#imovel-clienteProprietario'));
  clienteCompradorSelect: ElementFinder = element(by.css('select#imovel-clienteComprador'));

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

  async clienteProprietarioSelectLastOption() {
    await this.clienteProprietarioSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clienteProprietarioSelectOption(option) {
    await this.clienteProprietarioSelect.sendKeys(option);
  }

  getClienteProprietarioSelect() {
    return this.clienteProprietarioSelect;
  }

  async getClienteProprietarioSelectedOption() {
    return this.clienteProprietarioSelect.element(by.css('option:checked')).getText();
  }

  async clienteCompradorSelectLastOption() {
    await this.clienteCompradorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clienteCompradorSelectOption(option) {
    await this.clienteCompradorSelect.sendKeys(option);
  }

  getClienteCompradorSelect() {
    return this.clienteCompradorSelect;
  }

  async getClienteCompradorSelectedOption() {
    return this.clienteCompradorSelect.element(by.css('option:checked')).getText();
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
