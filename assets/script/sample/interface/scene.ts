import { ASSET_KEY } from './../enum/asset';
import { BaseLoader } from './../../lib/classes/baseLoader';
import { Component, Node } from 'cc';

export interface PreloadSceneComponent<A = ASSET_KEY> extends Component {
  readonly assetLoader?: BaseLoader<A>;
  readonly preloadControl?: Node;
  goToTitleScene(): void;
}
