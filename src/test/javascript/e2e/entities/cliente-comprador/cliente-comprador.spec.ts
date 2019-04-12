/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClienteCompradorComponentsPage from './cliente-comprador.page-object';
import { ClienteCompradorDeleteDialog } from './cliente-comprador.page-object';
import ClienteCompradorUpdatePage from './cliente-comprador-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ClienteComprador e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clienteCompradorUpdatePage: ClienteCompradorUpdatePage;
  let clienteCompradorComponentsPage: ClienteCompradorComponentsPage;
  let clienteCompradorDeleteDialog: ClienteCompradorDeleteDialog;

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

  it('should load ClienteCompradors', async () => {
    await navBarPage.getEntityPage('cliente-comprador');
    clienteCompradorComponentsPage = new ClienteCompradorComponentsPage();
    expect(await clienteCompradorComponentsPage.getTitle().getText()).to.match(/Cliente Compradors/);
  });

  it('should load create ClienteComprador page', async () => {
    await clienteCompradorComponentsPage.clickOnCreateButton();
    clienteCompradorUpdatePage = new ClienteCompradorUpdatePage();
    expect(await clienteCompradorUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /minhaCasaApp.clienteComprador.home.createOrEditLabel/
    );
  });

  it('should create and save ClienteCompradors', async () => {
    const nbButtonsBeforeCreate = await clienteCompradorComponentsPage.countDeleteButtons();

    await clienteCompradorUpdatePage.setRendaInput('5');
    expect(await clienteCompradorUpdatePage.getRendaInput()).to.eq('5');
    await clienteCompradorUpdatePage.setGarantiasInput('garantias');
    expect(await clienteCompradorUpdatePage.getGarantiasInput()).to.match(/garantias/);
    await waitUntilDisplayed(clienteCompradorUpdatePage.getSaveButton());
    await clienteCompradorUpdatePage.save();
    await waitUntilHidden(clienteCompradorUpdatePage.getSaveButton());
    expect(await clienteCompradorUpdatePage.getSaveButton().isPresent()).to.be.false;

    await clienteCompradorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await clienteCompradorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ClienteComprador', async () => {
    await clienteCompradorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await clienteCompradorComponentsPage.countDeleteButtons();
    await clienteCompradorComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    clienteCompradorDeleteDialog = new ClienteCompradorDeleteDialog();
    expect(await clienteCompradorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /minhaCasaApp.clienteComprador.delete.question/
    );
    await clienteCompradorDeleteDialog.clickOnConfirmButton();

    await clienteCompradorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await clienteCompradorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
