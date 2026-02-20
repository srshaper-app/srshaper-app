export type BoardOutlineOption = {
  label: string;
  price_cents: number;
  preview_image?: string;
  outline_image?: string;
};

export type BoardModelConfig = {
  slug: string;
  name: string;
  image: string;
  outlineOptions: BoardOutlineOption[];
  measures: string[];
};

export const BOARD_MODELS: Record<string, BoardModelConfig> = {
  princess: {
    slug: 'princess',
    name: 'Princess',
    image: '/photos/models/princess/princess-front.jpg',
    outlineOptions: [
      { label: 'Round', price_cents: 45000, preview_image: '/photos/models/princess/princess-front.jpg' },
      { label: 'Roundpin', price_cents: 45000, preview_image: '/photos/models/princess/princess-back.jpg' },
    ],
    measures: [
      `5'5" x 19" x 2 1/4" Round`,
      `5'8" x 18" x 2 3/8" Roundpin`,
      `5'8" x 19.5" x 2 3/8" Round`,
      `5'11" x 18.5" x 2 3/8" Roundpin`,
      `5'11" x 20" x 2 3/8" Round`,
      `6'2" x 19" x 2 3/8" Roundpin`,
      `6'2" x 20" x 2 1/2" Round`,
      `6'5" x 19.5" x 2 1/2" Roundpin`,
    ],
  },
  gentleman: {
    slug: 'gentleman',
    name: 'Gentleman',
    image: '/photos/models/gentleman/wider-squash.jpg',
    outlineOptions: [
      {
        label: 'Wider Squash',
        price_cents: 43000,
        preview_image: '/photos/models/gentleman/wider-squash.jpg',
        outline_image: '/photos/models/gentleman/outline-wider-squash.png',
      },
      {
        label: 'Bump Squash',
        price_cents: 43000,
        preview_image: '/photos/models/gentleman/bump-squash.jpg',
        outline_image: '/photos/models/gentleman/outline-bump-squash.png',
      },
      {
        label: 'Squash',
        price_cents: 45000,
        preview_image: '/photos/models/gentleman/squash.jpg',
        outline_image: '/photos/models/gentleman/outline-squash.png',
      },
    ],
    measures: [
      `5'5" x 19" x 2 1/4" Wider squash`,
      `5'7" x 18.5" x 2 1/2" Bump squash`,
      `5'8" x 18" x 2 3/8" Squash`,
      `5'8"x19.5" x 2 3/8" Wider squash`,
      `5'10" x 19" x 2 3/8" Bump squash`,
      `5'11" x 18.5" x 2 3/8" Squash`,
      `5'11" x 20" x 2 1/2" Wider squash`,
      `6'1" x 19.5" x 2 1/2" Bump squash`,
      `6'2" x 19" x 2 3/8" Squash`,
      `6'2 x 20.5" x 2 1/2" Wider squash`,
    ],
  },
  gangster: {
    slug: 'gangster',
    name: 'Gangster',
    image: '/models/gangster.png',
    outlineOptions: [
      { label: 'Retro Bonzer', price_cents: 56000 },
      { label: 'Single', price_cents: 48000 },
    ],
    measures: [
      `5'4" x 19.25" x 2 1/2" Single`,
      `5'6" x 19.25" x 2 5/8" Retro bonzer`,
      `5'8" x 19.75" x 2 1/2" Single`,
      `6'0" x 20" x 2 5/8" Retro bonzer`,
      `6'0" x 20.75" x 2 5/8" Single`,
      `6'4" x 20.75" x 2 5/8" Single`,
      `6'6" x 20.75" x 2 5/8" Retro bonzer`,
      `7'0" x 21.50" x 2 5/8" Retro bonzer`,
    ],
  },
  'shark-attack': {
    slug: 'shark-attack',
    name: 'Shark Attack',
    image: '/photos/models/shark-attack/retro-twinzer.jpg',
    outlineOptions: [
      {
        label: 'Retro Twinzer',
        price_cents: 55000,
        preview_image: '/photos/models/shark-attack/retro-twinzer.jpg',
        outline_image: '/photos/models/shark-attack/outline-retro-twinzer.png',
      },
      {
        label: 'Quad',
        price_cents: 50000,
        preview_image: '/photos/models/shark-attack/retro-twinzer.jpg',
        outline_image: '/photos/models/shark-attack/outline-quad.png',
      },
    ],
    measures: [
      `5'4" x 20" x 2 1/2" Retro Twinzer`,
      `5'6" x 20" x 2 1/2" Quad`,
      `5'7" x 20.5" x 2 1/2" Retro Twinzer`,
      `5'9" x 20.5" x 2 1/2" Quad`,
      `5'10" x 21" x 2 5/8" Retro Twinzer`,
      `6'0" x 21" x 2 5/8" Quad`,
      `6'1" x 21.5" x 2 3/4" Retro Twinzer`,
      `6'3" x 21.5" x 2 3/4" Quad`,
    ],
  },
};
