const { expect } = require("chai");

/* eslint-disable no-unused-expressions */
context("Map", () => {
  before(() => {
    cy.cacheMapData();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("localhost:8080");
    cy.get("[data-cy=map]").should("exist");
  });

  it("The map is visible", () => {
    cy.get("[data-cy=map]").should("be.visible");
  });

  it("The map-menu is visible", () => {
    cy.get("[data-cy=map-menu]").should("be.visible");
  });

  it("The map-overlay is visible", () => {
    cy.get("[data-cy=map-overlay]").should("be.visible");
    cy.get("[data-cy=map-overlay] > [data-cy=heading-container]").should(
      "be.visible"
    );
    cy.get(
      "[data-cy=map-overlay] > [data-cy=heading-container] > [data-cy=heading]"
    )
      .should("be.visible")
      .should(($heading) => {
        expect($heading.html()).to.contain("Wiener Bezirke");
      });
    cy.get(
      "[data-cy=map-overlay] > [data-cy=heading-container] > [data-cy=logo]"
    ).should("be.visible");
  });

  it("Hovering a district shows a tooltip containing its name and area", () => {
    cy.get(`.district-21.leaflet-interactive`)
      .should("be.visible")
      .trigger("mouseover");
    cy.get("[data-cy=map] * .leaflet-tooltip")
      .should("be.visible")
      .should(($tooltip) => {
        expect($tooltip.html()).to.contain("21., Floridsdorf");
        expect($tooltip.html()).to.contain("Fläche: 33650.34m²");
      });
  });

  it("Clicking a district shows a sidebar containing information about it", () => {
    cy.get("[data-cy=sidebar]").should("not.exist");
    cy.get(`.district-21.leaflet-interactive`)
      .should("be.visible")
      .click({ force: true });
    cy.get("[data-cy=sidebar]").should("be.visible");
    cy.get("[data-cy=sidebar-close]").should("be.visible");
    cy.get("[data-cy=sidebar-title]").should(($title) => {
      expect($title.html()).to.contain("21., Floridsdorf");
    });
    cy.get("[data-cy=sidebar-text]").should("be.visible");
    cy.get("[data-cy=sidebar-more-info]").should("be.visible");
    cy.get("[data-cy=sidebar-close]").click();
    cy.get("[data-cy=sidebar]").should("not.exist");
  });
});
