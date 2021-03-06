export default function EndTemplate(content, element) {
  element.innerHTML = `<div class="share-poppin">
  <a href="" onClick="location.href=location.href" class="share-poppin__replay">
    <img src="public/images/replay-arrow.svg" alt="replay">
  </a>
  <p class="title__questions mb-20">
    ${content.text}
  </p>
  <video src="${content.video}"  class="share-poppin__video" autoplay loop></video>
  <p class="txt-paragraph mb-20 mt-20">
    Share your result
  </p>
  <div class="share-poppin__socials share-btn" 
  data-url="${getUrl()}"
  data-title="Discover which symbiote suits you best"
  data-desc="${content.shareResult}">
    <a target="_blank" class="share-poppin__btn" data-id="fb">
                  <span class="share-poppin__btn__mask1">
                    <img class="share-poppin__icon" src="public/images/fb-b.svg" alt="facebook">
                  </span>
      <button class="share-poppin__btn__mask2 button--animationReverse">
        <img class="share-poppin__icon" src="public/images/fb-w.svg" alt="facebook">
      </button>
    </a>
    <a target="_blank" class="share-poppin__btn" data-id="tw">
                  <span class="share-poppin__btn__mask1">
                    <img class="share-poppin__icon" src="public/images/tw-b.svg" alt="Twitter">
                  </span>
      <button class="share-poppin__btn__mask2 button--animationReverse">
        <img class="share-poppin__icon" src="public/images/tw-w.svg" alt="Twitter">
      </button>
    </a>
    <a target="_blank" onclick="window.print();" class="share-poppin__btn" data-id="print">
                  <span class="share-poppin__btn__mask1">
                    <img class="share-poppin__icon" src="public/images/pr-b.svg" alt="print">
                  </span>
      <button class="share-poppin__btn__mask2 button--animationReverse">
        <img class="share-poppin__icon" src="public/images/pr-w.svg" alt="print">
      </button>
    </a>
  </div>
</div>`;
};

function getUrl() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "") {
    return 'http://google.com';
  }

  return window.location.href;
}
