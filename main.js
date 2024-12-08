import * as esprima from 'esprima';

import './style.css';

const tokenColors = {
  Boolean: '#5653ff',
  Identifier: '#FD4C87',
  Keyword: '#F78C6C',
  Null: '#F78C6C',
  Numeric: '#F78C6C',
  Punctuator: '#89DDFF',
  String: '#C3E88D',
  RegularExpression: '#89DDFF',
  Template: '#C3E88D',
};

const appendTextNode = (text, codeBlock) => {
  if (text.length === 0) return;
  codeBlock.append(document.createTextNode(text));
};

const highlight = (input, codeBlock) => {
  const tokens = esprima.tokenize(input, { range: true });
  const initialWhitespace = /(?:\s|\n)*/.exec(input)[0];

  appendTextNode(initialWhitespace, codeBlock);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const { type, value, range } = token;
    const [_, rangeEnd] = range;

    const tokenColor = tokenColors[type] || '#ffffff'; // * defaults to white

    const tokenEl = document.createElement('span');
    tokenEl.style.color = tokenColor;
    tokenEl.textContent = value;
    codeBlock.append(tokenEl);

    const nextToken = tokens[i + 1];
    if (!nextToken) break;

    const { range: nextTokenRange } = nextToken;
    const [nextRangeStart] = nextTokenRange;
    const midWhitespace = input.slice(rangeEnd, nextRangeStart);

    appendTextNode(midWhitespace, codeBlock);
  }

  const lastToken = tokens.at(-1);
  const [_, lastRangeEnd] = lastToken.range;
  const endWhitespace = input.slice(lastRangeEnd);

  appendTextNode(endWhitespace, codeBlock);
};

highlight('const x = 10;\nconst y = 11;', document.querySelector('code pre'));
