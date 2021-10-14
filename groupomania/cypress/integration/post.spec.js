context('Create post', () => {

    it('Create post with success', () => {

        // Login
        cy.visit('/login');

        cy.get('[data-testid=input-mail]')
        .type('test.account@gmail.com');

        cy.get('[data-testid=input-password]')
        .type('Azerty123');

        cy.get('[data-testid=submit]').click();

        /*****************/

        cy.get('[data-testid=accueil-btn-newPost]').click()

        cy.get('[data-testid=input-title]')
        .type('Ceci est un test')

        cy.get('[data-testid=input-description]')
        .type('Ceci est une description test')

        cy.get('[data-testid=submit]').click()


    });
  });