import loginElements from "../elements/login.elements";

export function login(username, password) {
  cy.get(loginElements.usernameInput).type(username);
  cy.get(loginElements.passwordInput).type(password);
  cy.get(loginElements.loginSubmitButton).click();
}

/*
 * {String} username
 * {String} password
 */
Cypress.Commands.add("login", (username, password) => {
  cy.session(
    username,
    () => {
      login(username, password);
    },
    {
      cacheAcrossSpecs: true,
      validate: () => {
        return cy.getCookie("orangehrm").should("exist");
      },
    }
  );
});
