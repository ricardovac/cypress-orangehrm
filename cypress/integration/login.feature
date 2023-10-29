# language: en
Feature: Login no site da OrangeHRM
    @Positivo @smokeTest
    Scenario: Login bem-sucedido
        Given que estou na página de login
        When realizo o login com credenciais válidas
        Then login é efetuado com sucesso
    @Negativo @regressivo
    Scenario Outline: Login sem sucesso: <testDescription>
        Given que estou na página de login
        When realizo o login com "<login>" e "<senha>"
        Then alerta de "<testDescription>" é exibido com sucesso
        Examples:
            | testDescription               | login    | senha |
            | login incorreto               | username | senha |
            | não preenchimento do username |          | senha |
            | não preenchimento da senha    | username |       |