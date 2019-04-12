import { element, by, ElementFinder } from 'protractor';

export default class ClienteCompradorUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.clienteComprador.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  rendaInput: ElementFinder = element(by.css('input#cliente-comprador-renda'));
  garantiasInput: ElementFinder = element(by.css('input#cliente-comprador-garantias'));

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
