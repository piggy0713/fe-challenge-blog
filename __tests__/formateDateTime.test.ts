import formatDateTime from '@/lib/formateDateTime';

it('formats date and time correctly', () => {
  const date = '2022-01-01T12:00:00Z';
  const formattedDateTime = formatDateTime(date);
  expect(formattedDateTime).toBe('January 1, 2022');
});

it('formats date and time incorrectly', () => {
  const date = 'test date';
  const formattedDateTime = formatDateTime(date);
  expect(formattedDateTime).toBe('Invalid Date');
});
