window.FlexboxEdit = window.FlexboxEdit || {};
window.FlexboxEdit.TemplateEditorPanelFlexbox = (() => {
  const initialize = async ({
    templateEditorCoreInstance,
    templateEditorPanelInstance,
  }) => {

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





    ////////

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




    templateEditorPanelInstance.addOnRefreshSettingsListener(() => {
      const selectedBox = templateEditorCoreInstance?.getItem();

      for (var k in styleInputMap) {
        const {
          input,
          key,
        } = styleInputMap[k];

        input.value = ( (selectedBox?.style && selectedBox?.style[key]) !== undefined) ? selectedBox?.style[key] : "";
      }
    });




    const instance = {

    };

    return instance;

  }

  return {
    initialize,
  }

})();