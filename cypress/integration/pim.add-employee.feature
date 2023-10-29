# language: en
Feature: Adiciona funcionário na tabela
    Como um usuário logado eu quero adicionar um funcionário na tabela.

    Background: Acesso a página de funcionários
        Given que estou na página de funcionários

    @Positivo @SmokeTest
    Scenario: Adiciona funcionário na tabela
        When clico no botão de adicionar
        And é exibido o formulário de cadastro
        And preencho o formulário com os dados do funcionário
        And clico no botão de salvar
        Then o funcionário é adicionado na tabela

            """ TODO: Validar o ID """
    @Negativo @Regressivo
    Scenario Outline: Funcionario não é adicionado na tabela
        When clico no botão de adicionar
        And preencho o formulário com os dados do funcionário <firstName>, <middleName>, <lastName>
        And clico no botão de salvar
        But o funcionário não é adicionado na tabela
        Then é exibida a mensagem <mensagem>
        Examples:
            | mensagem                                          | firstName | middleName | lastName |
            | O campo 'firstName' e 'lastName' são obrigatórios |           | Teste2     |          |
            | O campo 'firstName' é obrigatório.                |           | Teste2     | Teste3   |
            | O campo 'lastName' é obrigatório.                 | Teste     | Teste2     |          |

