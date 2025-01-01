const tablePermission = document.querySelector("[table-permission]");

const btnSubmit = document.querySelector("[btn-submit]");

if (tablePermission) {
    let permission = [];
    const rows = tablePermission.querySelectorAll("[data-name]");
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = tablePermission.querySelectorAll("input");
            if (name == 'id') {
                inputs.forEach(input => {
                    const id = input.value;
                    permission.push({
                        id: id,
                        permission: []
                    });
                });
            }else{
                inputs.forEach((input,index)=>{
                    const checked = input.checked;
                    console.log(`Name":${name}`);
                    console.log(`Index":${index}`);
                    console.log(`Trang thai :${checked}`)
                    permission[index].permission.push(name);
                });
            };
        });
        console.log(permission)
    });
};