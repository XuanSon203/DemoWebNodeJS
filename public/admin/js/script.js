// Start button Status
const btnStatus = document.querySelectorAll("[btn-status]");
if (btnStatus.length > 0) {
  let url = new URL(window.location.href);
  btnStatus.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const status = btn.getAttribute("btn-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      location.href = url.href;
    });
  });
}
// End button status

// Start Form Search
const formSearch = document.querySelector("#searchForm");

if (formSearch) {
  let url = new URL(location.href); // Create a URL object
  formSearch.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission behavior
    const keyword = e.target[0].value.trim(); // Get the input value and trim whitespace
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    // Redirect to the updated URL
    location.href = url.href;
  });
}

// Paginations
const btnPagination = document.querySelectorAll("[btn-pagination]");
if (btnPagination.length) {
  let url = new URL(location.href); // Create a URL object
  btnPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("btn-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// Checkbox Selection
const formContainer = document.forms["form-container"];
if (formContainer) {
  const checkAll = document.querySelector('input[name="checkAll"]');
  const checkBox = document.querySelectorAll(
    'input[name="selectedProducts[]"]'
  );
  const actionSelect = formContainer.querySelector("#courseFilter");

  // Check/Uncheck all checkboxes
  if (checkAll) {
    checkAll.addEventListener("change", () => {
      checkBox.forEach((cb) => (cb.checked = checkAll.checked));
    });
  }

  // Handle individual checkbox changes
  checkBox.forEach((cb) => {
    cb.addEventListener("change", () => {
      const countChecked = document.querySelectorAll(
        'input[name="selectedProducts[]"]:checked'
      );

      // Update "Select All" checkbox state
      checkAll.checked = countChecked === checkBox.length;
    });
  });
  let showCheckboxes = document.querySelector('input[name="showIdCheckBox');

  // Handle form submission
  formContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedCheckboxes = document.querySelectorAll(
      'input[name="selectedProducts[]"]:checked'
    );
    // xoa nhieu san pham
    const typeChange = e.target[2].value;
    if (typeChange == "delete-all") {
      const isConfig = confirm("Are you sure you want to delete ? ");
      if (!isConfig) {
        return;
      }
    }

    if (selectedCheckboxes.length > 0) {
      let ids = [];

      selectedCheckboxes.forEach((cb) => {
        const id = cb.value;
        if (typeChange === "change-position") {
          const position = cb
            .closest("tr")
            .querySelector('input[name="position"]').value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      showCheckboxes.value = ids.join(",");

      formContainer.submit();
    } else {
      alert("Vui lòng chọn ít nhất một môn học để xử lý.");
      return;
    }
  });
}
//  Xu ly logic thong bao
const alertMessage = document.querySelector("[show-alert]");
if (alertMessage) {
  const time = parseInt(alertMessage.getAttribute("data-time"));
  setTimeout(() => {
    alertMessage.classList.add("alert-hidden");
  }, time);
  const closeAlert = alertMessage.querySelector(".close-alert");
  closeAlert.addEventListener("click", () => {
    alertMessage.classList.add("alert-hidden");
  });
  console.log(closeAlert);
}
// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// Sort
const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);
  const sortSlect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  console.log(sortClear);
  sortSlect.addEventListener("change", (e) => {
    const value = e.target.value;
    console.log(value.split("_"));
    const [sortKey, sortValue] = value.split("_");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    location.href = url.href;
  });
  // delete Sort
  sortClear.addEventListener("click", (e) => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    location.href = url.href;
  });
  // Add seleted for option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  console.log(sortKey, sortValue);
  if(sortKey && sortValue) {
  const stringSort = `${sortKey}_${sortValue}`;
  console.log(stringSort);
  const optionSelected = sortSlect.querySelector(`option[value='${stringSort}']`);
  console.log(optionSelected);
  optionSelected.selected =true;
  
  }

}
