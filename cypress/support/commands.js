export function login(email, password) {
  cy.get('input[name="username"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
}

/*
 * Faz login na conta do usuário.
 * {String} email
 * {String} password
 */
Cypress.Commands.add("login", (email, password) => {
  cy.session(
    email,
    () => {
      login(email, password);
    },
    {
      cacheAcrossSpecs: true,
      validate: () => {
        return cy.getCookie("orangehrm").should("exist");
      },
    },
  );
});
