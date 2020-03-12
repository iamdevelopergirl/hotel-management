it("should validate edit item functionality", ()=>{

    let randomString = Math.random().toString(36).slice(2); 
    cy.visit("http://localhost:3000/")
    
    // submit the form using username and password
    cy.get('input[type=text]').type("manager");
    cy.get('input[type=password]').type("password{enter}");

    // check for the main container
    cy.get(".main-container").should('exist');


    // click the settings icon and click on edit option
    cy.get('.hotel-tile')
    .first()
    .then(($div) => {
        cy.get('.tile-settings')
        .within((el) => {
            cy.get('.settings')
            .first()
            .click();

            cy.get('#Edit').click();
            cy.scrollTo('top');
        });
    });
    cy.get('#modal-container').should('exist');
    cy.get('.hotel-name > .text-input > .value-container').should('exist')
    .then(($input) => {
        cy.get('.hotel-name > .text-input > .value-container')
        .clear()
        .type(randomString);
    });
    cy.get('.address-title > .text-input > .value-container').should('exist')
    .then(($input) => {
        cy.get('.address-title > .text-input > .value-container')
        .clear()
        .type("1234567");
    });
    cy.get('.save-button').click();
    
    // check whether the name edited is there 
    cy.get('.hotel-tile').first().click();
    cy.get('#modal-container').should('exist');
    cy.get('.hotel-name > .text-input > .value-container').should('exist')
    cy.get('.hotel-name > .text-input > .value-container')
    .invoke('val')
    .then(($text) => { 
        cy.log($text);
        expect($text).to.equal(randomString);
    });

    // click cancel as the clean up step
    cy.get('.cancel-button').click();
});