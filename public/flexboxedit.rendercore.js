window.FlexboxEdit = window.FlexboxEdit || {};
window.FlexboxEdit.RenderCore = (() => {

  const rainbowColorsHex = [
    "hsl(0, 80%, 85%)",   // Light Red
    "hsl(60, 80%, 85%)",  // Light Yellow
    "hsl(120, 80%, 85%)", // Light Green
    "hsl(180, 80%, 85%)", // Light Cyan
    "hsl(240, 80%, 85%)", // Light Blue
    "hsl(300, 80%, 85%)", // Light Magenta
    "hsl(360, 80%, 85%)"  // Light Red (wraps around)
  ]

  const styleMap = [
    {key: "display",},
    {key: "flexDirection",},
    {key: "justifyContent",},
    {key: "justifySelf",},
    {key: "alignItems",},
    {key: "alignSelf",},
    {key: "flex",},
    {key: "gap",},
    {key: "padding",},
    {key: "margin",},
    {key: "width",},
    {key: "height",},
    {key: "minWidth",},
    {key: "minHeight",},
    {key: "maxWidth",},
    {key: "maxHeight",},
    {key: "position",},
    {key: "textAlign",},
    {key: "verticalAlign",},
    {key: "overflowX",},
    {key: "overflowY",},
    {key: "left",},
    {key: "top",},
    {key: "right",},
    {key: "bottom",},
  ]

  const attrMap = [
    {key: "id",},
    {key: "className", alias: "class", },
    {key: "attr",},
    {key: "dataset",},
  ]

  function __makeDom(box, isContainIndicators, toggleSelectBox, isProduction) {
    const dom = document.createElement('div');
    dom.innerHTML = `
      <div data-fbe-box>
      </div>
    `;

    const domBox = dom.querySelector('[data-fbe-box]');

    domBox.removeAttribute('data-fbe-box');
    domBox.box = box;

    if (isProduction) {
      return domBox;
    }

    domBox.setIsHighlighted = (boo) => {
      if (boo) {
        domBox.classList.add('highlighted');
      } else {
        domBox.classList.remove('highlighted');
      }
    }

    domBox.setBackgroundColor = (val) => {
      domBox.style.background = val || `initial`;
    }

    domBox.addEventListener('click', (e) => { 
      e.stopPropagation(); 
      toggleSelectBox(e, domBox.box); 
    })


    if (isContainIndicators) {
      const domContentLabel = document.createElement('div');
      domContentLabel.setAttribute('data-fbe-box-content-label', ``);
      domBox.append(domContentLabel);
      domBox.domContentLabel = domContentLabel;
    }

    return domBox;
  }


  const renderBox = (
    box, 
    boxParent, 
    domParent, 
    index, 
    level, 
    isContainIndicators = false,
    domBoxMapping,
    _isModeEditContent,
    _isModeEditLayout,
    _isToggleDisplayTagLabels,
    selectedBox,
    toggleSelectBox,
    isProduction = false,
  ) => {
    const isDomBoxExisting = (!isProduction) && (domBoxMapping.get(box) && domBoxMapping.get(box)[`isContainIndicators=${isContainIndicators}`]);
    const domBox = isDomBoxExisting ? domBoxMapping.get(box)[`isContainIndicators=${isContainIndicators}`] : __makeDom(box, isContainIndicators, toggleSelectBox, isProduction);

    if (domBoxMapping) {
      domBoxMapping.set(box, domBoxMapping.get(box) || {});
      domBoxMapping.get(box)[`isContainIndicators=${isContainIndicators}`] = domBox; 
    }

    if (domBox.box.style) {
      for (var i in styleMap) {
        const { key } = styleMap[i];

        if (domBox.box.style[key]) {
          domBox.style[key] = domBox.box.style[key] || ``;
        } else {
          domBox.style[key] = ``;
        }
      }
    }

    if (domBox.box.attr) {
      for (var i in attrMap) {
        const { key } = attrMap[i];

        if (domBox.box.attr[key]) {
          domBox.setAttribute(key, domBox.box.attr[key] || ``);
        } else {
          domBox.removeAttribute(key);
        }
      }
    }

    domBox.setAttribute(`data-fbe-box`, ``);

    if (level !== undefined) {
      domBox.setAttribute(`data-fbe-box-${box.name}-${level}-${index}`, ``);
    }

    if (isContainIndicators) {
      if (_isModeEditContent) {
        domBox.setBackgroundColor('');
      } else {
        if (level !== undefined) {
          domBox.setBackgroundColor(rainbowColorsHex[level % rainbowColorsHex.length]);
        }
      }

      domBox.setIsHighlighted(domBox.box === selectedBox);
      domBox.classList.add('box');

      if (_isModeEditLayout) {
        domBox.classList.add('is-edit-layout');
      } else {
        domBox.classList.remove('is-edit-layout');
      }

      if (_isModeEditLayout) {
        const innerHTML = (box.innerHTML || '').trim() || '';
        if (innerHTML) {
          if (domBox.shadowInnerHTML !== innerHTML) {
            domBox.shadowInnerHTML = innerHTML;
            domBox.innerHTML = innerHTML;
            domBox.prepend(domBox.domContentLabel);
          }
        } else {
          domBox.shadowInnerHTML = innerHTML;
          domBox.innerHTML = innerHTML;
          domBox.prepend(domBox.domContentLabel);
        }
      } else {
        const innerHTML = (box.innerHTML || '').trim() || '';
        if (domBox.shadowInnerHTML !== innerHTML) {
          domBox.shadowInnerHTML = innerHTML;
          domBox.innerHTML = innerHTML;
          domBox.prepend(domBox.domContentLabel);
        }
      }


      if (!_isToggleDisplayTagLabels) {
        domBox.domContentLabel.style.display = `none`;
      } else {
        if (level !== undefined) {
          domBox.domContentLabel.innerHTML = `<span style="position: initial; left: 5px; top: 5px;">data-fbe-box-${box.name}-${level}-${index}</span>`;
        }
        domBox.domContentLabel.style.display = ``;
      }



    } else {
      const innerHTML = (box.innerHTML || '').trim() || '';
      if (innerHTML) {
        domBox.shadowInnerHTML = innerHTML;
        domBox.innerHTML = innerHTML;
      } else {
        domBox.shadowInnerHTML = '';
        domBox.innerHTML = '';
      }
    }



    for (var k in box.children) {
      const childBox = box.children[k];
      renderBox(childBox, box, domBox, k, level !== undefined ? level + 1 : undefined, isContainIndicators,
        domBoxMapping, _isModeEditContent, _isModeEditLayout, _isToggleDisplayTagLabels, selectedBox, toggleSelectBox, isProduction,
      );
    }


    if (isContainIndicators) {
      if (domParent && domBox.parentElement !== domParent) {
        domParent.append(domBox);
      }
    } else if (domParent) {
      domParent.append(domBox);
    } else if (domBox.parentElement) {
      domBox.parentElement.append(domBox);
    }

    return domBox;
  }


  return {
    renderBox,
    styleMap,
  }
})();