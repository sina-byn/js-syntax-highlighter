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

const highlight = (input, codeBlock) => {
  const tokens = esprima.tokenize(input);

  for (const token of tokens) {
    const { type, value } = token;
    const tokenColor = tokenColors[type] || '#ffffff'; // * defaults to white

    const tokenEl = document.createElement('span');
    tokenEl.style.color = tokenColor;
    tokenEl.textContent = value;
    codeBlock.append(tokenEl);
  }
};

highlight('const x = 10;', document.querySelector('code pre'));
