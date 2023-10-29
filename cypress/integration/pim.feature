            """ TODO: Validar o ID """
Feature: Adiciona funcionário na tabela
    @Positivo @SmokeTest
    Scenario: Adiciona funcionário na tabela
        Given que estou na página de funcionários
        When clico no botão de adicionar
        And preencho o formulário com os dados do funcionário
        And clico no botão de salvar
        Then o funcionário é adicionado na tabela

    @Negativo @Regressivo
    Scenario Outline: Funcionario não é adicionado na tabela
        Given que estou na página de funcionários
        When clico no botão de adicionar
        And preencho o formulário com os dados do funcionário "<firstName>", "<middleName>", "<lastName>"
        And clico no botão de salvar
        Then o funcionário não é adicionado na tabela
        And é exibida a mensagem <mensagem>
        Examples:
            | firstName | middleName | lastName | mensagem                                           |
            |           | Teste2     |          | O campo 'firstName' e 'lastName' são obrigatórios. |
            |           | Teste2     | Teste3   | O campo 'firstName' é obrigatório.                 |
            | Teste     | Teste2     |          | O campo 'lastName' é obrigatório.                  |

