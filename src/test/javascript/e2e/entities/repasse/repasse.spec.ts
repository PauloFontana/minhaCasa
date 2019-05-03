/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RepasseComponentsPage from './repasse.page-object';
import { RepasseDeleteDialog } from './repasse.page-object';
import RepasseUpdatePage from './repasse-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Repasse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let repasseUpdatePage: RepasseUpdatePage;
  let repasseComponentsPage: RepasseComponentsPage;
  let repasseDeleteDialog: RepasseDeleteDialog;

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

  it('should load Repasses', async () => {
    await navBarPage.getEntityPage('repasse');
    repasseComponentsPage = new RepasseComponentsPage();
    expect(await repasseComponentsPage.getTitle().getText()).to.match(/Repasses/);
  });

  it('should load create Repasse page', async () => {
    await repasseComponentsPage.clickOnCreateButton();
    repasseUpdatePage = new RepasseUpdatePage();
    expect(await repasseUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.repasse.home.createOrEditLabel/);
  });

  it('should create and save Repasses', async () => {
    const nbButtonsBeforeCreate = await repasseComponentsPage.countDeleteButtons();

    await repasseUpdatePage.setValorInput('5');
    expect(await repasseUpdatePage.getValorInput()).to.eq('5');
    await repasseUpdatePage.proprietarioSelectLastOption();
    await repasseUpdatePage.corretorSelectLastOption();
    await waitUntilDisplayed(repasseUpdatePage.getSaveButton());
    await repasseUpdatePage.save();
    await waitUntilHidden(repasseUpdatePage.getSaveButton());
    expect(await repasseUpdatePage.getSaveButton().isPresent()).to.be.false;

    await repasseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await repasseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Repasse', async () => {
    await repasseComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await repasseComponentsPage.countDeleteButtons();
    await repasseComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    repasseDeleteDialog = new RepasseDeleteDialog();
    expect(await repasseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.repasse.delete.question/);
    await repasseDeleteDialog.clickOnConfirmButton();

    await repasseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await repasseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
