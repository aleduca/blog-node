const { default: Swal } = require('sweetalert2');
import axios from './helpers/http';
import {
  EXTENSION_ERROR,
  UPLOAD_USER_AVATAR_SUCCESS,
} from './helpers/constants';

const file = document.querySelector('#file');
const btnUpload = document.querySelector('#btn-upload');
const preview = document.querySelector('#preview');

// preview da imagem
file.addEventListener('change', function (event) {
  event.preventDefault();

  const reader = new FileReader();

  reader.onload = (e) => {
    preview.style.display = 'block';
    const splitName = this.files[0]['name']?.split('.');
    const extension = splitName[splitName.length - 1];

    if (!['png', 'jpeg', 'jpg'].includes(extension)) {
      Swal.fire('Ocorreu um erro', 'Extensão não aceita', 'error');
      return;
    }
    preview.setAttribute('src', e.target.result);
  };

  reader.readAsDataURL(this.files[0]);
});

// upload da imagem
btnUpload.addEventListener('click', async function (event) {
  try {
    event.preventDefault();

    if (preview.getAttribute('src') === '') {
      Swal.fire('Atenção', 'Escolha uma foto antes de fazer o upload', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file.files[0]);

    const { data } = await axios.post('/profile/image', formData);

    if (data === UPLOAD_USER_AVATAR_SUCCESS) {
      Swal.fire('Sucesso !', 'Upload feito com sucesso', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }

    console.log(data);
  } catch (error) {
    switch (error?.response?.data) {
      case EXTENSION_ERROR:
        Swal.fire('Atenção', 'Extensão não aceita', 'error');
        break;
    }
    console.log('error');
  }
});
