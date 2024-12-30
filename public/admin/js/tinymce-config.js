tinymce.init({
  selector: "textarea#description",
  plugins: "image link media",
  file_picker_callback: (callback, value, meta) => {
    // Tạo input để người dùng chọn file từ hệ thống
    const input = document.createElement('input');
    input.setAttribute('type', 'file');

    // Xử lý theo loại file (image, media, file)
    if (meta.filetype === 'image') {
      input.setAttribute('accept', 'image/*');
    } else if (meta.filetype === 'media') {
      input.setAttribute('accept', 'video/*,audio/*');
    }

    input.onchange = function () {
      const file = this.files[0];

      // Upload file lên server (hoặc dùng base64 nếu cần)
      const reader = new FileReader();
      reader.onload = function (e) {
        // Trả kết quả lại cho TinyMCE
        callback(e.target.result, {
          alt: file.name
        });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }
});