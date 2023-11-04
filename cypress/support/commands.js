import loginElements from "../elements/login.elements";

/*
 * {String} username
 * {String} password
 */
Cypress.Commands.add("login", () => {
  cy.session(
    "login",
    () => {
      Cypress.session.clearAllSavedSessions();
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );
      cy.get(loginElements.usernameInput).type("Admin");
      cy.get(loginElements.passwordInput).type("admin123");
      cy.get(loginElements.loginSubmitButton).click();
    },
    {
      cacheAcrossSpecs: true,
      validate: () => {
        return cy.getCookie("orangehrm").should("exist");
      },
    }
  );
});
