import { element, by, ElementFinder } from 'protractor';

export default class ImobiliariaUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.imobiliaria.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  loginInput: ElementFinder = element(by.css('input#imobiliaria-login'));
  passwordInput: ElementFinder = element(by.css('input#imobiliaria-password'));
  nomeInput: ElementFinder = element(by.css('input#imobiliaria-nome'));
  cnpjInput: ElementFinder = element(by.css('input#imobiliaria-cnpj'));
  enderecoInput: ElementFinder = element(by.css('input#imobiliaria-endereco'));
  telefoneInput: ElementFinder = element(by.css('input#imobiliaria-telefone'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLoginInput(login) {
    await this.loginInput.sendKeys(login);
  }

  async getLoginInput() {
    return this.loginInput.getAttribute('value');
  }

  async setPasswordInput(password) {
    await this.passwordInput.sendKeys(password);
  }

  async getPasswordInput() {
    return this.passwordInput.getAttribute('value');
  }

  async setNomeInput(nome) {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput() {
    return this.nomeInput.getAttribute('value');
  }

  async setCnpjInput(cnpj) {
    await this.cnpjInput.sendKeys(cnpj);
  }

  async getCnpjInput() {
    return this.cnpjInput.getAttribute('value');
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
