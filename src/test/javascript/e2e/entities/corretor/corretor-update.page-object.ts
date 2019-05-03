import { element, by, ElementFinder } from 'protractor';

export default class CorretorUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.corretor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  registroImobiliariaInput: ElementFinder = element(by.css('input#corretor-registroImobiliaria'));
  passwordInput: ElementFinder = element(by.css('input#corretor-password'));
  numeroCreciInput: ElementFinder = element(by.css('input#corretor-numeroCreci'));
  contaCorrenteInput: ElementFinder = element(by.css('input#corretor-contaCorrente'));
  imobiliariaSelect: ElementFinder = element(by.css('select#corretor-imobiliaria'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRegistroImobiliariaInput(registroImobiliaria) {
    await this.registroImobiliariaInput.sendKeys(registroImobiliaria);
  }

  async getRegistroImobiliariaInput() {
    return this.registroImobiliariaInput.getAttribute('value');
  }

  async setPasswordInput(password) {
    await this.passwordInput.sendKeys(password);
  }

  async getPasswordInput() {
    return this.passwordInput.getAttribute('value');
  }

  async setNumeroCreciInput(numeroCreci) {
    await this.numeroCreciInput.sendKeys(numeroCreci);
  }

  async getNumeroCreciInput() {
    return this.numeroCreciInput.getAttribute('value');
  }

  async setContaCorrenteInput(contaCorrente) {
    await this.contaCorrenteInput.sendKeys(contaCorrente);
  }

  async getContaCorrenteInput() {
    return this.contaCorrenteInput.getAttribute('value');
  }

  async imobiliariaSelectLastOption() {
    await this.imobiliariaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async imobiliariaSelectOption(option) {
    await this.imobiliariaSelect.sendKeys(option);
  }

  getImobiliariaSelect() {
    return this.imobiliariaSelect;
  }

  async getImobiliariaSelectedOption() {
    return this.imobiliariaSelect.element(by.css('option:checked')).getText();
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
