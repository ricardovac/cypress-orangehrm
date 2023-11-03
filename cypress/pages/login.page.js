import loginElements from "../elements/login.elements";

class LoginPage {
  validateLoginPage() {
    cy.url().should("include", "/auth/login");
    cy.get(loginElements.loginImage).should("be.visible");
  }

  submitLogin(username, password) {
    if (username) cy.get(loginElements.usernameInput).type(username);
    if (password) cy.get(loginElements.passwordInput).type(password);

    cy.get(loginElements.loginSubmitButton).click();
  }

  validateSuccessfulLogin() {
    cy.url().should("include", "/dashboard/index");
    cy.getCookie("orangehrm").should("exist");
    cy.get(loginElements.successfulLoginImage).should("be.visible");
  }

  validateErrorLoginAlert() {
    cy.get(loginElements.loginErrorAlert).should(
      "have.text",
      "Invalid credentials"
    );
  }

  validateSpanErrorRequired() {
    cy.get(loginElements.requiredLabel).contains("Required");
  }
}

export default LoginPage;
