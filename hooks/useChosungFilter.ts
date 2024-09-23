import * as hangul from 'hangul-js';

const extractChosung = (text: string) => {
  const cho = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 44032;
    if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
    else result += text.charAt(i);
  }
  return result;
};

const compareChosung = (searchChosung: string, dataChosung: string) => {
  return dataChosung.includes(searchChosung);
};

const useChosungFilter = <T>(
  searchKeyword: string,
  items: T[],
  getSearchText: (item: T) => string
) => {
  if (!searchKeyword) return items;

  const searchResult = items.filter(item => {
    const targetText = getSearchText(item);

    const nameChosung = extractChosung(targetText);
    const chosungs = hangul.disassemble(searchKeyword).join('');

    return (
      compareChosung(chosungs, nameChosung) ||
      targetText.includes(searchKeyword)
    );
  });

  return searchResult;
};

export default useChosungFilter;
