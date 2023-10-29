import loginElements from "../elements/login.elements";

class LoginPage {
  validateLoginPage() {
    cy.url().should("include", "/auth/login");
    cy.get(loginElements.loginImage).should("be.visible");
  }

  submitLogin(user, password) {
    if (user === "") cy.get(loginElements.usernameInput).clear();
    else cy.get(loginElements.usernameInput).type(user);
    if (password === "") cy.get(loginElements.passwordInput).clear();
    else cy.get(loginElements.passwordInput).type(password);

    cy.get(loginElements.loginSubmitButton).click();
  }

  validateSuccessfulLogin() {
    cy.url().should("include", "/dashboard/index");
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
