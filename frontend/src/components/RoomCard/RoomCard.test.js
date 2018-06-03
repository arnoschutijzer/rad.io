test('It is hello world!', () => {
  expect('hello world!').toBe('hello world!');
});

test('It is failing', () => {
  expect('hello world!').toBe('not hello world!');
});