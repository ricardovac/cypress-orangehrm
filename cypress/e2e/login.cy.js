import { login } from "../support/commands";

const email = "Admin";
const password = "admin123";

const errorMessages = {
  invalidCredentials: "Invalid credentials",
  required: "Required",
};

describe("login page and logout", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login", () => {
    login(email, password);
    cy.url().should("include", "/dashboard/index");
  });

  it("should reset password", () => {
    cy.get(".orangehrm-login-forgot-header").should("be.visible").click();
    cy.get("input[name='username']").type("Admin");
    cy.get("button[type='submit']").click();
  });

  it("should not login with invalid credentials", () => {
    login("INVALID", "INVALID");

    cy.get(".orangehrm-login-error")
      .should("be.visible")
      .within(() => {
        cy.get(".oxd-alert-content-text").should(
          "have.text",
          errorMessages.invalidCredentials,
        );
      });
  });

  it("should not login with empty credentials", () => {
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-input-field-error-message.oxd-input-group__message")
      .should("be.visible")
      .should("have.length", 2)
      .should("contain", errorMessages.required);
  });

  it("should logout", () => {
    login(email, password);
    cy.intercept(
      "GET",
      "/web/index.php/api/v2/dashboard/employees/locations",
    ).as("getEmployees");
    cy.wait("@getEmployees").its("response.statusCode").should("eq", 200);

    cy.get("[class='oxd-userdropdown-img']").should("be.visible").click();
    cy.get("[class='oxd-userdropdown-link']").contains("Logout").click();
  });
});
