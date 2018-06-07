// Import our top-level sass file.
import './styles/styles.scss';

import * as ID3 from 'id3-parser';
import { convertFileToBuffer } from 'id3-parser/lib/universal/helpers';
import Writer from 'browser-id3-writer';

const parseTag = file => convertFileToBuffer(file).then(ID3.parse);
const input = document.querySelector('#file');
const form = document.querySelector('form');
const fields = document.querySelector('.fields');

// Fields.
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const album = document.querySelector('#album');
const year = document.querySelector('#year');


input.addEventListener('change', e => {
  const file = e.target.files[0];
  fields.classList[file ? 'remove' : 'add']('dn');
  fields.querySelectorAll('input').forEach(input => input.value = '');
  if (!file) return;

  parseTag(file).then(tag => {
    [
      title,
      artist,
      album,
      year
    ].forEach(field => {
      const { id } = field;
      if (tag[id]) field.value = tag[id];
    });

    console.log(tag);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
});
