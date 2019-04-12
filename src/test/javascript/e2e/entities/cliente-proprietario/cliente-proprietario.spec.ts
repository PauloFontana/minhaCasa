/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClienteProprietarioComponentsPage from './cliente-proprietario.page-object';
import { ClienteProprietarioDeleteDialog } from './cliente-proprietario.page-object';
import ClienteProprietarioUpdatePage from './cliente-proprietario-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ClienteProprietario e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clienteProprietarioUpdatePage: ClienteProprietarioUpdatePage;
  let clienteProprietarioComponentsPage: ClienteProprietarioComponentsPage;
  let clienteProprietarioDeleteDialog: ClienteProprietarioDeleteDialog;

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

  it('should load ClienteProprietarios', async () => {
    await navBarPage.getEntityPage('cliente-proprietario');
    clienteProprietarioComponentsPage = new ClienteProprietarioComponentsPage();
    expect(await clienteProprietarioComponentsPage.getTitle().getText()).to.match(/Cliente Proprietarios/);
  });

  it('should load create ClienteProprietario page', async () => {
    await clienteProprietarioComponentsPage.clickOnCreateButton();
    clienteProprietarioUpdatePage = new ClienteProprietarioUpdatePage();
    expect(await clienteProprietarioUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /minhaCasaApp.clienteProprietario.home.createOrEditLabel/
    );
  });

  it('should create and save ClienteProprietarios', async () => {
    const nbButtonsBeforeCreate = await clienteProprietarioComponentsPage.countDeleteButtons();

    await clienteProprietarioUpdatePage.setContaCorrenteInput('contaCorrente');
    expect(await clienteProprietarioUpdatePage.getContaCorrenteInput()).to.match(/contaCorrente/);
    await waitUntilDisplayed(clienteProprietarioUpdatePage.getSaveButton());
    await clienteProprietarioUpdatePage.save();
    await waitUntilHidden(clienteProprietarioUpdatePage.getSaveButton());
    expect(await clienteProprietarioUpdatePage.getSaveButton().isPresent()).to.be.false;

    await clienteProprietarioComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await clienteProprietarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ClienteProprietario', async () => {
    await clienteProprietarioComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await clienteProprietarioComponentsPage.countDeleteButtons();
    await clienteProprietarioComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    clienteProprietarioDeleteDialog = new ClienteProprietarioDeleteDialog();
    expect(await clienteProprietarioDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /minhaCasaApp.clienteProprietario.delete.question/
    );
    await clienteProprietarioDeleteDialog.clickOnConfirmButton();

    await clienteProprietarioComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await clienteProprietarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
