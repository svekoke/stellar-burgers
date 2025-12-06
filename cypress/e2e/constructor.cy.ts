/// <reference types="cypress" />

const getConstructorSection = () => cy.get('main').find('section').eq(1);

const getConstructorItems = () =>
  getConstructorSection()
    .find('div.constructor-element')
    .not('.constructor-element_pos_top')
    .not('.constructor-element_pos_bottom');

describe('Конструктор бургера — интеграционные тесты', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('user');

    cy.visit('http://localhost:4000/');

    cy.wait('@ingredients');
    cy.wait('@user');
  });

  // КАТЕГОРИИ

  it('Отображаются категории ингредиентов', () => {
    cy.contains('Булки').should('exist');
    cy.contains('Соусы').should('exist');
    cy.contains('Начинки').should('exist');
  });

  // ДОБАВЛЕНИЕ БУЛКИ

  it('Добавление булки по клику', () => {
    cy.contains('Булки')
      .parents('section')
      .find('button:contains("Добавить")')
      .first()
      .click();

    cy.contains('(верх)').should('exist');
    cy.contains('(низ)').should('exist');

    getConstructorItems().should('have.length', 0);
  });

  // ДОБАВЛЕНИЕ ИНГРЕДИЕНТА

  it('Добавление ингредиента (соуса)', () => {
    cy.contains('Соусы')
      .parents('section')
      .find('button:contains("Добавить")')
      .first()
      .click();

    getConstructorItems().should('have.length', 1);
  });

  // УДАЛЕНИЕ ИНГРЕДИЕНТА

  it('Удаление ингредиента', () => {
    // БУЛКА
    cy.contains('Булки')
      .parents('section')
      .find('button:contains("Добавить")')
      .first()
      .click();

    // СОУС
    cy.contains('Соусы')
      .parents('section')
      .find('button:contains("Добавить")')
      .first()
      .click();

    getConstructorItems().should('have.length', 1);

    // УДАЛЕНИЕ
    getConstructorItems()
      .first()
      .find('.constructor-element__action')
      .click({ force: true });

    getConstructorItems().should('have.length', 0);
  });

  // ОТКРЫТИЕ ДЕТАЛЕЙ

  it('Открытие страницы ингредиента', () => {
    cy.contains('Булки').parents('section').find('a').first().click();

    cy.url().should('include', '/ingredients/');
  });

  // НЕАВТОРИЗАЦИЯ

  it('Неавторизованный user → редирект на /login', () => {
    cy.intercept('GET', '**/auth/user', { statusCode: 401 }).as('unauth');
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients2'
    );

    cy.visit('http://localhost:4000/');

    cy.wait('@ingredients2');
    cy.wait('@unauth');

    //  булка
    cy.contains('Булки')
      .parents('section')
      .find('button:contains("Добавить")')
      .first()
      .click();

    cy.contains('Оформить заказ').click();

    cy.url().should('include', '/login');
  });

  // СОЗДАНИЕ ЗАКАЗА

  it('Создание заказа — успешный сценарий', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'makeOrder'
    );

    // булкА
    cy.contains('Булки')
      .parents('section')
      .find('button:contains("Добавить")')
      .first()
      .click();

    // соус
    cy.contains('Соусы')
      .parents('section')
      .find('button:contains("Добавить")')
      .first()
      .click();

    getConstructorItems().should('have.length', 1);

    // Подтверждаем заказ
    cy.contains('Оформить заказ').click();
    cy.wait('@makeOrder');

    // Номер заказа
    cy.contains('12345').should('exist');

    cy.get('#modals button').first().click({ force: true });

    getConstructorItems().should('have.length', 0);
  });
});
