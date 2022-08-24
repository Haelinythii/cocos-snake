import { convertEnum, setAssetEnum } from '../../lib/util/asset';
import { Enum } from 'cc';

export enum ASSET_KEY {
  NONE,

  // Sprite
  WHITE_BOX_SPRITE,
  TOMATO_SPRITE,
  SOUND_ON_BUTTON_SPRITE,
  SOUND_OFF_BUTTON_SPRITE,
  BLACK_MAGE_SPRITE,
  BACKGROUND_TILE_SPRITE,
  SHOPEE_ULAR_LOGO_SPRITE,
  KEY_PAD,
  APPLE_SPRITE,
  TROPHY_SPRITE,
  SNAKE_SPRITE,
  WALL_SPRITE,

  // Font
  SHOPEE_2021_BOLD_FONT,

  // Audio
  BG_MUSIC,
  EAT_AUDO,
  CRASH_AUDIO,
  TURN_AUDIO,

  // AUDIO
  SILENCE_SFX,
  BUTTON_SFX,
}

// convert enum
convertEnum(ASSET_KEY);
setAssetEnum(ASSET_KEY);
Enum(ASSET_KEY);
