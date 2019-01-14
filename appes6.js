class Book{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{

  addBookToList(book){
    const bookList = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    bookList.appendChild(row);
  }

  clearField(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  showAlert(msg, typeClassName) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(msg));
    div.className = `alert ${typeClassName}`;
    const form = document.getElementById("book-form");
    document.querySelector(".container").insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000)
  }

  removeFromList(target){
    if (target.className == "delete") {
      //console.log(target.parentElement.parentElement);
      if (confirm("Are you sure you want to delete this record?")) {
        target.parentElement.parentElement.remove();
      }
    }
    const ui = new UI();
    ui.showAlert("Book Removed", "success");
  }

}



document.getElementById("book-form").addEventListener("submit", function (e) {

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();
  if (title == "" || author == "" || isbn == "") {
    ui.showAlert("Please Fill out all fields", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book Added", "success");
  }

  ui.clearField();

  e.preventDefault();

})

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.removeFromList(e.target);
})