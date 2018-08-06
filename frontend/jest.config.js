module.exports = {
  'moduleNameMapper': {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|css|less)$': 'identity-obj-proxy',
    '^state(.*)$': '<rootDir>/src/state$1',
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '^src(.*)$': '<rootDir>/src$1',
    '^views(.*)$': '<rootDir>/src/views$1',
    '^components(.*)$': '<rootDir>/src/components$1',
  },
  'setupFiles': [
    './__tests__/setup/enzyme.setup.js',
    './__tests__/setup/browser.setup.js'
  ],
  'testPathIgnorePatterns': [
    '<rootDir>/__tests__/setup'
  ],
  // cfr. https://github.com/facebook/jest/issues/6769
  'testURL': "http://localhost/"
};