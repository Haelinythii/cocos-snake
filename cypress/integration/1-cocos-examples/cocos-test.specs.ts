/// <reference types="cypress" />
import { isLocalhost } from './../../../assets/script/sample/util/integration';
import { gameFixtures } from '../../support/constant';

// hack fix error
if (isLocalhost) {
  console.log(gameFixtures);
}

describe('test', () => {
  describe('Opening', () => {
    it('Open the game', () => {
      cy.openGameLocal();
    });
  });

  describe('wait loading', () => {
    it('waiting game complete', () => {
      cy.waitGameLoader();
    });
  });

  describe('go to title scene', () => {
    it('go to title scene', () => {
      cy.goToTitleScene();
    });
  });
});
