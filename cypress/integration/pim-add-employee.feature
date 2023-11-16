# language: en
Feature: Adicionar um funcionário
  Como um usuário logado
  Eu quero adicionar um novo funcionário na tabela.

  Background:
    Given Que estou logado no sistema
    And Na página para adicionar funcionários

  @Positivo
  Scenario: Verifica a adição de um funcionário com sucesso
    Given Que o formulário foi preenchido corretamente e enviado
    Then Os detalhes do funcionário são exibidos na página de detalhes
    And Uma mensagem de sucesso é exibida

  @Negativo
  Scenario Outline: Verifica a adição de um funcionário com falha: <message>
    Given Que o formulário foi preenchido com os dados "<firstName>", "<middleName>", "<lastName>" e enviado
    Then É exibida a mensagem "<message>"
    Examples:
      | message                         | firstName | middleName | lastName |
      | Campos vazios                   |           |            |          |
      | Não preenchimento do firstName  |           | Smith      | Doe      |
      | Não preenchimento do middleName | John      |            | Doe      |
      | Não preenchimento do lastName   | John      | Smith      |          |

