const btnComment = document.querySelector('#btnComment');
const comment = document.querySelector('#comment');

btnComment.addEventListener('click', async function () {
  const postId = this.getAttribute('data-id');
  const commentText = comment.value;

  if (commentText == '') {
    alert('Digite um comentário');
    return;
  }

  try {
    const { data } = await axios.post('/comment', {
      postId,
      comment: commentText,
    });

    if (data === 'created') {
      Swal.fire(
        'Comentário cadastrado!',
        'Parabéns você fez um comentário',
        'success'
      );
      comment.value = '';
    }
  } catch (error) {
    if (error?.response?.data) {
      Swal.fire(
        'Ocorreu um erro!',
        'Ocorreu um erro ao cadastrar seu comentário, por favor tente novamente',
        'error'
      );
    }
  }
});
