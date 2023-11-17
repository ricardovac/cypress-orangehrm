# Cypress OrangeHRM

[![Cypress](https://img.shields.io/badge/cypress-12.11.0-brightgreen)](https://www.cypress.io/)
[![Faker](https://img.shields.io/badge/faker-8.2.0-brightgreen)](https://www.npmjs.com/package/@faker-js/faker)
[![Multiple Cucumber HTML Reporter](https://img.shields.io/badge/multiple--cucumber--html--reporter-3.5.0-brightgreen)](https://www.npmjs.com/package/multiple-cucumber-html-reporter)
[![Cypress If](https://img.shields.io/badge/cypress--if-1.10.5-brightgreen)](https://www.npmjs.com/package/cypress-if)
[![Gherkin](https://img.shields.io/badge/gherkin-brightgreen)](https://cucumber.io/docs/gherkin/)
[![Cucumber](https://img.shields.io/badge/cucumber-brightgreen)](https://cucumber.io/)

Este projeto tem como objetivo a automação da OrangeHRM usando Cypress, Cucumber e Gherkin. O Cypress é uma ferramenta de teste de ponta a ponta, enquanto Cucumber e Gherkin são usados para facilitar a leitura e o entendimento dos testes, escrevendo-os em uma linguagem natural.

## Pré-requisitos

- Node.js instalado em sua máquina.
- Conhecimento básico de JavaScript e Cypress.

## Dependências

Este projeto utiliza várias dependências, incluindo:

- [cypress](https://www.cypress.io/): Para automação de testes de interface do usuário.
- [cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor): Para integrar o Cucumber com o Cypress.
- [cypress-if](https://github.com/bahmutov/cypress-if): Lógica condicional if-else para os testes condicionais.
- [@faker-js/faker](https://github.com/faker-js/faker): Para gerar dados de teste.
- [multiple-cucumber-html-reporter](https://www.npmjs.com/package/multiple-cucumber-html-reporter) e
  [cypress-multi-reporters](https://www.npmjs.com/package/cypress-multi-reporters): Para gerar relatórios de teste.

## Configuração

Para configurar o projeto, clone o repositório e instale as dependências:

```bash
git clone https://github.com/ricardovac/cypress-orangehrm.git
cd cypress-orangehrm
npm install
```

## Execução dos testes

Para executar os testes, você pode usar os seguintes comandos:

- Para abrir o Cypress:

```bash
npm run cy:open
```

- Para executar os testes e gerar o relatório:

```bash
npm run cy:run
```

- Para gerar o relatório de testes:

```bash
npm run report:merge
npm run report:generate
```

## Testes

Os testes estão escritos em Gherkin, uma linguagem que permite descrever o comportamento do software de forma fácil de entender. Por exemplo, aqui está um exemplo de um teste para adicionar um funcionário:

```gherkin
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
```

# Ver os Relatórios

O workflow do GitHub está configurado para gerar os relatórios de testes e publicá-los no GitHub Pages. Você pode acessar os relatórios na URL abaixo:

## [https://ricardovac.github.io/cypress-orangehrm/](https://ricardovac.github.io/cypress-orangehrm/)

