// Change status
const btnChangeStatus = document.querySelectorAll("[btn-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
const dataPath = formChangeStatus.getAttribute("data-path");

if (btnChangeStatus.length > 0) {
  btnChangeStatus.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = button.getAttribute("data-id");
      const status = button.getAttribute("data-status");
      let statusChange =
        status === "Hoạt động" ? "Ngừng Hoạt Động" : "Hoạt động";
      const action = `${dataPath}${encodeURIComponent(
        statusChange
      )}/${id}?_method=PATCH`;
      console.log(action);
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
// Delete item
const btnDelete = document.querySelectorAll("[button-delete]");
const forDeleteItem = document.forms["delete-courses-form"];
const path = forDeleteItem.getAttribute("data-path");
if (btnDelete.length > 0) {
  btnDelete.forEach((button) => {
    button.addEventListener("click", () => {
      let isConfig = confirm(`Are you sure you want to delete?`);
      isConfig = button.getAttribute("data-id");
      const action = `${path}/${isConfig}?_method=DELETE`;
      console.log(action);
      forDeleteItem.action = action;
      forDeleteItem.submit();
    });
  });
}
