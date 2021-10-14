context('Authentification', () => {

    it('Login success', () => {
        cy.visit('/login');

        cy.get('[data-testid=input-mail]')
        .type('test.account@gmail.com');

        cy.get('[data-testid=input-password]')
        .type('Azerty123');

        cy.get('[data-testid=submit]').click();
    });

    it('Disconnection success', () => {
        
        cy.get('[data-testid=disconnect-btn]').click()
        cy.url().should('contain', '/login');

    });

    it('Login incorrect mail', () => {
        cy.visit('/login');

        cy.get('[data-testid=input-mail]')
        .type('xxx@gmail.com');

        cy.get('[data-testid=input-password]')
        .type('Azerty123');

        cy.get('[data-testid=submit]').click();

        cy.url().should('contain', '/login');

    });

    it('Login incorrect password', () => {
        cy.visit('/login');

        cy.get('[data-testid=input-mail]')
        .type('test.account@gmail.com');

        cy.get('[data-testid=input-password]')
        .type('Azerty1234');

        cy.get('[data-testid=submit]').click();

        cy.url().should('contain', '/login');

    });


  });