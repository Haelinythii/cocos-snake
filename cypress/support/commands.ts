/// <reference types="cypress" />
import { PreloadSceneComponent } from './../../assets/script/sample/interface/scene';

import { Director } from 'cc';
import { gameFixtures } from './constant';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      waitGameExist(timeout?: number): Cypress.Chainable<Subject>;
      openGameLocal(): Cypress.Chainable<Subject>;
      waitGameLoader(): Cypress.Chainable<Subject>;
      getDirector(): Cypress.Chainable<Director>;
      getPreloadScene(): Cypress.Chainable<PreloadSceneComponent | null>;
      goToTitleScene(): Cypress.Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('getDirector', () => {
  return cy
    .window()
    .its('myGame')
    .should('exist')
    .then((myGame) => {
      return cy.wrap(myGame).its('director').should('exist');
    });
});

Cypress.Commands.add('getPreloadScene', () => {
  cy.getDirector().then((director) => {
    const scene = director.getScene();
    if (!scene) return null;

    return scene.getComponentInChildren(
      'PreloadScene',
    ) as PreloadSceneComponent;
  });
});

Cypress.Commands.add('waitGameExist', (timeout?: number) => {});

Cypress.Commands.add('openGameLocal', () => {
  cy.fixture(gameFixtures).then((data) => {
    const { localGameLink } = data;
    cy.visit(localGameLink);

    cy.waitGameExist(3000);
  });

  return cy;
});

Cypress.Commands.add('waitGameLoader', () => {
  return cy.getPreloadScene().then((preload) => {
    return cy
      .wrap(preload)
      .its('assetLoader')
      .then((loader) => {
        return new Cypress.Promise((resolve) => {
          const interval = setInterval(() => {
            const progress = loader.getProgress();
            cy.log('Progress', progress);
            if (progress >= 1) {
              clearInterval(interval);
              resolve();
            }
          }, 1000);
        });
      });
  });
});

Cypress.Commands.add('goToTitleScene', () => {
  return cy.waitGameLoader().then(() => {
    return cy.getPreloadScene().then((preload) => {
      return preload?.goToTitleScene();
    });
  });
});
