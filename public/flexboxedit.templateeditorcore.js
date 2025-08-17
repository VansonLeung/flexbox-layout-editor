window.FlexboxEdit = window.FlexboxEdit || {};
window.FlexboxEdit.TemplateEditorCore = (() => {
  const initialize = async () => {

    let onUpdateItem = null;
    let onUpdateItemMeta = null;

    let getSourceMetaId = null;
    let getSourceMetaName = null;
    let getSourceJson = null;

    let getDomEditorArea = null;
    let getDomEditorAreaHidden = null;

    let onRenderBoxListeners = new Set([]);

    const setOnUpdateItem = (callback) => {
      onUpdateItem = (isUpdate) => {
        callback({
          isUpdate,
          id: getSourceMetaId(),
          name: getSourceMetaName(),
          json: getSourceJson(),
        });
      }
    }

    const setOnUpdateItemMeta = (callback) => {
      onUpdateItemMeta = (isUpdate) => {
        callback({
          isUpdate,
          id: getSourceMetaId(),
          name: getSourceMetaName(),
          json: getSourceJson(),
        });
      }
    }



    const setValueGetterReferences = ({
      onGetSourceMetaId,
      onGetSourceMetaName,
      onGetSourceJson,
      onGetDomEditorArea,
      onGetDomEditorAreaHidden,
    }) => {
      if (onGetSourceMetaId !== undefined) { getSourceMetaId = onGetSourceMetaId; }
      if (onGetSourceMetaName !== undefined) { getSourceMetaName = onGetSourceMetaName; }
      if (onGetSourceJson !== undefined) { getSourceJson = onGetSourceJson; }
      if (onGetDomEditorArea !== undefined) { getDomEditorArea = onGetDomEditorArea; }
      if (onGetDomEditorAreaHidden !== undefined) { getDomEditorAreaHidden = onGetDomEditorAreaHidden; }
    }

    const addOnRenderBoxListener = (listener) => {
      onRenderBoxListeners.add(listener);
    }

    const removeOnRenderBoxListener = (listener) => {
      onRenderBoxListeners.delete(listener);
    }

    const __notifyOnRenderBoxListeners = () => {
      for (let listener of onRenderBoxListeners) {
        listener();
      }
    }



    var _isModeEditLayout = true;
    var _isModeEditContent = false;
    var _isToggleDisplayTagLabels = true;

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

      box.replaceWith = (newBox) => {
        box.children = [...newBox.children];
        box.style = {...newBox.style};
        if (newBox.innerHTML !== undefined) { box.innerHTML = newBox.innerHTML; } else { delete box.innerHTML; }
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





    const toggleSelectBox = (event, box) => {
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








    const renderBoxes = () => {

      __renderBox(rootBox, null, getDomEditorArea(), 0, 0, true);
      __renderBox(rootBox, null, getDomEditorAreaHidden(), 0, 0, false);

      __notifyOnRenderBoxListeners();
    }


    const __fulfillBox = (box) => {
      __fulfillBoxMethods(box);
      for (var k in (box.children || [])) {
        __fulfillBox(box.children[k]);
        box.children[k].getParent = () => box;
      }
    }




    const __renderBox = (box, boxParent, domParent, index, level, isContainIndicators = false) => {
      return FlexboxEdit.RenderCore.renderBox(box, boxParent, domParent, index, level, isContainIndicators,
        domBoxMapping,_isModeEditContent,_isModeEditLayout,_isToggleDisplayTagLabels, selectedBox, toggleSelectBox,
      );
    }




    const getRootItem = () => {
      return rootBox;
    }


    const setRootItem = (newRootItem) => {
      const newRootBox = newRootItem || __createBox({name: 'Root'});

      for (var k in rootBox) {
        delete rootBox[k];
      }

      for (var k in newRootBox) {
        rootBox[k] = newRootBox[k];
      }

      __fulfillBox(rootBox);

      clearDomBoxMapping();

      setTimeout(() => {
        renderBoxes();
      }, 100);
    }







    const getItem = () => {
      return selectedBox;
    }


    const addItem = ({
      beforeSelectionAsSibling,
      afterSelectionAsSibling,
    }) => {
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

    const removeItem = () => {
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

    const moveItem = ({
      cut,
      copy,
      paste,
      replace,
      shiftUp,
      shiftDown,
    }) => {
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

      } else if (replace) {

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
            selectedBox.replaceWith(__cloneSelectedBoxRecursively(b));
          }
        }

        if (cutSelectedBoxes.length > 0) {
          for (var k in cutSelectedBoxes) {
            const b = cutSelectedBoxes[k];
            selectedBox.replaceWith(b);
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


    const updateItemPropertyKeyValue = (objectKey, key, value) => {
      if (selectedBox) {
          selectedBox[objectKey] = selectedBox[objectKey] || {};
          if (value) {
            selectedBox[objectKey][key] = value;
          } else {
            delete selectedBox[objectKey][key];
          }
      }

      renderBoxes();

      onUpdateItem && onUpdateItem(true);
    }


    


    const setModeEditLayout = () => {
      _isModeEditContent = false;
      _isModeEditLayout = true;
      renderBoxes();
    }

    const setModeEditContent = () => {
      _isModeEditContent = true;
      _isModeEditLayout = false;
      renderBoxes();
    }

    const setDisplayTagLabels = (boo) => {
      _isToggleDisplayTagLabels = boo;
      renderBoxes();
    }





    const getItemInnerHTML = () => {
      return selectedBox?.innerHTML;
    }

    const setItemInnerHTML = (innerHTML) => {
      if (selectedBox) {
        selectedBox.innerHTML = innerHTML;
        
        if (selectedBox.innerHTML.trim() === '<br>') {
          selectedBox.innerHTML = "";
        }

        __renderBox(selectedBox, null, null, undefined, undefined, true);
        __renderBox(selectedBox, null, null, undefined, undefined, false);

        __notifyOnRenderBoxListeners();

        onUpdateItem && onUpdateItem(true);
      }
    }



    const clearDomBoxMapping = () => {
      domBoxMapping.clear();
    }


    
    const instance = {
      setOnUpdateItem,
      setOnUpdateItemMeta,
      onUpdateItemMeta: (isUpdate) => {
        onUpdateItemMeta && onUpdateItemMeta(isUpdate);
      },
      setValueGetterReferences,
      addOnRenderBoxListener,
      removeOnRenderBoxListener,
      getRootItem,
      setRootItem,
      getItem,
      addItem,
      removeItem,
      moveItem,
      updateItemPropertyKeyValue,
      setModeEditLayout,
      setModeEditContent,
      setDisplayTagLabels,
      getItemInnerHTML,
      setItemInnerHTML,
    };

    return instance;

  }

  return {
    initialize,
  }

})();