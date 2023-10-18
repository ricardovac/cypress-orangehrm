/// <reference types="cypress" />
/// <reference types="cypress-if" />
import { fakerPT_BR } from "@faker-js/faker";

const userdata = {
  firstName: fakerPT_BR.person.firstName(),
  middleName: fakerPT_BR.person.middleName(),
  lastName: fakerPT_BR.person.lastName(),
};

beforeEach(() => {
  cy.login("Admin", "admin123");
  cy.get("a[href='/web/index.php/pim/viewPimModule']")
    .should("be.visible")
    .click();
  cy.url().should("include", "/pim/viewEmployeeList");
});

describe("PIM", () => {
  it("adiciona um funcionário", () => {
    cy.get("div[class='orangehrm-header-container'] > button")
      .contains("Add")
      .click();
    cy.get("input[type='file']").selectFile("cypress/fixtures/imagem.jpg", {
      force: true,
    });
    cy.get("input[name='firstName']").type(userdata.firstName);
    cy.get("input[name='middleName']").type(userdata.middleName);
    cy.get("input[name='lastName']").type(userdata.lastName);
    cy.get("button[type='submit']").click();

    // Validando o id do funcionário
    cy.get(".oxd-input-field-error-message")
      .if("contain", "Employee Id already exists")
      .get(".oxd-input.oxd-input--active.oxd-input--error")
      .clear()
      .type(Math.floor(Math.random() * 10000))
      .then(() => {
        cy.get("button[type='submit']").click();
      });

    // Validando os dados adicionados
    cy.url().should("include", "pim/viewPersonalDetails/empNumber/");
    cy.get("input[name='firstName']")
      .invoke("val")
      .should("eq", userdata.firstName);
    cy.get("input[name='middleName']")
      .invoke("val")
      .should("eq", userdata.middleName);
    cy.get("input[name='lastName']")
      .invoke("val")
      .should("eq", userdata.lastName);
    cy.get("button[type='submit']").first().click();

    // Validando toast de sucesso
    cy.get(".oxd-toast-container .oxd-toast--success").should("be.visible");
    cy.get(".oxd-toast-container .oxd-toast--success")
      .find(".oxd-text--toast-title")
      .should("have.text", "Success");
  });

  it("procura pelo funcionário adicionado", () => {
    cy.contains("label", "Employee Name")
      .should("be.visible")
      .then((label) => {
        const input = label.closest(".oxd-input-group").find("input");

        cy.wrap(input).type(userdata.firstName);
      });

    cy.intercept("GET", `/web/index.php/api/v2/pim/employees?nameOrId=*`).as(
      "searchEmployee",
    );
    cy.wait("@searchEmployee").its("response.statusCode").should("eq", 200);

    cy.get(".oxd-autocomplete-option")
      .should("be.visible")
      .if("contain", userdata.firstName + " " + userdata.middleName)
      .click();

    cy.get(".oxd-topbar-header").invoke("hide");
    cy.get("button[type='submit']").contains("Search").click();

    cy.get(".oxd-table-card")
      .find("[data-v-6c07a142]")
      .if("have.text")
      .contains(userdata.firstName + " " + userdata.middleName);
  });
});
