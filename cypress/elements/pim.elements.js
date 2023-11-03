export default {
  // Elementos para adicionar funcionários
  addEmployeeButton: 'div[class="orangehrm-header-container"] > button',

  uploadEmployeeImage: 'input[type="file"]',
  employeeFirstName: 'input[name="firstName"]',
  employeeMiddleName: 'input[name="middleName"]',
  employeeLastName: 'input[name="lastName"]',
  employeeImage: 'img[class="employee-image"]',
  submitButton: 'button[type="submit"]',

  employeeIdErrorMessage: ".oxd-input-field-error-message",
  employeeIdInput:
    ".oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input",
  employeeMiddleNameInput: ":nth-child(2) > :nth-child(2) > .oxd-input",

  successToast: ".oxd-toast-container .oxd-toast--success",
  successToastTitle: ".oxd-text--toast-title",

  // Elementos para buscar funcionários
  inputGroup: ".oxd-input-group",
  autoCompleteOption: ".oxd-autocomplete-option",
  tobBarHeader: ".oxd-topbar-header",
  tableCard: ".oxd-table-card",
  tableCardNames: "[data-v-6c07a142]",
  noRecordsToast: "#oxd-toaster_1",
  noRecordsToastTitle: ".oxd-toast-content-text",
};
