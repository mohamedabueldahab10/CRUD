var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var searchInput = document.getElementById("searchInput");
var myBtn = document.getElementById("myBtn");
var productContainer;
var currentIndex;
if (localStorage.getItem("productList") == null) {
    productContainer = []
}
else {
    productContainer = JSON.parse(localStorage.getItem("productList"))
    displayData()
}


function add(){
    if (myBtn.innerHTML == "Add Product"){
        addProduct()
    }
    else{
        editData()
    }
}

function addProduct() {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value
        }
        productContainer.push(product)
        localStorage.setItem("productList", JSON.stringify(productContainer));
        displayData()
        clearForm()
    }


function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}



function displayData() {
    var temp = "";
    for (var i = 0; i < productContainer.length; i++) {
        temp += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td>
            <button onClick="updateProduct(${i})" class="btn btn-warning">Update</button>
        </td>
        <td>
            <button onClick="deleteProduct(${i})" class="btn btn-danger">delete</button>
        </td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = temp;
}

function deleteProduct(productIndex) {
    productContainer.splice(productIndex, 1);
    localStorage.setItem("productList", JSON.stringify(productContainer));

    displayData();
}

function updateProduct(index) {
    currentIndex = index
    productName.value = productContainer[index].name
    productPrice.value = productContainer[index].price
    productCategory.value = productContainer[index].category
    productDescription.value = productContainer[index].description
    myBtn.innerHTML = "Update Product";
}

function editData(){
    // console.log(currentIndex);
    productContainer[currentIndex].name = productName.value
    productContainer[currentIndex].price = productPrice.value
    productContainer[currentIndex].category =  productCategory.value
    productContainer[currentIndex].description = productDescription.value
    myBtn.innerHTML = "Add Product";
    localStorage.setItem("productList", JSON.stringify(productContainer));
    displayData();
    clearForm();
}


function search() {
    var term = searchInput.value
    var cartona = "";
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartona += `<tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].description}</td>
            <td>
                <button onClick="updateProduct(${i})" class="btn btn-warning">Update</button>
            </td>
            <td>
                <button onClick="deleteProduct(${i})" class="btn btn-danger">delete</button>
            </td>
        </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = cartona;
}
