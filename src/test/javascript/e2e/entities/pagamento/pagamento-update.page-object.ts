import { element, by, ElementFinder } from 'protractor';

export default class PagamentoUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.pagamento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  valorInput: ElementFinder = element(by.css('input#pagamento-valor'));
  dataInput: ElementFinder = element(by.css('input#pagamento-data'));
  compradorSelect: ElementFinder = element(by.css('select#pagamento-comprador'));
  corretorSelect: ElementFinder = element(by.css('select#pagamento-corretor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setValorInput(valor) {
    await this.valorInput.sendKeys(valor);
  }

  async getValorInput() {
    return this.valorInput.getAttribute('value');
  }

  async setDataInput(data) {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput() {
    return this.dataInput.getAttribute('value');
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
