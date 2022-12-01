document.getElementById("open").addEventListener("click", function() {
  Swal.fire({title: "Loading present...", showConfirmButton: false});
  setTimeout(function () {
    Swal.fire("Stickers!", "", "success")
  }, 3000);
})
