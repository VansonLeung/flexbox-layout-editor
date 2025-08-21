window.FlexboxEdit = window.FlexboxEdit || {};
window.FlexboxEdit.TemplateEditorPanelAttr = (() => {
  const initialize = async ({
    templateEditorCoreInstance,
    templateEditorPanelInstance,
  }) => {
    
    const sel_id = document.querySelector('#id');
    const sel_className = document.querySelector('#className');
    const sel_dataset = document.querySelector('#dataset');
    
    const attrInputMap = [
      {input: sel_id, key: "id",},
      {input: sel_className, key: "className",},
      {input: sel_dataset, key: "dataset", defaultValue: [], },
    ]
    
    
    
    
    
    ////////
    
    for (var k in attrInputMap) {
      const {
        input,
        key,
      } = attrInputMap[k];
      
      input.addEventListener("input", (e) => {
        e.preventDefault();
        console.log("input...");
        templateEditorCoreInstance?.updateItemPropertyKeyValue("attr", key, e.target.value);
      })
    }
    
    
    
    
    templateEditorPanelInstance.addOnRefreshSettingsListener(() => {
      const selectedBox = templateEditorCoreInstance?.getItem();

      for (var k in attrInputMap) {
        const {
          input,
          key,
          defaultValue = "",
        } = attrInputMap[k];

        input.value = ( (selectedBox && selectedBox.attr && selectedBox.attr[key]) !== undefined) ? selectedBox.attr[key] : defaultValue;
      }
    });
    
    
    
    
    
    const KeyValueManager = (() => {

      const initialize = ((dom) => {

        const generateUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        dom.data = [];

        let data = null;


        Object.defineProperty(dom, 'value', {
          get() {
            return dom.data;
          },

          set(value) {
            dom.data = value;
            renderKeyValueList();
          },
        }, {
          writable: true,
          configurable: true,
          enumerable: true,
        });


        const template = `
            <div style="display: flex; flex-direction: column;">
                <button data-btn-add>Add Item</button>
                <div data-holder-keyvaluelist></div>
            </div>
        `;


        dom.innerHTML = template;

        const domKeyValueList = dom.querySelector('[data-holder-keyvaluelist]');
        const domBtnAdd = dom.querySelector('[data-btn-add]');


        const container = dom;


        const __makeTemplateForListItem = (item, index) => {
          const dom = container.querySelector(`[data-item-uuid="${item.uuid}"]`) || document.createElement('div');

          dom.setAttribute('data-item-uuid', item.uuid);

          dom.innerHTML = `
              <input data-input-key type="text" value="${item.key}"/>
              <input data-input-value type="text" value="${item.value}"/>
              <button data-btn-remove >Remove</button>
              <button data-btn-shiftup >↑</button>
              <button data-btn-shiftdown >↓</button>
          `;

          dom.domInputKey = dom.querySelector('[data-input-key]');
          dom.domInputValue = dom.querySelector('[data-input-value]');
          dom.domBtnRemove = dom.querySelector('[data-btn-remove]');
          dom.domBtnShiftup = dom.querySelector('[data-btn-shiftup]');
          dom.domBtnShiftdown = dom.querySelector('[data-btn-shiftdown]');

          dom.domInputKey.addEventListener('input', (e) => {
            e.preventDefault();
            e.stopPropagation();
            editItem(index, 'key', e.target.value);
          });
          dom.domInputValue.addEventListener('input', (e) => {
            e.preventDefault();
            e.stopPropagation();
            editItem(index, 'value', e.target.value);
          });
          dom.domBtnRemove.addEventListener('click', (e) => {
            e.preventDefault();
            removeItem(index);
          });
          dom.domBtnShiftup.addEventListener('click', (e) => {
            e.preventDefault();
            shiftItem(index, -1);
          });
          dom.domBtnShiftdown.addEventListener('click', (e) => {
            e.preventDefault();
            shiftItem(index, +1);
          });

          return dom;
        }

        const __removeOrphanedListItem = () => {
          const domListItems = container.querySelectorAll(`[data-item-uuid]`);

          for (var m in Array.from(domListItems)) {
            const domListItem = domListItems[m];
            const domListItemUuid = domListItem.getAttribute('data-item-uuid');

            let shouldDelete = true;

            for (var k in dom.data) {
              const item = dom.data[k];
              if (item.uuid === domListItemUuid) {
                shouldDelete = false;
                break;
              }
            }

            if (shouldDelete) {
              domListItem.remove();
            }
          }
        }

        const renderKeyValueList = () => {
          console.log("renderKeyValueList!!");
          const container = domKeyValueList;

          if (data !== dom.data) {
            data = dom.data;

            __removeOrphanedListItem();

            dom.data.forEach((item, index) => {
              const domItem = __makeTemplateForListItem(item, index);
              container.appendChild(domItem);
            });

            console.log(dom.data); // Output the current array to the console
          }
        };

        const addItem = () => {
          dom.data = [
            ...dom.data,
            { uuid: generateUUID(), key: "", value: "" },
          ]
          dom.dispatchEvent(new Event("input"));
        };

        const editItem = (index, field, newValue) => {
          (dom.data || [])[index][field] = newValue;
          dom.dispatchEvent(new Event("input"));
        };

        const removeItem = (index) => {
          dom.data.splice(index, 1);
          dom.data = [
            ...dom.data,
          ]
          renderKeyValueList();
          dom.dispatchEvent(new Event("input"));
        };

        const shiftItem = (index, direction) => {
          const newIndex = index + direction;
          if (newIndex >= 0 && newIndex < dom.data.length) {
            [dom.data[index], dom.data[newIndex]] = [dom.data[newIndex], data[index]];
            dom.data = [
              ...dom.data,
            ]
            renderKeyValueList();
            dom.dispatchEvent(new Event("input"));
          }
        };

        // Initial render


        domBtnAdd.addEventListener('click', (e) => {
          addItem();
        })


        return {
          addItem,
          editItem,
          removeItem,
          shiftItem,
        };


      })

      return {
        initialize,
      }

    })();



    KeyValueManager.initialize(sel_dataset);
    
    
    
    const instance = {
      
    };
    
    return instance;
    
  }
  
  return {
    initialize,
  }
  
})();