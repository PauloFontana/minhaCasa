/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProprietarioComponentsPage from './proprietario.page-object';
import { ProprietarioDeleteDialog } from './proprietario.page-object';
import ProprietarioUpdatePage from './proprietario-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Proprietario e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let proprietarioUpdatePage: ProprietarioUpdatePage;
  let proprietarioComponentsPage: ProprietarioComponentsPage;
  let proprietarioDeleteDialog: ProprietarioDeleteDialog;

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

  it('should load Proprietarios', async () => {
    await navBarPage.getEntityPage('proprietario');
    proprietarioComponentsPage = new ProprietarioComponentsPage();
    expect(await proprietarioComponentsPage.getTitle().getText()).to.match(/Proprietarios/);
  });

  it('should load create Proprietario page', async () => {
    await proprietarioComponentsPage.clickOnCreateButton();
    proprietarioUpdatePage = new ProprietarioUpdatePage();
    expect(await proprietarioUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.proprietario.home.createOrEditLabel/);
  });

  it('should create and save Proprietarios', async () => {
    const nbButtonsBeforeCreate = await proprietarioComponentsPage.countDeleteButtons();

    await proprietarioUpdatePage.setContaCorrenteInput('contaCorrente');
    expect(await proprietarioUpdatePage.getContaCorrenteInput()).to.match(/contaCorrente/);
    await proprietarioUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(proprietarioUpdatePage.getSaveButton());
    await proprietarioUpdatePage.save();
    await waitUntilHidden(proprietarioUpdatePage.getSaveButton());
    expect(await proprietarioUpdatePage.getSaveButton().isPresent()).to.be.false;

    await proprietarioComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await proprietarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Proprietario', async () => {
    await proprietarioComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await proprietarioComponentsPage.countDeleteButtons();
    await proprietarioComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    proprietarioDeleteDialog = new ProprietarioDeleteDialog();
    expect(await proprietarioDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.proprietario.delete.question/);
    await proprietarioDeleteDialog.clickOnConfirmButton();

    await proprietarioComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await proprietarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
