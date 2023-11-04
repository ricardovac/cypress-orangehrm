# language: en
Feature: Buscar um funcionário
  Como um usuário logado
  Eu quero buscar um funcionário no PIM

  Background:
    Given Que estou na página de busca de funcionários

  @Positivo
  Scenario: Busca um funcionário que existe
    When Um funcionário é buscado pelo nome e sobrenome
    And Espera o autocomplete carregar e clica no botão Search
    Then O sistema deve retornar o funcionário buscado na tabela

  @Negativo
  Scenario Outline: Busca um funcionário que não existe
    When Um funcionário é buscado com o nome "<firstName>" e sobrenome "<lastName>"
    And Clica no botão Search
    Then O sistema deve retornar a mensagem "<message>" na tela
    Examples:
      | message          | firstName | lastName    |
      | No Records Found | Nome      | Inexistente |