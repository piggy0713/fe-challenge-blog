export default function truncateString(str: string ) {
  const maxWords = 10;
  const words = str.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }

  return str;

}