import { RETRY_STATUS } from './../../lib/enum/retry';
import { integrateGameToWindow } from './../util/integration';
import { ShopeeAudio } from './../classes/shopeeAudio';
import { ASSET_KEY } from './../enum/asset';
import { _decorator, Component, director, game, Node, EventHandler } from 'cc';
import { ASSET_LOADER_EVENT } from '../../lib/enum/assetLoader';
import { AssetLoadingUI } from '../object/loading/assetLoadingUI';
import { getAssets } from '../config/asset';
import { SCENE_KEY } from '../enum/scene';
const { ccclass, property } = _decorator;
import ShopeeWebBridge from 'db://shopee-web-bridge/shopeeWebBridge.js';
import { BaseLoader } from '../../lib/classes/baseLoader';
import { ShopeeSprite } from '../classes/shopeeSprite';
import {
  loadErrorPageBundle,
  showErrorPage,
} from '../../lib/util/errorPageWraper';
import { PreloadSceneComponent } from '../interface/scene';

@ccclass('PreloadScene')
export class PreloadScene extends Component implements PreloadSceneComponent {
  @property(BaseLoader)
  public readonly assetLoader?: BaseLoader<ASSET_KEY>;

  @property(AssetLoadingUI)
  public readonly assetLoadingUI?: AssetLoadingUI;

  @property(ShopeeAudio)
  public readonly backgroundMusic?: ShopeeAudio;

  @property(Node)
  public readonly preloadControl?: Node;

  private baseSprites = new Array<ShopeeSprite>();

  onLoad() {
    this.setupWebBridge();
    this.baseSprites = this.node.scene.getComponentsInChildren(ShopeeSprite);
  }

  private setupWebBridge() {
    const isWebBridgeReady = ShopeeWebBridge.instance.init();
    if (!isWebBridgeReady) return;

    ShopeeWebBridge.instance.configurePage({
      showNavbar: true,
      title: 'Cocos Boilerplate',
    });
  }

  async start() {
    try {
      await loadErrorPageBundle();
    } catch (error) {
      // nothing can do
      throw error;
    }
    
    integrateGameToWindow(director);
    this.startAssetsLoad();
  }

  private startAssetsLoad() {
    const { assetLoader } = this;

    assetLoader?.node.on(
      ASSET_LOADER_EVENT.START,
      this.onAssetLoaderStart,
      this,
    );
    assetLoader?.node.on(
      ASSET_LOADER_EVENT.ASSET_LOAD_SUCCESS,
      this.onAssetLoadSuccess,
      this,
    );
    assetLoader?.node.on(
      ASSET_LOADER_EVENT.ASSET_LOAD_FAILURE,
      this.onAssetFailure,
      this,
    );
    assetLoader?.node.on(
      ASSET_LOADER_EVENT.COMPLETE,
      this.onAssetLoaderComplete,
      this,
    );

    assetLoader?.startAssetsLoad(getAssets());
  }

  private onAssetLoaderStart(progress: number) {
    this.assetLoadingUI?.updateText(progress);
  }

  private onAssetLoadSuccess(progress: number, key: string) {
    this.assetLoadingUI?.updateText(progress, key);
    this.baseSprites?.forEach((sprite) => {
      sprite.reload();
    });
  }

  private async onAssetFailure(
    progress: number,
    key: string,
    url: string,
    status: RETRY_STATUS,
    e: Error | null,
  ) {
    if (status === RETRY_STATUS.FAILED) {
      await showErrorPage();
    }
  }

  private onAssetLoaderComplete(progress: number) {
    this.assetLoadingUI?.updateText(progress);
    this.onComplete();
  }

  private onComplete() {
    this.handleBackgroundMusic();
    this.preloadControl?.once(
      Node.EventType.TOUCH_END,
      this.goToTitleScene,
      this,
    );
  }

  public goToTitleScene() {
    director.loadScene(SCENE_KEY.TITLE);
  }

  private handleBackgroundMusic() {
    const { backgroundMusic } = this;
    if (!backgroundMusic) return;

    backgroundMusic.play();

    /** Add background music node as persist root node. */
    game.addPersistRootNode(backgroundMusic.node);
  }
}
