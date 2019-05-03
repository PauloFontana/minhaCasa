/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VisitaComponentsPage from './visita.page-object';
import { VisitaDeleteDialog } from './visita.page-object';
import VisitaUpdatePage from './visita-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Visita e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let visitaUpdatePage: VisitaUpdatePage;
  let visitaComponentsPage: VisitaComponentsPage;
  let visitaDeleteDialog: VisitaDeleteDialog;

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

  it('should load Visitas', async () => {
    await navBarPage.getEntityPage('visita');
    visitaComponentsPage = new VisitaComponentsPage();
    expect(await visitaComponentsPage.getTitle().getText()).to.match(/Visitas/);
  });

  it('should load create Visita page', async () => {
    await visitaComponentsPage.clickOnCreateButton();
    visitaUpdatePage = new VisitaUpdatePage();
    expect(await visitaUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.visita.home.createOrEditLabel/);
  });

  it('should create and save Visitas', async () => {
    const nbButtonsBeforeCreate = await visitaComponentsPage.countDeleteButtons();

    await visitaUpdatePage.setDataInput('01-01-2001');
    expect(await visitaUpdatePage.getDataInput()).to.eq('2001-01-01');
    await visitaUpdatePage.setAvaliacaoInput('avaliacao');
    expect(await visitaUpdatePage.getAvaliacaoInput()).to.match(/avaliacao/);
    await visitaUpdatePage.imovelSelectLastOption();
    await visitaUpdatePage.corretorSelectLastOption();
    await waitUntilDisplayed(visitaUpdatePage.getSaveButton());
    await visitaUpdatePage.save();
    await waitUntilHidden(visitaUpdatePage.getSaveButton());
    expect(await visitaUpdatePage.getSaveButton().isPresent()).to.be.false;

    await visitaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await visitaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Visita', async () => {
    await visitaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await visitaComponentsPage.countDeleteButtons();
    await visitaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    visitaDeleteDialog = new VisitaDeleteDialog();
    expect(await visitaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.visita.delete.question/);
    await visitaDeleteDialog.clickOnConfirmButton();

    await visitaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await visitaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
