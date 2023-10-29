import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import LoginPage from "../pages/login.page";
const loginPage = new LoginPage();

const name = "Admin";
const password = "admin123";

Given(/^que estou na página de login$/, () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  loginPage.validateLoginPage();
});

When(/^realizo o login com credenciais válidas$/, () => {
  loginPage.submitLogin(name, password);
});

Then(/^login é efetuado com sucesso$/, () => {
  loginPage.validateSuccessfulLogin();
});

When(/^realizo o login com "([^"]*)" e "([^"]*)"$/, (name, password) => {
  loginPage.submitLogin(name, password);
});

Then(/^alerta de "([^"]*)" é exibido com sucesso$/, (errorType) => {
  if (errorType === "login incorreto") {
    loginPage.validateErrorLoginAlert();
  } else {
    loginPage.validateSpanErrorRequired();
  }
});
