tinymce.init({
  selector: "textarea#description",
  menu: {
    edit: { title: "Edit", items: "undo redo | selectall" },
    plugins: "image",
  },
});
