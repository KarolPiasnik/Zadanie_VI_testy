

describe('Test page loading ', () => {
  it('Products page loads as default', () => {
    cy.visit('http://localhost:3000')

    cy.url().should('include', '/products/read')
  })

  it('Products page loads as default', () => {
    cy.visit('http://localhost:3000/products/read')

    cy.get("[data-test='go-to-basket-button']")
      .should("contain", "Go to basket")
    cy.get("[data-test='products-page-navigation']")
      .should("contain", "Products in basket:")
    cy.get("[data-test='product-list-table']").should("exist")
  })

  it('Basket page loads', () => {
    cy.visit('http://localhost:3000/basket')

    cy.url().should('include', '/basket')
  })

  it('Products page loads as default', () => {
    cy.visit('http://localhost:3000/basket')

    cy.get("[data-test='go-to-payment-button']")
      .should("contain", "Proceed to payment")
    cy.get("[data-test='basket-page-navigation']")
      .should("exist")
    cy.get("[data-test='back-to-products-button']")
      .should("contain", "Back")
  })

  it('Payment page loads', () => {
    cy.visit('http://localhost:3000/payments/create')

    cy.url().should('include', '/payments/create')
  })

  it('Payment page loads', () => {
    cy.visit('http://localhost:3000/payments/create')

    cy.get("[data-test='finalize-payment-button']")
      .should("contain", "Finalize payment")
    cy.get("[data-test='payment-table']")
      .should("exist")
    cy.get("[data-test='payment-page-header']")
      .should("exist")
    cy.get("[data-test='back-to-basket-button']")
      .should("contain", "Back to basket")
  })
})

describe('Test page transitions', () => {
  it('Moving from products page to basket page works', () => {
    cy.visit('http://localhost:3000/products/read')

    cy.get("[data-test='go-to-basket-button']").click()

    cy.url().should('include', '/basket')
  })

  it('Moving from basket page to product page works', () => {
    cy.visit('http://localhost:3000/basket')

    cy.get("[data-test='back-to-products-button']").click()

    cy.url().should('include', '/products/read')
  })

  it('Moving from basket page to payment page works', () => {
    cy.visit('http://localhost:3000/basket')

    cy.get("[data-test='go-to-payment-button']").click()

    cy.url().should('include', '/payments/create')
  })

  it('Moving from payment page to basket page works', () => {
    cy.visit('http://localhost:3000/payments/create')

    cy.get("[data-test='back-to-basket-button']").click()

    cy.url().should('include', '/basket')
  })

  it('Cycling through all pages works', () => {
    cy.visit('http://localhost:3000/products/read')

    cy.get("[data-test='go-to-basket-button']").click()

    cy.url().should('include', '/basket')

    cy.get("[data-test='go-to-payment-button']").click()

    cy.url().should('include', '/payments/create')

    cy.get("[data-test='back-to-basket-button']").click()

    cy.url().should('include', '/basket')

    cy.get("[data-test='back-to-products-button']").click()

    cy.url().should('include', '/products/read')
  })
})

describe('Test basket', () => {

  it('Products list renders with 3 elements', () => {
    cy.intercept('GET', '/products', Cypress.env('productsRequest')).as('readProducts')

    cy.visit('http://localhost:3000')

    cy.get("[data-test='product-list-table']").find('tr').should('have.length', 4)
  })

  it('Basket count updates for one item in basket', () => {
    cy.intercept('GET', '/products', Cypress.env('productsRequest')).as('readProducts')

    cy.visit('http://localhost:3000')
    cy.get("[data-test='product-list-table']").contains('tr', 'parsley').find('button').click();
    cy.get("[data-test='products-page-navigation']").should('contain', 'Products in basket: 1')

  })

  it('Basket count updates for one item of each type in basket', () => {
    cy.intercept('GET', '/products', Cypress.env('productsRequest')).as('readProducts')

    cy.visit('http://localhost:3000')
    cy.get("[data-test='product-list-table']").contains('tr', 'parsley').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'tomato').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();

    cy.get("[data-test='products-page-navigation']").should('contain', 'Products in basket: 3')

  })

  it('Basket count updates for multiple items in basket', () => {
    cy.intercept('GET', '/products', Cypress.env('productsRequest')).as('readProducts')

    cy.visit('http://localhost:3000')
    cy.get("[data-test='product-list-table']").contains('tr', 'parsley').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();


    cy.get("[data-test='products-page-navigation']").should('contain', 'Products in basket: 4')

  })

  it('Removing from Basket works for one item in basket', () => {
    cy.intercept('GET', '/products', Cypress.env('productsRequest')).as('readProducts')

    cy.visit('http://localhost:3000')
    cy.get("[data-test='product-list-table']").contains('tr', 'parsley').find('button').click();

    //go to basket and remove
    cy.get("[data-test='go-to-basket-button']").click()
    //check if basket contents redered correctly
    cy.get("[data-test='basket-contents-table']").find('tr').should('have.length', 2)

    //remove item
    cy.get("[data-test='basket-contents-table']").contains('tr', 'parsley').find('button').click();

    //check if item was removed
    cy.get("[data-test='basket-contents-table']").find('tr').should('have.length', 1)
    cy.get("[data-test='basket-contents-table']").contains('tr', 'parsley').should('not.exist');

  })

  it('Removing from Basket works for one item of each type in basket', () => {
    cy.intercept('GET', '/products', Cypress.env('productsRequest')).as('readProducts')

    //add to basket
    cy.visit('http://localhost:3000')
    cy.get("[data-test='product-list-table']").contains('tr', 'parsley').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'tomato').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();

    //go to basket and remove
    cy.get("[data-test='go-to-basket-button']").click()
    //check if basket contents redered correctly
    cy.get("[data-test='basket-contents-table']").find('tr').should('have.length', 4)

    //remove item
    cy.get("[data-test='basket-contents-table']").contains('tr', 'watermelon').find('button').click();

    //check if item was removed
    cy.get("[data-test='basket-contents-table']").find('tr').should('have.length', 3)
    cy.get("[data-test='basket-contents-table']").contains('tr', 'watermelon').should('not.exist');

  })

  it('Removing from Basket works for multiple items in basket', () => {
    cy.intercept('GET', '/products', Cypress.env('productsRequest')).as('readProducts')

    cy.visit('http://localhost:3000')
    cy.get("[data-test='product-list-table']").contains('tr', 'parsley').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();


    //go to basket and remove
    cy.get("[data-test='go-to-basket-button']").click()
    //check if basket contents redered correctly
    cy.get("[data-test='basket-contents-table']").find('tr').should('have.length', 3)
    cy.get("[data-test='basket-contents-table']").contains('tr', 'watermelon').should('contain', "3");

    //remove item
    cy.get("[data-test='basket-contents-table']").contains('tr', 'watermelon').find('button').click();


    //check if item was removed
    cy.get("[data-test='basket-contents-table']").find('tr').should('have.length', 2)
    cy.get("[data-test='basket-contents-table']").contains('tr', 'watermelon').should('not.exist');



  })
})


describe('Test payment', () => {

  it('Payment details calculate correctly', () => {
    cy.intercept('GET', '/products', Cypress.env('productsRequest')).as('readProducts')

    cy.visit('http://localhost:3000')
    cy.get("[data-test='product-list-table']").contains('tr', 'parsley').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();


    //go to basket and then to payment
    cy.get("[data-test='go-to-basket-button']").click()
    cy.get("[data-test='go-to-payment-button']").click()

    //check if payment contents redered correctly with correct price
    cy.get("[data-test='payment-table']").find('tr').should('have.length', 2)
    cy.get("[data-test='payment-table']").contains('td', '130').should('exist');

  })

  it('Payment finalizes correctly', () => {
    cy.intercept('GET', '/products', Cypress.env('productsRequest')).as('readProducts')
    cy.intercept({
      method: 'POST',
      url: '/payments',
    }).as('apiCheck')

    cy.visit('http://localhost:3000')
    cy.get("[data-test='product-list-table']").contains('tr', 'parsley').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();
    cy.get("[data-test='product-list-table']").contains('tr', 'watermelon').find('button').click();


    //go to basket and then to payment and finalize payment
    cy.get("[data-test='go-to-basket-button']").click()
    cy.get("[data-test='go-to-payment-button']").click()
    cy.get("[data-test='finalize-payment-button']").click()

    //check if values set to 0
    cy.get("[data-test='payment-table']").find('td', '0').should('have.length', 2);
    //check response code
    cy.wait('@apiCheck').its('response.statusCode').should('eq', 200)


  })
})