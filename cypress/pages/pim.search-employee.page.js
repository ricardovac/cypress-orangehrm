import pimElements from "../elements/pim.elements";

class PimSearchEmployeePage {
  openEmployeesPage() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList"
    );
  }

  searchEmployee(firstName, lastName) {
    // Escrevendo o nome do funcionário no campo de busca
    cy.contains("label", "Employee Name")
      .should("be.visible")
      .then((label) => {
        const input = label.closest(pimElements.inputGroup).find("input");

        cy.wrap(input).type(firstName + " " + lastName);
      });
  }

  waitAutoCompleteAndSearchEmployee(firstName) {
    // Esperando o autocomplete carregar e selecionando o funcionário
    cy.intercept("GET", `/web/index.php/api/v2/pim/employees?nameOrId=*`).as(
      "searchEmployee"
    );
    cy.wait("@searchEmployee").its("response.statusCode").should("eq", 200);
    cy.get(pimElements.autoCompleteOption)
      .should("be.visible")
      .if("contain", firstName)
      .click();

    this.clickOnSearchButton();
  }

  clickOnSearchButton() {
    cy.get(pimElements.tobBarHeader).invoke("hide");
    cy.get(pimElements.submitButton).contains("Search").click();
  }

  validateEmployeeInTable(firstName, lastName) {
    // Validando se o funcionário está na tabela
    cy.get(pimElements.tableCard)
      .find(pimElements.tableCardNames)
      .if("contain", firstName)
      .and("contain", lastName)
      .else()
      .log("Funcionário não encontrado");
  }

  validateNoRecordsMessage(message) {
    // Validando se a mensagem de nenhum registro encontrado é exibida
    cy.get(pimElements.noRecordsToast).should("be.visible");
    cy.get(pimElements.noRecordsToast)
      .find(pimElements.noRecordsToastTitle)
      .eq(1)
      .should("have.text", message);
  }
}

export default PimSearchEmployeePage;
