/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CompradorComponentsPage from './comprador.page-object';
import { CompradorDeleteDialog } from './comprador.page-object';
import CompradorUpdatePage from './comprador-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Comprador e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let compradorUpdatePage: CompradorUpdatePage;
  let compradorComponentsPage: CompradorComponentsPage;
  let compradorDeleteDialog: CompradorDeleteDialog;

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

  it('should load Compradors', async () => {
    await navBarPage.getEntityPage('comprador');
    compradorComponentsPage = new CompradorComponentsPage();
    expect(await compradorComponentsPage.getTitle().getText()).to.match(/Compradors/);
  });

  it('should load create Comprador page', async () => {
    await compradorComponentsPage.clickOnCreateButton();
    compradorUpdatePage = new CompradorUpdatePage();
    expect(await compradorUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.comprador.home.createOrEditLabel/);
  });

  it('should create and save Compradors', async () => {
    const nbButtonsBeforeCreate = await compradorComponentsPage.countDeleteButtons();

    await compradorUpdatePage.setRendaInput('5');
    expect(await compradorUpdatePage.getRendaInput()).to.eq('5');
    await compradorUpdatePage.setGarantiasInput('garantias');
    expect(await compradorUpdatePage.getGarantiasInput()).to.match(/garantias/);
    await compradorUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(compradorUpdatePage.getSaveButton());
    await compradorUpdatePage.save();
    await waitUntilHidden(compradorUpdatePage.getSaveButton());
    expect(await compradorUpdatePage.getSaveButton().isPresent()).to.be.false;

    await compradorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await compradorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Comprador', async () => {
    await compradorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await compradorComponentsPage.countDeleteButtons();
    await compradorComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    compradorDeleteDialog = new CompradorDeleteDialog();
    expect(await compradorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.comprador.delete.question/);
    await compradorDeleteDialog.clickOnConfirmButton();

    await compradorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await compradorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
