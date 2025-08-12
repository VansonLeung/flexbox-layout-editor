window.FlexboxEdit = window.FlexboxEdit || {};
window.FlexboxEdit.RenderDomCli = (() => {

  const initialize = () => {

    

    let _defaultBaseUrl = ``;


    const setDefaultOptions = ({
      baseUrl,
    }) => {
      _defaultBaseUrl = baseUrl;
    }




    const generateRandomAlphanumeric = (len = 8) => {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      
      for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
      }
      
      return result;
    }
  




    const _renderDom = async (dom) => {
      try {
        const fbeSrcId = dom.getAttribute('data-fbe-src-id');

        if (!fbeSrcId) {
          return dom;
        }

        const item = await FlexboxEdit.LoadSave.applyLoad(fbeSrcId, {
          baseUrl: _defaultBaseUrl,
        });

        const {
          id,
          name,
          json,
        } = item.data;

        const newRootBox = JSON.parse(json);

        const newDomBox = FlexboxEdit.RenderCore.renderBox(
          newRootBox,
          null,
          null,
          undefined,
          undefined,
          false,
          null,
          false,
          false,
          false,
          null,
          null,
          true,
        );

        const uuid = generateRandomAlphanumeric();

        const newDomContainer = document.createElement('div');
        newDomContainer.innerHTML = `
<div data-rand-uuid-fbe="${uuid}" data-fbe-root data-fbe-root-name="${name}" data-fbe-root-id="${id}">
  <style>
  [data-rand-uuid-fbe="${uuid}"] [data-fbe-box] {
    display: flex;
    position: relative;
    box-sizing: border-box;
  }
  </style>
</div>
  `;

        const newDom = newDomContainer.children[0];
        newDom.append(newDomBox);

        return newDom;

      } catch (e) {
        console.error(e);
        return dom;
      }
    }








    const findAndImplementNode = (node) => {
      try {
        if (!node || node.nodeType !== Node.ELEMENT_NODE || !node.hasAttribute) {
          //
        }

        else if (node.tagName === "TPL-FBE" 
          && !node.hasAttribute('data-fbe-src-id-engaged') 
          && node.hasAttribute('data-fbe-src-id')
        ) {
          node.setAttribute('data-fbe-src-id-engaged', 'true');
          implementNode(node);
        }

        else {
          const children = node.children;
          if (children) {
            for (var k in children) {
              findAndImplementNode(children[k]);
            }
          }
        }

      } catch (e) {
        console.warn(e);
      }
    }

    const implementNode = async (node) => {
      return await _convertDom(node);
    };

    const _convertDom = async (inputNode) => {
      const dom = await _renderDom(inputNode);

      Array.from(inputNode.attributes).forEach(attr => {
        dom.setAttribute(attr.name, attr.value);
      });

      for (var key in inputNode.dataset) {
        const val = inputNode.dataset[key];
        if (val) {
          dom[key] = val;
        }
      }

      dom.__domFbeIsEngaged = true;

      if (inputNode.parentNode) {
        inputNode.parentNode.replaceChild(dom, inputNode);
      }

      return dom;
    };




    // Create a MutationObserver instance
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            findAndImplementNode(node);
          });
        }
      });
    });

    // Start observing the target node (e.g., document.body or a specific parent element)
    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
    });



    return {
      setDefaultOptions,
    }

  }

  return {
    initialize,
  }
})()