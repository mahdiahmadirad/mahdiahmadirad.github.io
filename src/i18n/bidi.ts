export interface LtrIsolationAttributes {
  dir: 'ltr';
  'data-bidi': 'ltr';
}

export function getLtrIsolationAttributes(): LtrIsolationAttributes {
  return {
    dir: 'ltr',
    'data-bidi': 'ltr',
  };
}
