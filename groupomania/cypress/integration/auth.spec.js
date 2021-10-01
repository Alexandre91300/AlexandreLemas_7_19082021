context('Secure pages', () => {

    it('Home', () => {
        cy.visit('/');
        cy.url().should('contain', '/login');
    });

    it('NewPost', () => {
        cy.visit('/newPost');
        cy.url().should('contain', '/login');
    });

    it('ModifyPost', () => {
        cy.visit('/modifyPost');
        cy.url().should('contain', '/login');
    });

    it('Profil', () => {
        cy.visit('/profil');
        cy.url().should('contain', '/login');
    });
});