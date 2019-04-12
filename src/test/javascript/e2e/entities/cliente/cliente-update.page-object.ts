import { element, by, ElementFinder } from 'protractor';

export default class ClienteUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.cliente.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomeInput: ElementFinder = element(by.css('input#cliente-nome'));
  cpfInput: ElementFinder = element(by.css('input#cliente-cpf'));
  enderecoInput: ElementFinder = element(by.css('input#cliente-endereco'));
  telefoneInput: ElementFinder = element(by.css('input#cliente-telefone'));
  clienteProprietarioSelect: ElementFinder = element(by.css('select#cliente-clienteProprietario'));
  clienteCompradorSelect: ElementFinder = element(by.css('select#cliente-clienteComprador'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomeInput(nome) {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput() {
    return this.nomeInput.getAttribute('value');
  }

  async setCpfInput(cpf) {
    await this.cpfInput.sendKeys(cpf);
  }

  async getCpfInput() {
    return this.cpfInput.getAttribute('value');
  }

  async setEnderecoInput(endereco) {
    await this.enderecoInput.sendKeys(endereco);
  }

  async getEnderecoInput() {
    return this.enderecoInput.getAttribute('value');
  }

  async setTelefoneInput(telefone) {
    await this.telefoneInput.sendKeys(telefone);
  }

  async getTelefoneInput() {
    return this.telefoneInput.getAttribute('value');
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
