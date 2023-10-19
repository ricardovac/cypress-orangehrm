export function login(username, password) {
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
}

/*
 * {String} username
 * {String} password
 */
Cypress.Commands.add("login", (username, password) => {
  cy.session(
    username,
    () => {
      cy.visit("/");
      login(username, password);
    },
    {
      cacheAcrossSpecs: true,
      validate: () => {
        return cy.getCookie("orangehrm").should("exist");
      },
    },
  );
  cy.visit("/");
});
