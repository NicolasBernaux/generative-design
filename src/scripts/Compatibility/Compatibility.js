export const Compatibility = function() {
  this.isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;

};

Compatibility.prototype.addClass = function() {
  if (this.isSafari === true) {
    document.querySelector('body').classList.add('safari');
  }
};
