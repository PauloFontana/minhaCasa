/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MinutaComponentsPage from './minuta.page-object';
import { MinutaDeleteDialog } from './minuta.page-object';
import MinutaUpdatePage from './minuta-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Minuta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let minutaUpdatePage: MinutaUpdatePage;
  let minutaComponentsPage: MinutaComponentsPage;
  let minutaDeleteDialog: MinutaDeleteDialog;

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

  it('should load Minutas', async () => {
    await navBarPage.getEntityPage('minuta');
    minutaComponentsPage = new MinutaComponentsPage();
    expect(await minutaComponentsPage.getTitle().getText()).to.match(/Minutas/);
  });

  it('should load create Minuta page', async () => {
    await minutaComponentsPage.clickOnCreateButton();
    minutaUpdatePage = new MinutaUpdatePage();
    expect(await minutaUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.minuta.home.createOrEditLabel/);
  });

  it('should create and save Minutas', async () => {
    const nbButtonsBeforeCreate = await minutaComponentsPage.countDeleteButtons();

    await minutaUpdatePage.setConteudoInput('conteudo');
    expect(await minutaUpdatePage.getConteudoInput()).to.match(/conteudo/);
    await minutaUpdatePage.imovelSelectLastOption();
    await minutaUpdatePage.proprietarioSelectLastOption();
    await minutaUpdatePage.compradorSelectLastOption();
    await waitUntilDisplayed(minutaUpdatePage.getSaveButton());
    await minutaUpdatePage.save();
    await waitUntilHidden(minutaUpdatePage.getSaveButton());
    expect(await minutaUpdatePage.getSaveButton().isPresent()).to.be.false;

    await minutaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await minutaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Minuta', async () => {
    await minutaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await minutaComponentsPage.countDeleteButtons();
    await minutaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    minutaDeleteDialog = new MinutaDeleteDialog();
    expect(await minutaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.minuta.delete.question/);
    await minutaDeleteDialog.clickOnConfirmButton();

    await minutaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await minutaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
