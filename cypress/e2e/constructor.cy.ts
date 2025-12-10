/// <reference types="cypress" />

const getConstructorItems = () => cy.get('[data-cy="constructor-item"]');

describe('Конструктор бургера — интеграционные тесты', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('user');

    cy.visit('/');
    cy.wait('@ingredients');
    cy.wait('@user');
  });

  // --- существующие тесты ---
  it('Отображаются категории ингредиентов', () => {
    cy.get('[data-cy="bun-ingredients"]').should('exist');
    cy.get('[data-cy="main-ingredients"]').should('exist');
    cy.get('[data-cy="sauce-ingredients"]').should('exist');
  });

  it('Добавление булки по клику', () => {
    cy.get('[data-cy="bun-ingredients"]')
      .find('button:contains("Добавить")')
      .first()
      .click();
    cy.contains('(верх)').should('exist');
    cy.contains('(низ)').should('exist');
    getConstructorItems().should('have.length', 0);
  });

  it('Добавление ингредиента (соуса)', () => {
    cy.get('[data-cy="sauce-ingredients"]')
      .find('button:contains("Добавить")')
      .first()
      .click();
    getConstructorItems().should('have.length', 1);
  });

  it('Удаление ингредиента', () => {
    cy.get('[data-cy="bun-ingredients"]')
      .find('button:contains("Добавить")')
      .first()
      .click();
    cy.get('[data-cy="sauce-ingredients"]')
      .find('button:contains("Добавить")')
      .first()
      .click();

    getConstructorItems().should('have.length', 1);

    getConstructorItems()
      .first()
      .find('.constructor-element__action svg')
      .click({ force: true });

    getConstructorItems().should('have.length', 0);
  });

  it('Открытие страницы ингредиента', () => {
    cy.get('[data-cy="bun-ingredients"]').find('a').first().click();
    cy.url().should('include', '/ingredients/');
  });

  it('Неавторизованный user → редирект на /login', () => {
    cy.intercept('GET', '**/auth/user', { statusCode: 401 }).as('unauth');
    cy.visit('/');
    cy.wait('@unauth');

    cy.get('[data-cy="bun-ingredients"]')
      .find('button:contains("Добавить")')
      .first()
      .click();
    cy.contains('Оформить заказ').click();

    cy.url().should('include', '/login');
  });

  it('Создание заказа — успешный сценарий', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'makeOrder'
    );

    cy.get('[data-cy="bun-ingredients"]')
      .find('button:contains("Добавить")')
      .first()
      .click();
    cy.get('[data-cy="sauce-ingredients"]')
      .find('button:contains("Добавить")')
      .first()
      .click();

    getConstructorItems().should('have.length', 1);

    cy.contains('Оформить заказ').click();
    cy.wait('@makeOrder');

    cy.contains('12345').should('exist');

    cy.get('[aria-label="close-modal"]').click({ force: true });

    getConstructorItems().should('have.length', 0);
  });

  // --- НОВЫЕ ДВА ТЕСТА (вставлены внутрь describe!) ---

  it('Добавляем ингредиент — проверяем что выбранный ингредиент добавился', () => {
    cy.get('[data-cy="sauce-ingredients"]')
      .find('[data-cy="ingredient-card"]')
      .first()
      .as('card');

    cy.get('@card')
      .find('p.text_type_main-default')
      .invoke('text')
      .then((t) => t.trim())
      .as('ingredientName');

    cy.get('@card').find('button').contains('Добавить').click();

    cy.get('@ingredientName').then((name) => {
      cy.get('[data-cy="constructor-item"]')
        .last()
        .should('contain.text', name);
    });
  });

  it('Модалка показывает данные выбранного ингредиента', () => {
    cy.get('[data-cy="ingredient-card"]').first().as('card');

    cy.get('@card')
      .find('a p.text_type_main-default')
      .invoke('text')
      .as('ingredientName');

    cy.get('@card').find('a img').invoke('attr', 'src').as('ingredientImage');

    cy.get('@card').find('[data-cy="ingredient-link"]').click();

    cy.get('@ingredientName').then((name) => {
      cy.get('[data-cy="modal-ingredient-name"]').should('have.text', name);
    });

    cy.get('[data-cy="modal-ingredient-image"]').should('exist');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });
});
