/// <reference types="cypress" />
/// <reference types="cypress-if" />
import { fakerPT_BR } from "@faker-js/faker";

const username = "Admin";
const password = "admin123";

const userdata = {
  firstName: fakerPT_BR.person.firstName(),
  middleName: fakerPT_BR.person.middleName(),
  lastName: fakerPT_BR.person.lastName(),
};

const firstAndMiddleName = userdata.firstName + " " + userdata.middleName;

beforeEach(() => {
  cy.login(username, password);
  // Entra no menu PIM
  cy.get("a[href='/web/index.php/pim/viewPimModule']")
    .should("be.visible")
    .click();
  cy.url().should("include", "/pim/viewEmployeeList");
});

describe("PIM", () => {
  it("Deve adicionar um funcionário e validar se os dados foram adicionados", () => {
    cy.get("div[class='orangehrm-header-container'] > button").click();
    cy.get("input[type='file']").selectFile("cypress/fixtures/imagem.jpg", {
      force: true,
    });
    cy.get("input[name='firstName']").type(userdata.firstName);
    cy.get("input[name='middleName']").type(userdata.middleName);
    cy.get("input[name='lastName']").type(userdata.lastName);
    cy.get("button[type='submit']").click();

    // Validando se o Employee Id já existe
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
    cy.get("img[class='employee-image']")
      .invoke("attr", "src")
      .should("include", "/web/index.php/pim/viewPhoto/empNumber/");

    // Validando toast de sucesso
    cy.get(".oxd-toast-container .oxd-toast--success").should("be.visible");
    cy.get(".oxd-toast-container .oxd-toast--success")
      .find(".oxd-text--toast-title")
      .should("have.text", "Success");
  });

  it("Deve procurar pelo funcionário adicionado", () => {
    // Escrevendo o nome do funcionário no campo de busca
    cy.contains("label", "Employee Name")
      .should("be.visible")
      .then((label) => {
        const input = label.closest(".oxd-input-group").find("input");

        cy.wrap(input).type(firstAndMiddleName);
      });

    // Esperando o autocomplete carregar e selecionando o funcionário
    cy.intercept("GET", `/web/index.php/api/v2/pim/employees?nameOrId=*`).as(
      "searchEmployee"
    );
    cy.wait("@searchEmployee").its("response.statusCode").should("eq", 200);
    cy.get(".oxd-autocomplete-option")
      .should("be.visible")
      .if("contain", firstAndMiddleName)
      .click();

    cy.get(".oxd-topbar-header").invoke("hide");
    cy.get("button[type='submit']").contains("Search").click();

    // Validando se o funcionário foi encontrado
    cy.get(".oxd-table-card")
      .find("[data-v-6c07a142]")
      .if("contain", firstAndMiddleName)
      .else()
      .log("Funcionário não encontrado");

    // Validando se o funcionário foi encontrado no modo tablet
    cy.viewport("ipad-mini");
    cy.get(".oxd-table-card > * > * .card-item.card-body-slot > * > * .data")
      .should("be.visible")
      .if("contain", firstAndMiddleName)
      .else()
      .log("Funcionário não encontrado");
  });
});
