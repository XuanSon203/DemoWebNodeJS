module.exports = (query)=>{
     //  font-end filtering
     let filterStatus = [
        {
          name: "Tất cả ",
          status: "",
          class: "",
        },
        {
          name: "Hoạt đông ",
          status: "Hoạt động",
          class: "",
        },
        {
          name: "Ngừng hoạt động ",
          status: "Ngừng Hoạt Động",
          class: "",
        },
      ];
      
      // add class active vao khi click filtering
      if (query.status) {
        const index = filterStatus.findIndex(
          (item) => item.status == query.status
        );
        filterStatus[index].class = "active";
      } else {
        filterStatus[0].class = "active";
      }
      return filterStatus;
      
}