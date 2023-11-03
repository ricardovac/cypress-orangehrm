import { And, Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import PimSearchEmployeePage from "../pages/pim.search-employee.page";

const pimSearchEmployeePage = new PimSearchEmployeePage();

/*
 * Background
 */
Given(/^Que estou logado no sistema$/, () => {
  cy.login();
});

And(/^Na página de busca de funcionários$/, () => {
  pimSearchEmployeePage.openEmployeesPage();
});

/*
 * Scenario: Busca um funcionário que existe
 */
When(/^Um funcionário é buscado pelo nome e sobrenome$/, () => {
  pimSearchEmployeePage.searchEmployee("John", "Smith");
});

And(/^Espera o autocomplete carregar e clica no botão Search$/, () => {
  pimSearchEmployeePage.waitAutoCompleteAndSearchEmployee("John");
});

Then(/^O sistema deve retornar o funcionário buscado na tabela$/, () => {
  pimSearchEmployeePage.validateEmployeeInTable("John", "Smith");
});

/*
 * Scenario Outline: Busca um funcionário que não existe
 */
When(
  /^Um funcionário é buscado com o nome "([^"]*)" e sobrenome "([^"]*)"$/,
  (firstName, lastName) => {
    pimSearchEmployeePage.searchEmployee(firstName, lastName);
  }
);

And(/^Clica no botão Search$/, () => {
  pimSearchEmployeePage.clickOnSearchButton();
});

Then(/^O sistema deve retornar a mensagem "([^"]*)" na tela$/, (message) => {
  pimSearchEmployeePage.validateNoRecordsMessage(message);
});
