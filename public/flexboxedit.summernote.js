window.FlexboxEdit.Summernote = (() => {

  const MEDIA_UPLOAD_API_URL = `http://localhost:3001/api/upload`;

  const {
    domOverlayEditor,
    onSummernoteChange,
  } = FlexboxEdit;


  const $domOverlayEditor = $(domOverlayEditor);

  $domOverlayEditor.summernote({
    placeholder: 'Edit content...',
    tabsize: 2,
    height: `500px`,
    toolbar: [
      ['style', ['style']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['codeview', 'help']]
    ],
    callbacks: {
      onImageUpload: async function(files) {
        await sendFile($domOverlayEditor, files[0]);
      },
      onChange: (contents, $editable) => {
        onSummernoteChange && onSummernoteChange(contents, $editable);
      },
    },
  });


    async function sendFile($domOverlayEditor, file) {
      const data = new FormData();
      data.append("file", file);

      try {
        const response = await fetch(MEDIA_UPLOAD_API_URL, {
          method: 'POST',
          body: data
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        $domOverlayEditor.summernote('insertImage', result.imageUrl, );
      } catch (error) {
        console.error('Error:', error);
      }
    }


})();