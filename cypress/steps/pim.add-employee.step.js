import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";
import PimAddEmployeePage from "../pages/pim.add-employee.page";
import { fakerPT_BR } from "@faker-js/faker";

const pimAddEmployeePage = new PimAddEmployeePage();

const firstName = fakerPT_BR.person.firstName();
const middleName = fakerPT_BR.person.middleName();
const lastName = fakerPT_BR.person.lastName();

/*
 * Background
 */
Given(/^Que estou logado no sistema$/, () => {
  cy.login();
});

And(/^Na página para adicionar funcionários$/, () => {
  pimAddEmployeePage.openAddEmployeesPage();
});

/*
 * Scenario: Verifica a adição de um funcionário com sucesso
 */
Given(/^Que o formulário foi preenchido corretamente e enviado$/, () => {
  pimAddEmployeePage.addEmployee(firstName, middleName, lastName);
});

Then(/^Os detalhes do funcionário são exibidos na página de detalhes$/, () => {
  pimAddEmployeePage.validateEmployeeDetails(firstName, middleName, lastName);
});

And(/^Uma mensagem de sucesso é exibida$/, () => {
  pimAddEmployeePage.validateSuccessToast();
});

/*
 * Scenario Outline: Verifica a adição de um funcionário com falha
 */
Given(
  /^Que o formulário foi preenchido com os dados "([^"]*)", "([^"]*)", "([^"]*)" e enviado$/,
  (firstName, middleName, lastName) => {
    pimAddEmployeePage.addEmployee(firstName, middleName, lastName);
  }
);

Then(/^É exibida a mensagem "([^"]*)"$/, (message) => {
  pimAddEmployeePage.validateRequiredFields(message);
});
