/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ImobiliariaComponentsPage from './imobiliaria.page-object';
import { ImobiliariaDeleteDialog } from './imobiliaria.page-object';
import ImobiliariaUpdatePage from './imobiliaria-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Imobiliaria e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let imobiliariaUpdatePage: ImobiliariaUpdatePage;
  let imobiliariaComponentsPage: ImobiliariaComponentsPage;
  let imobiliariaDeleteDialog: ImobiliariaDeleteDialog;

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

  it('should load Imobiliarias', async () => {
    await navBarPage.getEntityPage('imobiliaria');
    imobiliariaComponentsPage = new ImobiliariaComponentsPage();
    expect(await imobiliariaComponentsPage.getTitle().getText()).to.match(/Imobiliarias/);
  });

  it('should load create Imobiliaria page', async () => {
    await imobiliariaComponentsPage.clickOnCreateButton();
    imobiliariaUpdatePage = new ImobiliariaUpdatePage();
    expect(await imobiliariaUpdatePage.getPageTitle().getAttribute('id')).to.match(/minhaCasaApp.imobiliaria.home.createOrEditLabel/);
  });

  it('should create and save Imobiliarias', async () => {
    const nbButtonsBeforeCreate = await imobiliariaComponentsPage.countDeleteButtons();

    await imobiliariaUpdatePage.setLoginInput('login');
    expect(await imobiliariaUpdatePage.getLoginInput()).to.match(/login/);
    await imobiliariaUpdatePage.setPasswordInput('password');
    expect(await imobiliariaUpdatePage.getPasswordInput()).to.match(/password/);
    await imobiliariaUpdatePage.setNomeInput('nome');
    expect(await imobiliariaUpdatePage.getNomeInput()).to.match(/nome/);
    await imobiliariaUpdatePage.setCnpjInput('cnpj');
    expect(await imobiliariaUpdatePage.getCnpjInput()).to.match(/cnpj/);
    await imobiliariaUpdatePage.setEnderecoInput('endereco');
    expect(await imobiliariaUpdatePage.getEnderecoInput()).to.match(/endereco/);
    await imobiliariaUpdatePage.setTelefoneInput('telefone');
    expect(await imobiliariaUpdatePage.getTelefoneInput()).to.match(/telefone/);
    await waitUntilDisplayed(imobiliariaUpdatePage.getSaveButton());
    await imobiliariaUpdatePage.save();
    await waitUntilHidden(imobiliariaUpdatePage.getSaveButton());
    expect(await imobiliariaUpdatePage.getSaveButton().isPresent()).to.be.false;

    await imobiliariaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await imobiliariaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Imobiliaria', async () => {
    await imobiliariaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await imobiliariaComponentsPage.countDeleteButtons();
    await imobiliariaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    imobiliariaDeleteDialog = new ImobiliariaDeleteDialog();
    expect(await imobiliariaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhaCasaApp.imobiliaria.delete.question/);
    await imobiliariaDeleteDialog.clickOnConfirmButton();

    await imobiliariaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await imobiliariaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
