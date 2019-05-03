/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CorretorComponentsPage from './corretor.page-object';
import { CorretorDeleteDialog } from './corretor.page-object';
import CorretorUpdatePage from './corretor-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Corretor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let corretorUpdatePage: CorretorUpdatePage;
  let corretorComponentsPage: CorretorComponentsPage;
  let corretorDeleteDialog: CorretorDeleteDialog;

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

  it('should load Corretors', async () => {
    await navBarPage.getEntityPage('corretor');
    corretorComponentsPage = new CorretorComponentsPage();
    expect(await corretorComponentsPage.getTitle().getText()).to.match(/Corretors/);
  });

  it('should load create Corretor page', async () => {
    await corretorComponentsPage.clickOnCreateButton();
    corretorUpdatePage = new CorretorUpdatePage();
    expect(await corretorUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.corretor.home.createOrEditLabel/);
  });

  it('should create and save Corretors', async () => {
    const nbButtonsBeforeCreate = await corretorComponentsPage.countDeleteButtons();

    await corretorUpdatePage.setRegistroImobiliariaInput('registroImobiliaria');
    expect(await corretorUpdatePage.getRegistroImobiliariaInput()).to.match(/registroImobiliaria/);
    await corretorUpdatePage.setPasswordInput('password');
    expect(await corretorUpdatePage.getPasswordInput()).to.match(/password/);
    await corretorUpdatePage.setNumeroCreciInput('numeroCreci');
    expect(await corretorUpdatePage.getNumeroCreciInput()).to.match(/numeroCreci/);
    await corretorUpdatePage.setContaCorrenteInput('contaCorrente');
    expect(await corretorUpdatePage.getContaCorrenteInput()).to.match(/contaCorrente/);
    await corretorUpdatePage.imobiliariaSelectLastOption();
    await waitUntilDisplayed(corretorUpdatePage.getSaveButton());
    await corretorUpdatePage.save();
    await waitUntilHidden(corretorUpdatePage.getSaveButton());
    expect(await corretorUpdatePage.getSaveButton().isPresent()).to.be.false;

    await corretorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await corretorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Corretor', async () => {
    await corretorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await corretorComponentsPage.countDeleteButtons();
    await corretorComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    corretorDeleteDialog = new CorretorDeleteDialog();
    expect(await corretorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.corretor.delete.question/);
    await corretorDeleteDialog.clickOnConfirmButton();

    await corretorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await corretorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
