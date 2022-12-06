document.getElementById("open").addEventListener("click", function() {
  Swal.fire({title: "Loading present...", showConfirmButton: false});
  setTimeout(function () {
    Swal.fire("Glass trinket", "", "success")
  }, 3000);
})
