/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClienteComponentsPage from './cliente.page-object';
import { ClienteDeleteDialog } from './cliente.page-object';
import ClienteUpdatePage from './cliente-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Cliente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clienteUpdatePage: ClienteUpdatePage;
  let clienteComponentsPage: ClienteComponentsPage;
  let clienteDeleteDialog: ClienteDeleteDialog;

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

  it('should load Clientes', async () => {
    await navBarPage.getEntityPage('cliente');
    clienteComponentsPage = new ClienteComponentsPage();
    expect(await clienteComponentsPage.getTitle().getText()).to.match(/Clientes/);
  });

  it('should load create Cliente page', async () => {
    await clienteComponentsPage.clickOnCreateButton();
    clienteUpdatePage = new ClienteUpdatePage();
    expect(await clienteUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.cliente.home.createOrEditLabel/);
  });

  it('should create and save Clientes', async () => {
    const nbButtonsBeforeCreate = await clienteComponentsPage.countDeleteButtons();

    await clienteUpdatePage.setNomeInput('nome');
    expect(await clienteUpdatePage.getNomeInput()).to.match(/nome/);
    await clienteUpdatePage.setCpfInput('5');
    expect(await clienteUpdatePage.getCpfInput()).to.eq('5');
    await clienteUpdatePage.setEnderecoInput('endereco');
    expect(await clienteUpdatePage.getEnderecoInput()).to.match(/endereco/);
    await clienteUpdatePage.setTelefoneInput('5');
    expect(await clienteUpdatePage.getTelefoneInput()).to.eq('5');
    await clienteUpdatePage.clienteProprietarioSelectLastOption();
    await clienteUpdatePage.clienteCompradorSelectLastOption();
    await waitUntilDisplayed(clienteUpdatePage.getSaveButton());
    await clienteUpdatePage.save();
    await waitUntilHidden(clienteUpdatePage.getSaveButton());
    expect(await clienteUpdatePage.getSaveButton().isPresent()).to.be.false;

    await clienteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Cliente', async () => {
    await clienteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await clienteComponentsPage.countDeleteButtons();
    await clienteComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    clienteDeleteDialog = new ClienteDeleteDialog();
    expect(await clienteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.cliente.delete.question/);
    await clienteDeleteDialog.clickOnConfirmButton();

    await clienteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
