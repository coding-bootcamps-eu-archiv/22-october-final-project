// https://docs.cypress.io/api/table-of-contents

describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Visits the app root url", () => {
    cy.contains("li", "Roti");
    cy.contains("li", "Testeintrag");
  });

  it("Listelements title is alphabeticaly ordered", () => {
    cy.get("ul li div").eq(0);
    cy.get("ul li").eq(1).children().eq(0);
    cy.get("li:first").get("li:second");
  });
});
