# language: en
Feature: Login no site da OrangeHRM
  Testar se o login no site da OrangeHRM está funcionando corretamente
  Background:
    Given que estou na página de login

  @Positivo
  Scenario: Login bem-sucedido
    When realizo o login com credenciais válidas
    Then login é efetuado com sucesso

  @Negativo
  Scenario Outline: Login sem sucesso: <mensagem>
    When realizo o login com "<login>" e "<senha>"
    Then alerta de "<mensagem>" é exibido com sucesso
    Examples:
      | mensagem                      | login    | senha |
      | login incorreto               | username | senha |
      | não preenchimento do username |          | senha |
      | não preenchimento da senha    | username |       |
