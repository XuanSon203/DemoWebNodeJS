// Code Font_end Change check box power
const tablePermission = document.querySelector("[table-permission]");
if (tablePermission) {
    const btnSubmit = document.querySelector("[btn-submit]");
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        let permissions = [];
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach((row) => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll(
                "input[type='text'], input[type='checkbox']"
            );
            if (name == "id") {
                inputs.forEach((input) => {
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions: [],
                    });
                });
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    if (checked) {
                        permissions[index].permissions.push(name);
                    }
                });
            }
        });
        console.log(permissions);

        if (permissions.length > 0) {
            const formChangePermissions = document.querySelector(
                "#form-change-permissions"
            );
            const inputPermissions = formChangePermissions.querySelector(
                'input[name="permissions"]'
            );
            inputPermissions.value = JSON.stringify(permissions);
            formChangePermissions.submit();
        }
    });
}
// Permissions data default
const dataRecords = document.querySelector("[data-records]");

if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermission = document.querySelector("[table-permission]");
    records.forEach((record, index) => {
        const permissions = record.permissions;
     
        permissions.forEach((permissions) => {
            const row = tablePermission.querySelector(`[data-name="${permissions}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
            console.log(permissions);
        });
    });
}
