# language: en
Feature: Login no site da OrangeHRM
    @Positivo @SmokeTest
    Scenario: Login bem-sucedido
        Given que estou na página de login
        When realizo o login com credenciais válidas
        Then login é efetuado com sucesso
    @Negativo @Regressivo
    Scenario Outline: Login sem sucesso: <mensagem>
        Given que estou na página de login
        When realizo o login com "<login>" e "<senha>"
        Then alerta de "<mensagem>" é exibido com sucesso
        Examples:
            | mensagem                      | login    | senha |
            | login incorreto               | username | senha |
            | não preenchimento do username |          | senha |
            | não preenchimento da senha    | username |       |