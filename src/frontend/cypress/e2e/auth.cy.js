describe('Auth Tests', () => {
    it('should login successfully', () => {
        cy.visit('/login');

        cy.get('input[name=email]').type('test@example.com');
        cy.get('input[name=password]').type('mypassword');
        cy.get('button').contains('Login').click();

        cy.url().should('include', '/itinerary');
        cy.contains('Logout').should('be.visible');
    });
});
