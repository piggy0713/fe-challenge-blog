import truncateString from '@/lib/truncateString';

describe('truncateString', () => {
  it('truncates a string correctly', () => {
    const str =
      'Etiam sed enim nibh. Vestibulum consequat et nunc a dapibus donec nec enim ante. Ut mauris leo, bibendum ac tempor non, dictum at lacus. Integer tristique nibh vel lacus congue facilisis';
    const truncatedStr = truncateString(str);
    expect(truncatedStr).toBe(
      'Etiam sed enim nibh. Vestibulum consequat et nunc a dapibus...',
    );
  });

  it('does not truncate a string if string have less than 10 words', () => {
    const str = 'Etiam sed enim nibh. Vestibulum consequat et a dapibus';
    const truncatedStr = truncateString(str);
    expect(truncatedStr).toBe(str);
  });
});
