
describe("Test EtoE for Add item", () => {
    
    it("should validate login/logout functionality", ()=>{
        // visit the page
        cy.visit("http://localhost:3005/")
    
        // submit the form using username and password
        cy.get('input[type=text]').type("elakya");
        cy.get('input[type=password]').type("elakya{enter}");
    
        // check for the main container
        cy.get(".main-container").should('exist');
    
        //logout from the account
        cy.get(".account-name").click();
        cy.get("#sign-out").click();
    
        //check if the login form appeared and the main container is not
        cy.get(".input-wrap").should('exist');
        cy.get(".main-container").should('not.exist');
    });
    
    
    it("should validate add item functionality", ()=>{
        
        // submit the form using username and password
        cy.get('input[type=text]').type("elakya");
        cy.get('input[type=password]').type("elakya{enter}");
    
        // check for the main container
        cy.get(".main-container").should('exist');
    
        // click the add item button to add an item
        cy.get(".add-item").click();
        
        // input only the name and click on save
        cy.get(".hotel-form")
        .find(".value-container")
        .first().type("HotelTestAddUsingCypress")
    });
})

