document.addEventListener('DOMContentLoaded', () => {
  (function (){
    const showContentBtn = document.querySelector('.card__show-more-btn')

    showContentBtn.addEventListener('click', () => {
      const content = document.querySelector('.card__content')
      content.classList.toggle('active-full-content')
    })
  })();
});







