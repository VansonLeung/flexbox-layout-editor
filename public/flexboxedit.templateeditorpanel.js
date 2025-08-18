window.FlexboxEdit = window.FlexboxEdit || {};
window.FlexboxEdit.TemplateEditorPanel = (() => {
  const initialize = async ({
    templateEditorCoreInstance,
  }) => {

    let onRefreshSettingsListeners = new Set([]);

    const addOnRefreshSettingsListener = (listener) => {
      onRefreshSettingsListeners.add(listener);
    }

    const removeOnRefreshSettingsListener = (listener) => {
      onRefreshSettingsListeners.delete(listener);
    }

    const __notifyOnRefreshSettingsListeners = () => {
      for (let listener of onRefreshSettingsListeners) {
        listener();
      }
    }



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


    const domBtnEditTabLayoutFlexbox = document.querySelector('[data-btn-edit-tab-layout-flexbox]');
    const domBtnEditTabLayoutAttr = document.querySelector('[data-btn-edit-tab-layout-attr]');

    const domToolbarEditLayoutFlexbox = document.querySelector('[data-toolbar-edit-layout-flexbox]');
    const domToolbarEditLayoutAttr = document.querySelector('[data-toolbar-edit-layout-attr]');


    const tabMapping = [
      { tab: domBtnEditTabLayoutFlexbox, tabContent: domToolbarEditLayoutFlexbox, },
      { tab: domBtnEditTabLayoutAttr, tabContent: domToolbarEditLayoutAttr, },
    ];

    let activeTab = tabMapping[0];




    const beautify = SimplyBeautiful(); // The script above exposes the global variable 'SimplyBeautiful'


    domHolderExplorer.append(domExplorerItemlist);

    domHolderMain.append(domEditorArea);
    domHolderMain.append(domEditorAreaHidden);
    domHolderMain.append(domToolbarItemmeta);
    domHolderMain.append(domToolbarMenu);
    domHolderMain.append(domToolbarEditLayout);


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
      __notifyOnRefreshSettingsListeners();
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
      addOnRefreshSettingsListener,
      removeOnRefreshSettingsListener,
    };


    if (FlexboxEdit.Summernote) {
      FlexboxEdit.Summernote.initialize(instance);
    }



    /////





    for (var k in tabMapping) {
      const tabItem = tabMapping[k];
      tabItem.tab.addEventListener('click', (e) => {
        e.preventDefault();
        activeTab = tabItem;
        refreshTab();
      })
    }

    const refreshTab = () => {
      for (var k in tabMapping) {
        const tabItem = tabMapping[k];
        if (tabItem !== activeTab) {
          tabItem.tabContent.style.visibility = `hidden`;
          tabItem.tabContent.style.width = `0px`;
        } else {
          tabItem.tabContent.style.visibility = ``;
          tabItem.tabContent.style.width = ``;
        }
      }
    }

    refreshTab();






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