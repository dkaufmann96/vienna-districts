import "cypress-localstorage-commands";

/* eslint-disable no-unused-expressions */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("cacheMapData", () => {
  cy.clearLocalStorageSnapshot();
  cy.intercept(
    "GET",
    " https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BEZIRKSGRENZEOGD&srsName=EPSG:4326&outputFormat=json",
    { fixture: "districts.json" }
  ).as("mapData");
  cy.visit("localhost:8080");
  cy.wait("@mapData").then((interception) => {
    cy.get("[data-cy=map]").should("exist");
    cy.setLocalStorage("districts", JSON.stringify(interception.response.body));
    cy.saveLocalStorage();
  });
});

Cypress.Commands.add("startQuiz", () => {
  cy.get("[data-cy=quiz-button]").click();
});
Cypress.Commands.add("chooseCorrectDistrict", () => {
  let district = null;
  cy.get("[data-cy=quiz-overlay]")
    .should("be.visible")
    .should("have.attr", "data-attribute")
    .then(($data) => {
      district = +$data;
      cy.get(`.district-${district}.leaflet-interactive`)
        .should("be.visible")
        .click({ force: true });
    });
});
Cypress.Commands.add("chooseIncorrectDistrict", () => {
  let district = null;
  cy.get("[data-cy=quiz-overlay]")
    .should("be.visible")
    .should("have.attr", "data-attribute")
    .then(($data) => {
      district = +$data;
      district = district < 23 ? district + 1 : district - 1;
      cy.get(`.district-${district}.leaflet-interactive`)
        .should("be.visible")
        .click({ force: true });
    });
});
