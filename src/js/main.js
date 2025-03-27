document.addEventListener('DOMContentLoaded', () => {
  (function (){
    const showContentBtn = document.querySelector('.card__show-more-btn');
    const contentWrap = document.querySelector('.card__content');

    showContentBtn.addEventListener('click', () => {
      contentWrap.classList.toggle('active-full-content');
    });
  })();
});
