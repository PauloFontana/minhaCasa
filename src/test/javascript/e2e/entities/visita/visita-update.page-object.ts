import { element, by, ElementFinder } from 'protractor';

export default class VisitaUpdatePage {
  pageTitle: ElementFinder = element(by.id('minhaCasaApp.visita.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dataInput: ElementFinder = element(by.css('input#visita-data'));
  avaliacaoInput: ElementFinder = element(by.css('textarea#visita-avaliacao'));
  imovelSelect: ElementFinder = element(by.css('select#visita-imovel'));
  corretorSelect: ElementFinder = element(by.css('select#visita-corretor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDataInput(data) {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput() {
    return this.dataInput.getAttribute('value');
  }

  async setAvaliacaoInput(avaliacao) {
    await this.avaliacaoInput.sendKeys(avaliacao);
  }

  async getAvaliacaoInput() {
    return this.avaliacaoInput.getAttribute('value');
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
