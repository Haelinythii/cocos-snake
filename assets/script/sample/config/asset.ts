import { ASSET_TYPE } from '../../lib/enum/asset';
import { AssetConfig } from '../../lib/interface/asset';
import { ASSET_KEY } from '../enum/asset';

export function getAssets() {
  const assets = new Array<AssetConfig<ASSET_KEY>>();

  // Sprites
  assets.push({
    key: ASSET_KEY.TOMATO_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'sample/image/tomato',
  });
  assets.push({
    key: ASSET_KEY.WHITE_BOX_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'sample/image/white_box',
  });
  assets.push({
    key: ASSET_KEY.SOUND_ON_BUTTON_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'sprite_sound_on',
  });
  assets.push({
    key: ASSET_KEY.SOUND_OFF_BUTTON_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'sprite_sound_off',
  });
  assets.push({
    key: ASSET_KEY.BLACK_MAGE_SPRITE,
    type: ASSET_TYPE.SPRITESHEET,
    url: '',
    localUrl: 'sample/image/black_mage',
    config: {
      frameWidth: 86,
      frameHeight: 87,
      paddingX: 5,
      paddingY: 1,
    },
  });
  assets.push({
    key: ASSET_KEY.BACKGROUND_TILE_SPRITE,
    type: ASSET_TYPE.SPRITESHEET,
    url: '',
    localUrl: 'sprite_tile',
    config: {
      frameHeight: 48,
      frameWidth: 48,
    }
  });
  assets.push({
    key: ASSET_KEY.SHOPEE_ULAR_LOGO_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'logo_shopee_ular'
  });
  assets.push({
    key: ASSET_KEY.KEY_PAD,
    type: ASSET_TYPE.SPRITESHEET,
    url: '',
    localUrl: 'keypad',
    config: {
      frameHeight: 132,
      frameWidth: 137,
    }
  });
  assets.push({
    key: ASSET_KEY.APPLE_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'sprite_apple'
  });
  assets.push({
    key: ASSET_KEY.TROPHY_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'sprite_trophy'
  });
  assets.push({
    key: ASSET_KEY.SNAKE_SPRITE,
    type: ASSET_TYPE.SPRITESHEET,
    url: '',
    localUrl: 'spritesheet_round',
    config: {
      frameHeight: 96,
      frameWidth: 96.75,
    }
  });
  assets.push({
    key: ASSET_KEY.WALL_SPRITE,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'sprite_wall'
  });


  // Fonts
  assets.push({
    key: ASSET_KEY.SHOPEE_2021_BOLD_FONT,
    type: ASSET_TYPE.FONT,
    url: '',
    localUrl: 'sample/font/Shopee2021/Shopee2021-Bold',
  });

  // Music
  assets.push({
    key: ASSET_KEY.BG_MUSIC,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'bg-music',
  });
  assets.push({
    key: ASSET_KEY.BUTTON_SFX,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'button-sfx',
  });
  assets.push({
    key: ASSET_KEY.CRASH_AUDIO,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'crash',
  });
  assets.push({
    key: ASSET_KEY.EAT_AUDO,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'eat',
  });
  assets.push({
    key: ASSET_KEY.TURN_AUDIO,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'turn',
  });

  // Test No assets
  // assets.push({
  //   key: ASSET_KEY.SILENCE_SFX,
  //   type: ASSET_TYPE.AUDIO,
  //   url: '',
  //   localUrl: 'silence', // silence.mp3 is not present in the assets folder
  // });

  return assets;
}
