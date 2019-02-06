import share_button from '../lib/share-button';

export const Share = function(element) {
  function getUrl() {
    if (window.location.href.indexOf('localhost')) {
      return 'http://google.com';
    }

    return window.location.href;
  }
  let container = document.createElement('div');
  container.classList.add('share-btn');
  container.setAttribute('data-url', getUrl());
  container.setAttribute('data-title','...');
  container.setAttribute('data-desc','...');

  const socials = {};

  socials.facebook = document.createElement('a');
  socials.facebook.classList.add('btn-facebook');
  socials.facebook.textContent = 'Facebook';
  socials.facebook.setAttribute('data-id', 'fb');

  socials.twitter = document.createElement('a');
  socials.twitter.classList.add('btn-twitter');
  socials.twitter.textContent = 'Twitter';
  socials.twitter.setAttribute('data-id', 'tw');

  socials.whatsApp = document.createElement('a');
  socials.whatsApp.classList.add('btn-whatsapp');
  socials.whatsApp.textContent = 'WhatsApp';
  socials.whatsApp.setAttribute('data-id', 'wa');

  socials.print = document.createElement('a');
  socials.print.classList.add('btn-print');
  socials.print.textContent = 'Print';
  socials.print.setAttribute('data-id', 'print');

  for (let key in socials) {
    container.appendChild(socials[key]);
  };
  element.appendChild(container);

  setTimeout(() => {
    share_button(window,document);
  },100);
};
