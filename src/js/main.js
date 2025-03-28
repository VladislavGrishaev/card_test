document.addEventListener("DOMContentLoaded", function() {
  function toggleTextContent(contentWrapper, textContent, toggleButton) {
    if (!textContent || !toggleButton || !contentWrapper) return;

    const stylesContent = window.getComputedStyle(textContent);
    const parseLineHeight = parseFloat(stylesContent.lineHeight);
    const collapsedHeight = parseLineHeight * 5;

    textContent.style.maxHeight = collapsedHeight + "px";

    let expanded = false;

    toggleButton.addEventListener("click", function() {
      if (!expanded) {
        textContent.style.maxHeight = textContent.scrollHeight + "px";
        contentWrapper.classList.add('active-full-content');
      } else {
        textContent.style.maxHeight = collapsedHeight + "px";
        contentWrapper.classList.remove('active-full-content');
      }
      expanded = !expanded;
    });
  }

  const textBlock = document.querySelector(".card__text-content");
  const button = document.querySelector(".card__show-more-btn");
  const contentWrap = document.querySelector(".card__content");

  toggleTextContent(contentWrap, textBlock, button);
});
