it("should validate delete item functionality", ()=>{

    cy.visit("http://localhost:3000/")
    
    // submit the form using username and password
    cy.get('input[type=text]').type("manager");
    cy.get('input[type=password]').type("password{enter}");

    // check for the main container
    cy.get(".main-container").should('exist');

    cy.server();
    cy.route('DELETE', '/api/hotel/*').as('delete');

    // click the settings icon and click on Delete option
    cy.get('.hotel-tile')
    .first()
    .then(($div) => {
        cy.get('.tile-settings')
        .within((el) => {
            cy.get('.settings')
            .first()
            .click();

            cy.get('#Delete').click();
            cy.scrollTo('top');
        });
    });
    cy.get('#modal-container').should('exist');
    
    // click on delete confirmation button
    cy.get('.confirm-delete-item').should('exist');
    cy.get('.confirm-delete-item').click();
    
    cy.wait('@delete');
    cy.get('@delete').then((xhr) => {
        expect(xhr.status).to.eq(200);
    })

});