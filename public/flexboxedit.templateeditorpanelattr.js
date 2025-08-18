window.FlexboxEdit = window.FlexboxEdit || {};
window.FlexboxEdit.TemplateEditorPanelAttr = (() => {
  const initialize = async ({
    templateEditorCoreInstance,
    templateEditorPanelInstance,
  }) => {
    
    const sel_id = document.querySelector('#id');
    const sel_className = document.querySelector('#className');
    const sel_attr = document.querySelector('#attr');
    const sel_dataset = document.querySelector('#dataset');
    
    const attrInputMap = [
      {input: sel_id, key: "id",},
      {input: sel_className, key: "className",},
      {input: sel_attr, key: "attr",},
      {input: sel_dataset, key: "dataset",},
    ]
    
    
    
    
    
    ////////
    
    for (var k in attrInputMap) {
      const {
        input,
        key,
      } = attrInputMap[k];
      
      input.addEventListener("input", (e) => {
        templateEditorCoreInstance?.updateItemPropertyKeyValue("attr", key, e.target.value);
      })
      
      input.addEventListener("change", (e) => {
        templateEditorCoreInstance?.updateItemPropertyKeyValue("attr", key, e.target.value);
      })
    }
    
    
    
    
    templateEditorPanelInstance.addOnRefreshSettingsListener(() => {
      const selectedBox = templateEditorCoreInstance?.getItem();
      
      for (var k in attrInputMap) {
        const {
          input,
          key,
        } = attrInputMap[k];
        
        input.value = ( (selectedBox?.attr && selectedBox?.attr[key]) !== undefined) ? selectedBox?.attr[key] : "";
      }
    });
    
    
    
    
    
    const KeyValueManager = (() => {

      const initialize = ((dom) => {

        dom.data = [];


        Object.defineProperty(dom, 'value', {
          get() {
            return dom.data;
          },

          set(value) {
            dom.data = [...value];
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



        const makeTemplateForListItem = (item, index) => {
          const dom = document.createElement('div');

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
            editItem(index, 'key', e.target.value);
          });
          dom.domInputValue.addEventListener('input', (e) => {
            e.preventDefault();
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

        const renderKeyValueList = () => {
          const container = domKeyValueList;
          container.innerHTML = ''; // Clear previous content
          
          dom.data.forEach((item, index) => {
            const domItem = makeTemplateForListItem(item, index);
            container.appendChild(domItem);
          });
          
          console.log(dom.data); // Output the current array to the console
        };

        const addItem = () => {
          dom.data.push({ key: "", value: "" });
          renderKeyValueList();
          dom.dispatchEvent(new Event("change"));
        };

        const editItem = (index, field, newValue) => {
          (dom.data || [])[index][field] = newValue;
          dom.dispatchEvent(new Event("change"));
        };

        const removeItem = (index) => {
          dom.data.splice(index, 1);
          renderKeyValueList();
          dom.dispatchEvent(new Event("change"));
        };

        const shiftItem = (index, direction) => {
          const newIndex = index + direction;
          if (newIndex >= 0 && newIndex < data.length) {
            [data[index], data[newIndex]] = [data[newIndex], data[index]];
            renderKeyValueList();
            dom.dispatchEvent(new Event("change"));
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



    KeyValueManager.initialize(sel_attr);
    KeyValueManager.initialize(sel_dataset);
    
    
    
    const instance = {
      
    };
    
    return instance;
    
  }
  
  return {
    initialize,
  }
  
})();