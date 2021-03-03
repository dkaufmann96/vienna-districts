/* eslint-disable no-unused-expressions */

const sizes = ["iphone-6", "iphone-x", "ipad-2", [1024, 768], [1920, 1080]];
sizes.forEach((size) => {
  context(`Quiz on size ${size} screen`, () => {
    before(() => {
      cy.cacheMapData();
    });
    beforeEach(() => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.restoreLocalStorage();
      cy.visit("localhost:8080");
      cy.get("[data-cy=map]").should("exist");
    });

    it(`The quiz-button is visible on size ${size} screen`, () => {
      cy.get("#map").should("be.visible");
      cy.get("[data-cy=quiz-button]").should("be.visible");
    });

    it(`Clicking the quiz-button starts the quiz on size ${size} screen`, () => {
      cy.get("[data-cy=quiz-button]").click();
      cy.get("[data-cy=quiz-map]").should("be.visible");
      cy.get("[data-cy=quiz-map] > #map").should(($map) => {
        expect($map).to.be.visible;
        expect($map).to.have.class("md:border-red-700");
        expect($map).to.have.class("md:border-8");
      });
      cy.get("[data-cy=quiz-overlay]").should(($quizOverlay) => {
        expect($quizOverlay).to.be.visible;
        expect($quizOverlay).to.contain("Wählen Sie den");
        expect($quizOverlay).to.contain("Bezirk");
        expect($quizOverlay).to.contain("aus!");
        expect($quizOverlay).to.contain("Punkte: 0");
      });
    });

    it(`Clicking the correct district highlights it green on size ${size} screen`, () => {
      cy.startQuiz();
      cy.get("[data-cy=quiz-overlay]")
        .should("be.visible")
        .should("have.attr", "data-attribute")
        .then(($data) => {
          const district = +$data;

          cy.get(`.district-${district}.leaflet-interactive`)
            .should("be.visible")
            .click({ force: true });

          cy.get(`.district-${district}.leaflet-interactive`)
            .should("be.visible")
            .should("have.attr", "fill")
            .should("to.equal", "#00cc00");
        });
    });

    it(`Clicking the incorrect district highlights it red on size ${size} screen`, () => {
      cy.startQuiz();
      cy.get("[data-cy=quiz-overlay]")
        .should("be.visible")
        .should("have.attr", "data-attribute")
        .then(($data) => {
          let district = +$data;
          district = district < 23 ? district + 1 : district - 1;

          cy.get(`.district-${district}.leaflet-interactive`)
            .should("be.visible")
            .click({ force: true });

          cy.get(`.district-${district}.leaflet-interactive`)
            .should("be.visible")
            .should("have.attr", "fill")
            .should("to.equal", "#ff0000");
        });
    });

    it(`Clicking the correct district when having a score of 0 increases the score to 1 on size ${size} screen`, () => {
      cy.startQuiz();
      cy.chooseCorrectDistrict();
      cy.get("[data-cy=quiz-overlay]").should("contain", "Punkte: 1");
    });

    it(`Clicking the incorrect district when having a score of 0 makes it stay at 0 on size ${size} screen`, () => {
      cy.startQuiz();
      cy.chooseIncorrectDistrict();
      cy.get("[data-cy=quiz-overlay]").should("contain", "Punkte: 0");
    });

    it(`Clicking the incorrect district when having a score of 2 decreases the score to 1 on size ${size} screen`, () => {
      cy.startQuiz();
      cy.chooseCorrectDistrict();
      cy.get("[data-cy=quiz-overlay]").should("contain", `Punkte: 1`);
      cy.chooseCorrectDistrict();
      cy.get("[data-cy=quiz-overlay]").should("contain", `Punkte: 2`);
      cy.chooseIncorrectDistrict();
      cy.get("[data-cy=quiz-overlay]").should("contain", "Punkte: 1");
    });

    it(`Clicking the incorrect district 10 times when having a score of 0 makes it stay at 0 on size ${size} screen`, () => {
      cy.startQuiz();
      const indexArray = Array.from({ length: 10 }, (v, k) => k + 1);

      cy.wrap(indexArray).each(() => {
        cy.chooseIncorrectDistrict();
        cy.get("[data-cy=quiz-overlay]").should("contain", `Punkte: 0`);
      });
      cy.get("[data-cy=quiz-overlay]").should("contain", "Punkte: 0");
    });

    it(`Choosing the correct district 10 times results in a score of 10 on size ${size} screen`, () => {
      cy.startQuiz();
      const indexArray = Array.from({ length: 10 }, (v, k) => k + 1);

      cy.wrap(indexArray).each((index) => {
        cy.chooseCorrectDistrict();
        cy.get("[data-cy=quiz-overlay]").should("contain", `Punkte: ${index}`);
      });
      cy.get("[data-cy=quiz-overlay]").should("contain", `Punkte: 10`);
    });

    it(`Choosing the correct district 30 times results in a score of 30 on size ${size} screen`, () => {
      cy.startQuiz();
      const indexArray = Array.from({ length: 30 }, (v, k) => k + 1);

      cy.wrap(indexArray).each((index) => {
        cy.chooseCorrectDistrict();
        cy.get("[data-cy=quiz-overlay]").should("contain", `Punkte: ${index}`);
      });
      cy.get("[data-cy=quiz-overlay]").should("contain", `Punkte: 30`);
    });

    it(`Choosing the correct district 100 times results in a score of 100 on size ${size} screen`, () => {
      cy.startQuiz();
      const indexArray = Array.from({ length: 100 }, (v, k) => k + 1);

      cy.wrap(indexArray).each((index) => {
        cy.chooseCorrectDistrict();
        cy.get("[data-cy=quiz-overlay]").should("contain", `Punkte: ${index}`);
      });
      cy.get("[data-cy=quiz-overlay]").should("contain", `Punkte: 100`);
    });
  });
});
