/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PagamentoComponentsPage from './pagamento.page-object';
import { PagamentoDeleteDialog } from './pagamento.page-object';
import PagamentoUpdatePage from './pagamento-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Pagamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pagamentoUpdatePage: PagamentoUpdatePage;
  let pagamentoComponentsPage: PagamentoComponentsPage;
  let pagamentoDeleteDialog: PagamentoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Pagamentos', async () => {
    await navBarPage.getEntityPage('pagamento');
    pagamentoComponentsPage = new PagamentoComponentsPage();
    expect(await pagamentoComponentsPage.getTitle().getText()).to.match(/Pagamentos/);
  });

  it('should load create Pagamento page', async () => {
    await pagamentoComponentsPage.clickOnCreateButton();
    pagamentoUpdatePage = new PagamentoUpdatePage();
    expect(await pagamentoUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.pagamento.home.createOrEditLabel/);
  });

  it('should create and save Pagamentos', async () => {
    const nbButtonsBeforeCreate = await pagamentoComponentsPage.countDeleteButtons();

    await pagamentoUpdatePage.setValorInput('5');
    expect(await pagamentoUpdatePage.getValorInput()).to.eq('5');
    await pagamentoUpdatePage.setDataInput('01-01-2001');
    expect(await pagamentoUpdatePage.getDataInput()).to.eq('2001-01-01');
    await pagamentoUpdatePage.compradorSelectLastOption();
    await pagamentoUpdatePage.corretorSelectLastOption();
    await waitUntilDisplayed(pagamentoUpdatePage.getSaveButton());
    await pagamentoUpdatePage.save();
    await waitUntilHidden(pagamentoUpdatePage.getSaveButton());
    expect(await pagamentoUpdatePage.getSaveButton().isPresent()).to.be.false;

    await pagamentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await pagamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Pagamento', async () => {
    await pagamentoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await pagamentoComponentsPage.countDeleteButtons();
    await pagamentoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    pagamentoDeleteDialog = new PagamentoDeleteDialog();
    expect(await pagamentoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.pagamento.delete.question/);
    await pagamentoDeleteDialog.clickOnConfirmButton();

    await pagamentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await pagamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
