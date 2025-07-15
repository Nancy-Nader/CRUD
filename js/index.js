var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var productImageInput = document.getElementById('productImage');
var productSearch = document.getElementById('productsSearch');
var addBtn=document.getElementById('addBtn');
var updateBtn=document.getElementById('updateBtn');
var updatedIdx;
var productsContainer = [];
if (localStorage.getItem("products") !== null) {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts(productsContainer);

}
function addProduct() {
    if(validateForm(productNameInput)&&validateForm(productPriceInput)&&validateForm(productCategoryInput)&&validateForm(productDescInput)){
        var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
        image: `./images/${productImageInput.files[0].name}`
    }
    productsContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productsContainer))
    clearForm();
    displayProducts(productsContainer);
    console.log(productsContainer)

    }
    
}
function clearForm() {
    productNameInput.value = '',
        productPriceInput.value = '',
        productCategoryInput.value = '',
        productDescInput.value = '',
        productImageInput.value = ''
}
function displayProducts(list) {
    var blackBox = '';
    for (var i = 0; i < list.length; i++) {
        blackBox += `<div class="col-md-2 col-sm-6">
                    <div class="card">
                        <img src="${list[i].image}" class=" img-fluid" alt="productName">
                    </div>
                    <div class="cardBody">
                        <h2 class="h4 mt-3">${list[i].name}</h2>
                        <p class=" text-secondary mb-2">${list[i].desc}</p>
                        <h3 class="h5"><span class=" fw-bolder">Price: </span> ${list[i].price}</h3>
                        <h3 class="h5"><span class=" fw-bolder">Category: </span> ${list[i].category}</h3>
                        <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete <i class="fas fa-trash"></i></button>
                        <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>
                    </div>
                </div>`
    }
    document.getElementById('rowData').innerHTML = blackBox;

}
function deleteProduct(productIdx){
    productsContainer.splice(productIdx,1);
    console.log(productsContainer);
    displayProducts(productsContainer);
    localStorage.setItem("products", JSON.stringify(productsContainer))
}
function searchProducts(){
    var term=productSearch.value;
    var matchesProducts=[];
    for(var i=0;i<productsContainer.length;i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            matchesProducts.push(productsContainer[i]);
        }
        
    }
    displayProducts(matchesProducts)
}
function setFormForUpdate(i){
    updatedIdx=i;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    productNameInput.value=productsContainer[i].name;
    productPriceInput.value=productsContainer[i].price;
    productCategoryInput.value=productsContainer[i].category;
    productDescInput.value=productsContainer[i].desc;
}
function updateProduct(){
    productsContainer[updatedIdx].name=productNameInput.value;
    productsContainer[updatedIdx].price=productPriceInput.value;
    productsContainer[updatedIdx].category=productCategoryInput.value;
    productsContainer[updatedIdx].desc=productDescInput.value;
    displayProducts(productsContainer);
    localStorage.setItem("products", JSON.stringify(productsContainer))
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    clearForm()
}
function validateForm(input){
    var regex={
        productName:/^[A-Z][a-z]{2,15}$/,
        productPrice:/^[1-9][0-9]{2,10}/,
        productCategory:/^(Tv|Mobile|Laptop|screens|Smart Watch)$/,
        productDesc:/^\w{5,350}$/
    }
    var isValid=regex[input.id].test(input.value);
    console.log(isValid)
    if(isValid){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        input.nextElementSibling.classList.replace('d-block','d-none')

    }else{
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        input.nextElementSibling.classList.replace('d-none','d-block')
    }
    return(isValid)
}