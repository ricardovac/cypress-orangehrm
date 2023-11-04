import {
  And,
  When,
  Then,
  Before,
  Given,
} from "cypress-cucumber-preprocessor/steps";
import PimSearchEmployeePage from "../pages/pim.search-employee.page";

const pimSearchEmployeePage = new PimSearchEmployeePage();

let firstName;
let lastName;

/* Background */
Before(() => cy.login());

Given(/^Que estou na página de busca de funcionários$/, () => {
  pimSearchEmployeePage.openEmployeesPage();
});

/*
 * Scenario: Busca um funcionário que existe
 */
When(/^Um funcionário é buscado pelo nome e sobrenome$/, () => {
  cy.get(
    "div.oxd-table-card:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)"
  ).then(($el) => {
    const name = $el.text();
    firstName = name.split(" ")[0];
    lastName = name.split(" ")[1];
    pimSearchEmployeePage.searchEmployee(firstName, lastName);
  });
});

And(/^Espera o autocomplete carregar e clica no botão Search$/, () => {
  pimSearchEmployeePage.waitAutoCompleteAndSearchEmployee(firstName);
});

Then(/^O sistema deve retornar o funcionário buscado na tabela$/, () => {
  pimSearchEmployeePage.validateEmployeeInTable(firstName, lastName);
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
