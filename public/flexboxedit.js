window.FlexboxEdit = (() => {
  const initialize = async () => {

    let onUpdateItem = null;
    let onUpdateItemMeta = null;

    const setOnUpdateItem = (callback) => {
      onUpdateItem = (isUpdate) => {
        callback({
          isUpdate,
          id: domInputItemmetaId.value,
          name: domInputItemmetaName.value,
          json: domDbg.value,
        });
      }
    }

    const setOnUpdateItemMeta = (callback) => {
      onUpdateItemMeta = (isUpdate) => {
        callback({
          isUpdate,
          id: domInputItemmetaId.value,
          name: domInputItemmetaName.value,
          json: domDbg.value,
        });
      }
    }

    const loadItem = (item) => {
      domInputItemmetaId.value = item.id || '';
      domInputItemmetaName.value = item.name || '';
      domDbg.value = item.json ? JSON.stringify(item.json) : '';
      doDbgReload();
    }

    const createNewItem = () => {
      domInputItemmetaId.value = '';
      domInputItemmetaName.value = '';
      domDbg.value = '';
      doDbgReload();
    }

    const domDbg = document.querySelector('[data-dbg]');
    const domResult = document.querySelector('[data-result]');
    const domEditorArea = document.querySelector('[domEditorArea]');
    const domEditorAreaHidden = document.querySelector('[domEditorAreaHidden]');

    const sel_display = document.querySelector('#display');
    const sel_flexDirection = document.querySelector('#flexDirection');
    const sel_justifyContent = document.querySelector('#justifyContent');
    const sel_justifySelf = document.querySelector('#justifySelf');
    const sel_alignItems = document.querySelector('#alignItems');
    const sel_alignSelf = document.querySelector('#alignSelf');
    const sel_flex = document.querySelector('#flex');
    const sel_gap = document.querySelector('#gap');
    const sel_padding = document.querySelector('#padding');
    const sel_margin = document.querySelector('#margin');
    const sel_width = document.querySelector('#width');
    const sel_height = document.querySelector('#height');
    const sel_minWidth = document.querySelector('#minWidth');
    const sel_minHeight = document.querySelector('#minHeight');
    const sel_maxWidth = document.querySelector('#maxWidth');
    const sel_maxHeight = document.querySelector('#maxHeight');
    const sel_position = document.querySelector('#position');
    const sel_textAlign = document.querySelector('#text-align');
    const sel_verticalAlign = document.querySelector('#vertical-align');
    const sel_overflowX = document.querySelector('#overflow-x');
    const sel_overflowY = document.querySelector('#overflow-y');
    const sel_left = document.querySelector('#left');
    const sel_top = document.querySelector('#top');
    const sel_right = document.querySelector('#right');
    const sel_bottom = document.querySelector('#bottom');

    const domBtnEditlayout = document.querySelector('[data-btn-editlayout]');
    const domBtnEditcontent = document.querySelector('[data-btn-editcontent]');
    const domBtnEdititeminnerhtml = document.querySelector('[data-btn-edititeminnerhtml]');
    const domBtnPreview = document.querySelector('[data-btn-preview]');

    const domHolderExplorer = document.querySelector('[data-holder-explorer]');
    const domHolderMain = document.querySelector('[data-holder-main]');

    const domExplorerItemlist = document.querySelector('[data-explorer-itemlist]');

    const domInputItemmetaName = document.querySelector('[data-input-itemmeta-name]');
    const domInputItemmetaId = document.querySelector('[data-input-itemmeta-id]');

    const domToolbarItemmeta = document.querySelector('[data-toolbar-itemmeta]');
    const domToolbarMenu = document.querySelector('[data-toolbar-menu]');
    const domToolbarEditLayout = document.querySelector('[data-toolbar-edit-layout]');
    const domToolbarEditContent = document.querySelector('[data-toolbar-edit-content]');

    const domToggleDisplaytaglabels = document.querySelector('[data-toggle-displaytaglabels]');

    const domBtnDbgCopy = document.querySelector('[data-btn-dbg-copy]');
    const domBtnDbgReload = document.querySelector('[data-btn-dbg-reload]');

    const domBtnDbgCopyHtml = document.querySelector('[data-btn-dbg-copy-html]');

    const domBtnOverlayEditorClose = document.querySelector('[data-btn-overlayeditorclose]');
    const domOverlayEditorHolder = document.querySelector('[data-overlay-editor-holder]');
    const domOverlayEditor = document.querySelector('[data-overlay-editor]');

    const domBtnOverlayPreviewClose = document.querySelector('[data-btn-overlaypreviewclose]');
    const domOverlayPreviewHolder = document.querySelector('[data-overlay-preview-holder]');
    const domOverlayPreview = document.querySelector('[data-overlay-preview]');

    const beautify = SimplyBeautiful(); // The script above exposes the global variable 'SimplyBeautiful'


    domHolderExplorer.append(domExplorerItemlist);

    domHolderMain.append(domEditorArea);
    domHolderMain.append(domEditorAreaHidden);
    domHolderMain.append(domToolbarItemmeta);
    domHolderMain.append(domToolbarMenu);
    domHolderMain.append(domToolbarEditLayout);

    const styleInputMap = [
      {input: sel_display, key: "display",},
      {input: sel_flexDirection, key: "flexDirection",},
      {input: sel_justifyContent, key: "justifyContent",},
      {input: sel_justifySelf, key: "justifySelf",},
      {input: sel_alignItems, key: "alignItems",},
      {input: sel_alignSelf, key: "alignSelf",},
      {input: sel_flex, key: "flex",},
      {input: sel_gap, key: "gap",},
      {input: sel_padding, key: "padding",},
      {input: sel_margin, key: "margin",},
      {input: sel_width, key: "width",},
      {input: sel_height, key: "height",},
      {input: sel_minWidth, key: "minWidth",},
      {input: sel_minHeight, key: "minHeight",},
      {input: sel_maxWidth, key: "maxWidth",},
      {input: sel_maxHeight, key: "maxHeight",},
      {input: sel_position, key: "position",},
      {input: sel_textAlign, key: "textAlign",},
      {input: sel_verticalAlign, key: "verticalAlign",},
      {input: sel_overflowX, key: "overflowX",},
      {input: sel_overflowY, key: "overflowY",},
      {input: sel_left, key: "left",},
      {input: sel_top, key: "top",},
      {input: sel_right, key: "right",},
      {input: sel_bottom, key: "bottom",},
    ]


    const onSummernoteChange = (contents, $editable) => {
      if (selectedBox) {
        selectedBox.innerHTML = contents;
        
        if (selectedBox.innerHTML.trim() === '<br>') {
          selectedBox.innerHTML = "";
        }

        __renderBox(selectedBox, null, null, undefined, undefined, true);
        __renderBox(selectedBox, null, null, undefined, undefined, false);

        __refreshExports();
        __refreshSettings();

        onUpdateItem && onUpdateItem(true);
      }
    }


    var _isModeEditLayout = true;
    var _isModeEditContent = false;
    var _isToggleDisplayTagLabels = domToggleDisplaytaglabels.checked;

    var domBoxMapping = new Map();





    const __createBox = ({name}) => {
      const box = {
        name: name,
        children: [],
        getParent: null,
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
      };

      __fulfillBoxMethods(box);

      return box;
    }


    const __fulfillBoxMethods = (box) => {

      box.addChild = (child, index) => {
        if (!child) {
          return;
        }

        if (index == null || index == undefined) {
          box.children.push(child);
        } else {
          box.children.splice(index, 0, child);
        }

        child.getParent = () => box;
      }

      box.removeChild = (child) => {
        const childIndex = box.children.indexOf(child);
        if (childIndex > -1) {
          box.children.splice(childIndex, 1);
        }
      }

      box.removeFromParent = () => {
        if (box.getParent) {
          box.getParent().removeChild(box);
          return true;
        }
        return false;
      }

      box.findAnySiblingOrParent = () => {
        if (box.getParent) {
          const childIndex = box.getParent().children.indexOf(box);

          if (childIndex > 0) {
            const prevSiblingIndex = childIndex - 1;
            return box.getParent().children[prevSiblingIndex];
          }

          if (childIndex + 1 < box.getParent().children.length) {
            const nextSiblingIndex = childIndex + 1;
            return box.getParent().children[nextSiblingIndex];
          }

          return box.getParent();
        }

        return null;
      }

      box.getIndexAsChild = () => {
        if (box.getParent) {
          const childIndex = box.getParent().children.indexOf(box);
          return childIndex;
        }

        return -1;
      }

      box.addToParent = (parent, index) => {
        box.removeFromParent();
        parent.addChild(box, index);
      }

      box.addBeforeBoxAsSibling = (sibling) => {
        const siblingIndex = sibling.getIndexAsChild();
        const siblingParent = sibling.getParent();
        if (!siblingParent) return;
        if (siblingIndex < 0) return;
        box.addToParent(siblingParent, siblingIndex);
      }

      box.addAfterBoxAsSibling = (sibling) => {
        const siblingIndex = sibling.getIndexAsChild();
        const siblingParent = sibling.getParent();
        if (!siblingParent) return;
        if (siblingIndex < 0) return;
        box.addToParent(siblingParent, siblingIndex + 1);
      }

      box.shiftUp = () => {
        const boxIndex = box.getIndexAsChild();
        const boxParent = box.getParent();
        const targetIndex = boxIndex - 1;
        if (!boxParent) return;
        if (targetIndex < 0) return;
        box.addToParent(boxParent, targetIndex);
      }

      box.shiftDown = () => {
        const boxIndex = box.getIndexAsChild();
        const boxParent = box.getParent();
        const targetIndex = boxIndex + 1;
        if (!boxParent) return;
        if (targetIndex < 0) return;
        if (boxParent.children.length <= targetIndex) return;
        box.addToParent(boxParent, targetIndex);
      }
    }





    const __selectBox = (box) => {
      selectedBox = box || rootBox;
    }

    const rootBox = __createBox({name: 'Root'});

    let selectedBox = rootBox;

    let cutSelectedBoxes = [];

    let copySelectedBoxes = [];




    ////////





    function toggleSelectBox(event, box) {
        event.stopPropagation(); // Prevent event from bubbling up

        if (selectedBox === box) {
          __selectBox();
        } else if (box) {
          __selectBox(box);
        } else {
          __selectBox();
        }

        renderBoxes();
    }







    const __refreshSettings = () => {
      for (var k in styleInputMap) {
        const {
          input,
          key,
        } = styleInputMap[k];

        input.value = ( (selectedBox?.style && selectedBox?.style[key]) !== undefined) ? selectedBox?.style[key] : "";
      }
    }




    function renderBoxes() {

      domToolbarEditLayout.style.display = "";
      domToolbarEditContent.style.display = "none";

      __renderBox(rootBox, null, domEditorArea, 0, 0, true);
      __renderBox(rootBox, null, domEditorAreaHidden, 0, 0, false);

      __refreshExports();
      __refreshSettings();
    }


    const __fulfillBox = (box) => {
      __fulfillBoxMethods(box);
      for (var k in (box.children || [])) {
        __fulfillBox(box.children[k]);
        box.children[k].getParent = () => box;
      }
    }


    const doDbgReload = () => {

      const newRootBox = domDbg.value ? JSON.parse(domDbg.value) : __createBox({name: 'Root'});


      for (var k in rootBox) {
        delete rootBox[k];
      }

      for (var k in newRootBox) {
        rootBox[k] = newRootBox[k];
      }

      __fulfillBox(rootBox);

      domEditorArea.innerHTML = '';
      domEditorAreaHidden.innerHTML = '';
      domBoxMapping.clear();

      setTimeout(() => {
        renderBoxes();
      }, 100);
    }


    const __refreshExports = () => {

      domDbg.value = `${JSON.stringify(rootBox)}`;
      domResult.value = `
<div data-rand-uuid-fbe="${domInputItemmetaId.value}">
  <style>
  [data-rand-uuid-fbe="${domInputItemmetaId.value}"] {
    display: flex;
    position: relative;
    box-sizing: border-box;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  [data-rand-uuid-fbe="${domInputItemmetaId.value}"] [data-fbe-box] {
    display: flex;
    position: relative;
    box-sizing: border-box;
  }
  </style>
${beautify.html(domEditorAreaHidden.innerHTML, {
  indent_size: 2,
}).split("\n").map((line) => { return "  " + line; }).join("\n")}
</div>
`;

    }


    function __renderBox(box, boxParent, domParent, index, level, isContainIndicators = false) {
      return FlexboxEdit.RenderCore.renderBox(box, boxParent, domParent, index, level, isContainIndicators,
        domBoxMapping,_isModeEditContent,_isModeEditLayout,_isToggleDisplayTagLabels, selectedBox, toggleSelectBox,
      );
    }





    document.getElementById('addItem').addEventListener('click', () => {
      addItem({});
    });

    document.getElementById('addItemBeforeSibling').addEventListener('click', () => {
      addItem({beforeSelectionAsSibling: true,});
    });

    document.getElementById('addItemAfterSibling').addEventListener('click', () => {
      addItem({afterSelectionAsSibling: true,});
    });

    document.getElementById('removeItem').addEventListener('click', () => {
      removeItem();
    });

    document.getElementById('moveItemCut').addEventListener('click', () => {
      moveItem({cut: true,});
    });

    document.getElementById('moveItemCopy').addEventListener('click', () => {
      moveItem({copy: true,});
    });

    document.getElementById('moveItemPaste').addEventListener('click', () => {
      moveItem({paste: true,});
    });

    document.getElementById('moveItemToBefore').addEventListener('click', () => {
      moveItem({shiftUp: true,});
    });

    document.getElementById('moveItemToAfter').addEventListener('click', () => {
      moveItem({shiftDown: true,});
    });



    function addItem({
      beforeSelectionAsSibling,
      afterSelectionAsSibling,
    }) {
      const box = __createBox({name: "C"});
      if (beforeSelectionAsSibling) {
        box.addBeforeBoxAsSibling(selectedBox);
      } else if (afterSelectionAsSibling) {
        box.addAfterBoxAsSibling(selectedBox);
      } else {
        box.addToParent(selectedBox);
      }
      renderBoxes();

      onUpdateItem && onUpdateItem(true);
    }

    function removeItem() {
      const siblingOrParentBox = selectedBox.findAnySiblingOrParent();

      if (selectedBox.removeFromParent()) {
        const domBundle = domBoxMapping.get(selectedBox);
        for (var key in domBundle) {
          domBundle[key].remove();
        }
        domBoxMapping.delete(selectedBox);
      }

      selectedBox = siblingOrParentBox;

      renderBoxes();

      onUpdateItem && onUpdateItem(true);
    }

    function moveItem({
      cut,
      copy,
      paste,
      shiftUp,
      shiftDown,
    }) {
      if (shiftUp) {

        selectedBox.shiftUp();

      } else if (shiftDown) {

        selectedBox.shiftDown();

      } else if (paste) {

        if (copySelectedBoxes.length > 0) {

          const __cloneSelectedBoxRecursively = (box) => {
            const newBox = {
              ...box,
            }
            newBox.children = [
              ...newBox.children,
            ]
            __fulfillBoxMethods(newBox);
            for (var k in (newBox.children || [])) {
              newBox.children[k] = __cloneSelectedBoxRecursively(newBox.children[k]);
              newBox.children[k].getParent = () => newBox;
            }
            return newBox;
          }

          for (var k in copySelectedBoxes) {
            const b = copySelectedBoxes[k];
            __cloneSelectedBoxRecursively(b).addToParent(selectedBox);
          }
        }

        if (cutSelectedBoxes.length > 0) {
          for (var k in cutSelectedBoxes) {
            const b = cutSelectedBoxes[k];
            b.addToParent(selectedBox);
          }
          cutSelectedBoxes = [];
        }

      } else if (cut) {

        if (selectedBox === rootBox) {
          alert("Cannot cut root box");
          return;
        }

        cutSelectedBoxes = [
          selectedBox,
        ];
        copySelectedBoxes = [];
        removeItem();
      } else if (copy) {

        copySelectedBoxes = [
          selectedBox,
        ];
        cutSelectedBoxes = [];
      }

      renderBoxes();

      onUpdateItem && onUpdateItem(true);
    }



    for (var k in styleInputMap) {
      const {
        input,
        key,
      } = styleInputMap[k];

      if (input.tagName === "SELECT") {
        input.addEventListener('change', (e) => {
          if (selectedBox) {
              selectedBox.style = selectedBox.style || {};
              if (e.target.value) {
                selectedBox.style[key] = e.target.value;
              } else {
                delete selectedBox.style[key];
              }
          }
        
          renderBoxes();

          onUpdateItem && onUpdateItem(true);
        });
      } else {
        input.addEventListener('input', (e) => {
          if (selectedBox) {
              selectedBox.style = selectedBox.style || {};
              if (e.target.value) {
                selectedBox.style[key] = e.target.value;
              } else {
                delete selectedBox.style[key];
              }
          }

          renderBoxes();

          onUpdateItem && onUpdateItem(true);
        });
      }
    }



    domBtnEditlayout.addEventListener('click', (e) => {
      _isModeEditContent = false;
      _isModeEditLayout = true;
      renderBoxes();
    });

    domBtnEditcontent.addEventListener('click', (e) => {
      _isModeEditContent = true;
      _isModeEditLayout = false;
      renderBoxes();
    });

    domToggleDisplaytaglabels.addEventListener('change', (e) => {
      _isToggleDisplayTagLabels = e.target.checked;
      renderBoxes();
    })



    domBtnDbgCopy.addEventListener('click', (e) => {
      // Get the text field
      const copyText = domDbg;

      // Select the text field
      copyText.select();
      copyText.setSelectionRange(0, 99999999); // For mobile devices

      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.value);

      // Alert the copied text
      domBtnDbgCopy.textContent = `Copied!`;
      setTimeout(() => {
        domBtnDbgCopy.textContent = `Copy JSON`;
      }, 1000);
    })



    domBtnDbgReload.addEventListener('click', (e) => {
      doDbgReload();
    })

    domBtnDbgCopyHtml.addEventListener('click', (e) => {
      // Get the text field
      const copyText = domResult;

      // Select the text field
      copyText.select();
      copyText.setSelectionRange(0, 99999999); // For mobile devices

      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.value);

      // Alert the copied text
      domBtnDbgCopyHtml.textContent = `Copied!`;
      setTimeout(() => {
        domBtnDbgCopyHtml.textContent = `Copy HTML`;
      }, 1000);
    })



    domBtnEdititeminnerhtml.addEventListener('click', (e) => {
      domOverlayEditorHolder.style.display = `flex`;
      $(domOverlayEditor).summernote('code', selectedBox.innerHTML || ``);
    })

    domBtnOverlayEditorClose.addEventListener('click', (e) => {
      domOverlayEditorHolder.style.display = `none`;
    })


    domBtnPreview.addEventListener('click', (e) => {
      domOverlayPreviewHolder.style.display = `flex`;
      const iframeElement = generateIframe(domResult.value);
      domOverlayPreview.innerHTML = ``;
      domOverlayPreview.appendChild(iframeElement);
    })

    domBtnOverlayPreviewClose.addEventListener('click', (e) => {
      domOverlayPreview.innerHTML = ``;
      domOverlayPreviewHolder.style.display = `none`;
    })



    document.querySelector('[data-btn-loadsave-new]').addEventListener('click', () => {
      createNewItem();
    });



    domInputItemmetaName.addEventListener('input', (e) => {
      onUpdateItemMeta && onUpdateItemMeta({isUpdate: true, });
    })




    function generateIframe(htmlContent) {
      // Create a new iframe element
      const iframe = document.createElement('iframe');
      iframe.style.flex = 1;

      // Set the HTML content of the iframe
      iframe.srcdoc = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
      html, body {
        padding: 0;
        margin: 0;
      }
      body {
        width: calc(100vw);
        height: calc(100vh);
      }
    </style>
    </head>
    <body>
    ${htmlContent}
    </body>
    </html>
      `;

      // Return the iframe element
      return iframe;
    }

    



    return {
      setOnUpdateItem,
      setOnUpdateItemMeta,
      loadItem,
      domExplorerItemlist,
      domOverlayEditor,
      onSummernoteChange,
      createNewItem,
    }

  }

  return {
    initialize,
  }

})();