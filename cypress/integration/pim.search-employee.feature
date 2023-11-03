# language: en
Feature: Buscar um funcionário
  Como um usuário logado
  Eu quero buscar um funcionário

  Background:
    Given Que estou logado no sistema
    And Na página de busca de funcionários

  @Positivo
  Scenario: Busca um funcionário que existe
    When Um funcionário é buscado pelo nome e sobrenome
    And Espera o autocomplete carregar e clica no botão Search
    Then O sistema deve retornar o funcionário buscado na tabela

  @Negativo
  Scenario Outline: Busca um funcionário que não existe
    When Um funcionário é buscado com o nome "<nome>" e sobrenome "<sobrenome>"
    And Clica no botão Search
    Then O sistema deve retornar a mensagem "<mensagem>" na tela
    Examples:
      | mensagem         | nome | sobrenome   |
      | No Records Found | Nome | Inexistente |


