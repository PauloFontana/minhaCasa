/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ImovelComponentsPage from './imovel.page-object';
import { ImovelDeleteDialog } from './imovel.page-object';
import ImovelUpdatePage from './imovel-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Imovel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let imovelUpdatePage: ImovelUpdatePage;
  let imovelComponentsPage: ImovelComponentsPage;
  let imovelDeleteDialog: ImovelDeleteDialog;

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

  it('should load Imovels', async () => {
    await navBarPage.getEntityPage('imovel');
    imovelComponentsPage = new ImovelComponentsPage();
    expect(await imovelComponentsPage.getTitle().getText()).to.match(/Imovels/);
  });

  it('should load create Imovel page', async () => {
    await imovelComponentsPage.clickOnCreateButton();
    imovelUpdatePage = new ImovelUpdatePage();
    expect(await imovelUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.imovel.home.createOrEditLabel/);
  });

  it('should create and save Imovels', async () => {
    const nbButtonsBeforeCreate = await imovelComponentsPage.countDeleteButtons();

    await imovelUpdatePage.setCategoriaInput('categoria');
    expect(await imovelUpdatePage.getCategoriaInput()).to.match(/categoria/);
    await imovelUpdatePage.setTipoInput('tipo');
    expect(await imovelUpdatePage.getTipoInput()).to.match(/tipo/);
    await imovelUpdatePage.setValorInput('5');
    expect(await imovelUpdatePage.getValorInput()).to.eq('5');
    await imovelUpdatePage.setAtributosInput('atributos');
    expect(await imovelUpdatePage.getAtributosInput()).to.match(/atributos/);
    await imovelUpdatePage.proprietarioSelectLastOption();
    await waitUntilDisplayed(imovelUpdatePage.getSaveButton());
    await imovelUpdatePage.save();
    await waitUntilHidden(imovelUpdatePage.getSaveButton());
    expect(await imovelUpdatePage.getSaveButton().isPresent()).to.be.false;

    await imovelComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await imovelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Imovel', async () => {
    await imovelComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await imovelComponentsPage.countDeleteButtons();
    await imovelComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    imovelDeleteDialog = new ImovelDeleteDialog();
    expect(await imovelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.imovel.delete.question/);
    await imovelDeleteDialog.clickOnConfirmButton();

    await imovelComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await imovelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
