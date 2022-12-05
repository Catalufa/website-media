document.getElementById("open").addEventListener("click", function() {
  Swal.fire({title: "Loading present...", showConfirmButton: false});
  setTimeout(function () {
    Swal.fire("Stickers pt 2!", "", "success")
  }, 3000);
})
