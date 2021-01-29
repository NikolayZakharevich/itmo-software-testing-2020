/// <reference types="cypress" />

describe('Register page', () => {
    beforeEach(() => {
        cy.init();
    })

    it('Has label', () => {
        cy.visit("/register")
        cy.get('#authForm')
            .children()
            .first()
            .should('have.text', 'Register Below!')
    })

    it('Has login input', () => {
        cy.visit("/register")
        cy.get('#authForm')
            .children()
            .get('input')
            .eq(0)
            .should('be.visible')
            .should('be.empty')

    })

    it('Has password input', () => {
        cy.visit("/register")
        cy.get('#authForm')
            .children()
            .get('input')
            .eq(1)
            .should('be.visible')
            .should('be.empty')
    })

    it('Has no more children', () => {
        cy.visit("/register")
        cy.get('#authForm')
            .children()
            .its('length')
            .should('be.eq', 4)
    })
})


describe('Login page', () => {
    beforeEach(() => {
        cy.init();
    })

    it('Has label', () => {
        cy.visit("/login")
        cy.get('#authForm')
            .children()
            .first()
            .should('have.text', 'Login Below!')
    })

    it('Has login input', () => {
        cy.visit("/login")
        cy.get('#authForm')
            .children()
            .get('input')
            .eq(0)
            .should('be.visible')
            .should('be.empty')

    })

    it('Has password input', () => {
        cy.visit("/login")
        cy.get('#authForm')
            .children()
            .get('input')
            .eq(1)
            .should('be.visible')
            .should('be.empty')
    })

    it('Has no more children', () => {
        cy.visit("/login")
        cy.get('#authForm')
            .children()
            .its('length')
            .should('be.eq', 4)
    })
})

