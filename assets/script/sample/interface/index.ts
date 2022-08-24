import { Director } from 'cc';

interface CocosDev {
  director?: Director;
}

declare global {
  interface Window {
    myGame?: CocosDev;
  }
}
