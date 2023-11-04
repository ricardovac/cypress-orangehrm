import pimElements from "../elements/pim.elements";

class PimAddEmployeePage {
  openAddEmployeesPage() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList"
    );
    cy.get(pimElements.addEmployeeButton).click();
  }

  addEmployee(firstName, middleName, lastName) {
    // Adicionando um funcionário
    cy.get(pimElements.uploadEmployeeImage).selectFile(
      "cypress/fixtures/imagem.jpg",
      {
        force: true,
      }
    );
    if (firstName) cy.get(pimElements.employeeFirstName).type(firstName);
    if (middleName) cy.get(pimElements.employeeMiddleName).type(middleName);
    if (lastName) cy.get(pimElements.employeeLastName).type(lastName);
    cy.get(pimElements.submitButton).click();

    cy.get(pimElements.employeeIdErrorMessage)
      .if("contain", "Employee Id already exists")
      .get(pimElements.employeeIdInput)
      .clear()
      .type(Math.floor(Math.random() * 10000))
      .then(() => {
        cy.get("button[type='submit']").click();
      });
  }

  validateEmployeeDetails(firstName, middleName, lastName) {
    cy.url().should("include", "pim/viewPersonalDetails/empNumber/");
    cy.get(pimElements.employeeFirstName).invoke("val").should("eq", firstName);
    cy.get(pimElements.employeeMiddleName)
      .invoke("val")
      .should("eq", middleName);
    cy.get(pimElements.employeeLastName).invoke("val").should("eq", lastName);
    cy.get(pimElements.employeeImage)
      .invoke("attr", "src")
      .should("include", "/web/index.php/pim/viewPhoto/empNumber/");
    cy.get(pimElements.submitButton).first().click();
  }

  validateSuccessToast() {
    cy.get(pimElements.successToast).should("be.visible");
    cy.get(pimElements.successToast)
      .find(pimElements.successToastTitle)
      .should("have.text", "Success");
  }

  validateRequiredFields(message) {
    if (message === "Não preenchimento do middleName") {
      // O campo middleName não é obrigatório
      cy.get(pimElements.employeeMiddleNameInput).should(
        "not.include.class",
        pimElements.employeeIdErrorMessage
      );
    } else {
      // Valida as mensagens de erro dos campos obrigatórios
      cy.get(pimElements.employeeIdErrorMessage).each(($el) => {
        cy.wrap($el).should("be.visible").and("have.text", "Required");
      });
    }
  }
}

export default PimAddEmployeePage;
