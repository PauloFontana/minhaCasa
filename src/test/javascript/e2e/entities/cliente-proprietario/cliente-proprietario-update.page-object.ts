import { element, by, ElementFinder } from 'protractor';

export default class ClienteProprietarioUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.clienteProprietario.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contaCorrenteInput: ElementFinder = element(by.css('input#cliente-proprietario-contaCorrente'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setContaCorrenteInput(contaCorrente) {
    await this.contaCorrenteInput.sendKeys(contaCorrente);
  }

  async getContaCorrenteInput() {
    return this.contaCorrenteInput.getAttribute('value');
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
