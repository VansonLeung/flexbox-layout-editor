window.FlexboxEdit = window.FlexboxEdit || {};
window.FlexboxEdit.TemplateEditorPanel = (() => {
  const initialize = async ({
    templateEditorCoreInstance,
  }) => {

    const loadItem = (item) => {
      domInputItemmetaEmbed.value = `<tpl-fbe data-fbe-src-id="${item.id || ''}"></tpl-fbe>`;
      domInputItemmetaId.value = item.id || '';
      domInputItemmetaName.value = item.name || '';
      domDbg.value = item.json ? JSON.stringify(item.json) : '';
      doDbgReload();
    }

    const createNewItem = () => {
      domInputItemmetaEmbed.value = ``;
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
    const domInputItemmetaEmbed = document.querySelector('[data-input-itemmeta-embed]');

    const domToolbarItemmeta = document.querySelector('[data-toolbar-itemmeta]');
    const domToolbarMenu = document.querySelector('[data-toolbar-menu]');
    const domToolbarEditLayout = document.querySelector('[data-toolbar-edit-layout]');
    const domToolbarEditContent = document.querySelector('[data-toolbar-edit-content]');

    const domToggleDisplaytaglabels = document.querySelector('[data-toggle-displaytaglabels]');

    const domBtnDbgCopy = document.querySelector('[data-btn-dbg-copy]');
    const domBtnDbgImport = document.querySelector('[data-btn-dbg-import]');

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
      templateEditorCoreInstance?.setItemInnerHTML(contents);
    }




    ////////





    const __refreshExports = () => {
      const rootBox = templateEditorCoreInstance?.getRootItem();

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


    const __refreshSettings = () => {
      const selectedBox = templateEditorCoreInstance?.getItem();

      for (var k in styleInputMap) {
        const {
          input,
          key,
        } = styleInputMap[k];

        input.value = ( (selectedBox?.style && selectedBox?.style[key]) !== undefined) ? selectedBox?.style[key] : "";
      }
    }



    const doDbgPromptInput = () => {
      const newDbgValue = prompt("Please input JSON");
      if (newDbgValue) {
        domDbg.value = newDbgValue;
        doDbgReload();
      }
    }


    const doDbgReload = () => {
      domEditorArea.innerHTML = '';
      domEditorAreaHidden.innerHTML = '';

      templateEditorCoreInstance?.setRootItem(domDbg.value ? JSON.parse(domDbg.value) : null);
    }



    document.getElementById('addItem').addEventListener('click', () => {
      templateEditorCoreInstance?.addItem({});
    });

    document.getElementById('addItemBeforeSibling').addEventListener('click', () => {
      templateEditorCoreInstance?.addItem({beforeSelectionAsSibling: true,});
    });

    document.getElementById('addItemAfterSibling').addEventListener('click', () => {
      templateEditorCoreInstance?.addItem({afterSelectionAsSibling: true,});
    });

    document.getElementById('removeItem').addEventListener('click', () => {
      templateEditorCoreInstance?.removeItem();
    });

    document.getElementById('moveItemCut').addEventListener('click', () => {
      templateEditorCoreInstance?.moveItem({cut: true,});
    });

    document.getElementById('moveItemCopy').addEventListener('click', () => {
      templateEditorCoreInstance?.moveItem({copy: true,});
    });

    document.getElementById('moveItemPaste').addEventListener('click', () => {
      templateEditorCoreInstance?.moveItem({paste: true,});
    });

    document.getElementById('moveItemReplace').addEventListener('click', () => {
      templateEditorCoreInstance?.moveItem({replace: true,});
    });

    document.getElementById('moveItemToBefore').addEventListener('click', () => {
      templateEditorCoreInstance?.moveItem({shiftUp: true,});
    });

    document.getElementById('moveItemToAfter').addEventListener('click', () => {
      templateEditorCoreInstance?.moveItem({shiftDown: true,});
    });





    for (var k in styleInputMap) {
      const {
        input,
        key,
      } = styleInputMap[k];

      input.addEventListener("input", (e) => {
        templateEditorCoreInstance?.updateItemPropertyKeyValue("style", key, e.target.value);
      })

      input.addEventListener("change", (e) => {
        templateEditorCoreInstance?.updateItemPropertyKeyValue("style", key, e.target.value);
      })
    }



    domBtnEditlayout.addEventListener('click', (e) => {
      templateEditorCoreInstance?.setModeEditLayout();
    });

    domBtnEditcontent.addEventListener('click', (e) => {
      templateEditorCoreInstance?.setModeEditContent();
    });

    domToggleDisplaytaglabels.addEventListener('change', (e) => {
      templateEditorCoreInstance?.setDisplayTagLabels(e.target.checked);
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



    domBtnDbgImport.addEventListener('click', (e) => {
      doDbgPromptInput();
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
      $(domOverlayEditor).summernote('code', templateEditorCoreInstance?.getItemInnerHTML() || ``);
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
        templateEditorCoreInstance?.onUpdateItemMeta(true);
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

    
    const instance = {
      loadItem,
      createNewItem,
      domExplorerItemlist,
      domOverlayEditor,
      onSummernoteChange,
    };


    if (FlexboxEdit.Summernote) {
      FlexboxEdit.Summernote.initialize(instance);
    }





    /////


    templateEditorCoreInstance?.setValueGetterReferences({
      onGetSourceMetaId: () => { return domInputItemmetaId.value; },
      onGetSourceMetaName: () => { return domInputItemmetaName.value; },
      onGetSourceJson: () => { return domDbg.value; },
      onGetDomEditorArea: () => { return domEditorArea; },
      onGetDomEditorAreaHidden: () => { return domEditorAreaHidden; },
    });

    templateEditorCoreInstance?.addOnRenderBoxListener(() => {
      __refreshExports();
      __refreshSettings();
    });


    
    return instance;

  }

  return {
    initialize,
  }

})();