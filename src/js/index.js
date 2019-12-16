import "../sass/index.scss";

class dinamicToolTip {
  constructor(tooltip) {
    this.tooltip = tooltip
  }
  
 showInfo (element) {
    let title = element.getAttribute("data-title");
    let description = element.getAttribute("data-description");
    let wrrpTitle = this.tooltip.getElementsByTagName('h3')[0];
    let wrrpDescription = this.tooltip.getElementsByTagName('h4')[0];
    wrrpTitle.innerHTML = title;
    wrrpDescription.innerHTML = description;
  }

  moveTooltip (element) {
    let toolTip = this.tooltip;
    let toolTipLeft = element.offsetLeft;
    let toolTipTop = element.offsetTop;
    let heightElement = element.offsetHeight;
    toolTip.style.left = `${toolTipLeft}px`
    toolTip.style.top = `${toolTipTop + heightElement}px`
    toolTip.style.display = `block`
  }


  closeTooltip() {
    let toolTip = this.tooltip;
    toolTip.style.display = `none`
  }
}



const closeButton = document.getElementById('close-tooltip');
let tooltip = document.getElementById('wrrp-id');
let NewTooltip = new dinamicToolTip(tooltip);

// NewTooltip.showInfo();

document.addEventListener('click', function(e) {
  e = e || window.event;
  let element = e.srcElement;
  if (element.className === 'info-tooltip') {
    NewTooltip.showInfo(e.srcElement);
    NewTooltip.moveTooltip(e.srcElement);
  }

}, false);

closeButton.addEventListener('click', function(e) {
  NewTooltip.closeTooltip();
}, false);




















