import { products } from "./products.js";
let logo = document.querySelector(".logo");
let logoTxt = document.querySelector(".logoText");
logo.addEventListener("mouseenter",()=>{
  logoTxt.style.cssText="color:#2e2e2e;transition:0.3s;";
  logo.style.cssText ="background-color:white;transition:0.3s;border:2px solid #2e2e2e";
});
logo.addEventListener("mouseleave",()=>{
  logoTxt.style.cssText="color:white;transition:0.3s;";
  logo.style.cssText ="background-color:#2e2e2e;transition:0.3s;border:2px solid white";
});
logo.addEventListener("click",()=>{
  location.href ="index.html";
})
// end logo 
// start cart icon 
  let iconDiv = document.querySelector(".cart");
  let icon = document.querySelector(".cartIcon");
  iconDiv.addEventListener("mouseenter",()=>{
    iconDiv.style.cssText="background-color:white;transition:0.3s;";
    icon.style.cssText="color:#2e2e2e;transition:0.3s";
  });
  iconDiv.addEventListener("mouseleave",()=>{
    iconDiv.style.cssText="background-color:#2e2e2e;transition:0.3s;";
    icon.style.cssText="color:white;transition:0.3s";
  });
  iconDiv.addEventListener("click",()=>{
    location.href = "checkout.html";
  })
// end cart icon  
let mode = true;
let productsDiv = document.querySelector(".products");
let i = 0;
for (i= 0 ; i < 40; i++) {
  appendPorducts(i)
}
addevents();
function appendPorducts(index) {
  let productDiv = document.createElement("div");
  productDiv.classList.add("product");
  let productBtn = document.createElement("button");
  productBtn.classList.add(`addcartbtn`);
  productBtn.innerHTML=`Add to cart`;
  productBtn.id = products[index].id;
  productDiv.innerHTML=`
  <div class="productImage">
  <img src="media/products/${products[index].src}" alt="">
  </div>
  <div class="name">
  <p>${products[index].name}</p>
  <div class="price">${products[index].priceCents/100}$</div>
    <p>Brand: ${products[index].brand}</p>
    </div>
    <input class="quantity ${products[index].id}" step="1" placeholder="quantity" type="number" min="0">
    <div class="addtocart" style="background-color: transparent; transition: all 0.3s ease 0s; border-radius: 10px;">
    ${productBtn.outerHTML}
    </div>`;
    productsDiv.appendChild(productDiv);
    addevents();
}
function addevents() {
  let productBtn = document.querySelectorAll(".addcartbtn")
  let inputs = document.querySelectorAll(".quantity")
  productBtn.forEach((e)=>{
    if (mode) {
      e.style.cssText = `color:black`
      e.onmouseenter = () => {
        e.style.cssText="background-color:var(--pen-back-ground-);color:white;transition:0.3s";
      }
      e.onmouseleave = () => {
        e.style.cssText="background-color:var(--qua-back-ground-);color:black;transition:0.3s";
      }
    }else{
      e.style.cssText = `color:white`
      e.onmouseenter = () => {
        e.style.cssText="background-color:var(--thi-back-ground-);color:black;transition:0.3s";
      }
      e.onmouseleave = () => {
        e.style.cssText="background-color:var(--qua-back-ground-);color:white;transition:0.3s";
      }
    }
  })
  for (let i = 0; i < productBtn.length; i++) {
    productBtn[i].onclick= function () {
      if(inputs[i].value < 1){
        alert("specify a quantity number >= 1");
        return;
      };
      if (inputs[i].value % 1 != 0) {
        alert("fixed decimal quantity to last integer")
        inputs[i].value = Math.floor(inputs[i].value)
      }
      localStorage.setItem(`${productBtn[i].id}`, +inputs[i].value);
    }
  }
}
let showmorebtn = document.querySelector(".showmorebtn");
showmorebtn.onclick = function () {
  let x = i + 10;
  if (i >= products.length) {
    showmorebtn.innerHTML=`No more products`;
    addevents();
    return;
  }
  for (;  i< x&& i<products.length ; i++) {
    appendPorducts(i)
  }
  addevents();
}
let filterbtn = document.querySelector(".filterbtn");
let category = document.getElementById("category");
let brand = document.getElementById("brand");
let price = document.getElementById("price");
let nav = document.getElementsByTagName("nav")[0];
filterbtn.addEventListener("click",()=>{
  productsDiv.innerHTML=``;
  nav.classList.add("displayNone");
  productsDiv.style.cssText =`margin-top: 90px;`
  showmorebtn.style.display ="none";
  for (let i = 0; i < products.length; i++) {
    if (products[i].category != category.value)
      continue;
    if (products[i].brand!=brand.value&&brand.value!="All") 
      continue;
    if (products[i].priceCents/100 <= price.value && price.value == 2500) {
      appendPorducts(i);
      addevents();
      continue;
    }
    if (products[i].priceCents/100 <= price.value && price.value == 5000) {
      appendPorducts(i);
      addevents();
      continue;
    }
    if (products[i].priceCents/100 <= price.value && price.value == 7500) {
      appendPorducts(i);
      addevents();
      continue;
    }else{
      appendPorducts(i);
      addevents();
    }
  }
});
let searchBar = document.querySelector(".searchBar");
searchBar.addEventListener("input",()=>{
  if (searchBar.value=="") {
    productsDiv.innerHTML=``;
    for (let i = 0; i < 40; i++) {
      appendPorducts(i);
    }
    showmorebtn.style.display="block";
    addevents()
    return;
  }
  showmorebtn.style.display="none";
  productsDiv.innerHTML=``;
  products.forEach((e,index)=>{
    if (e.name.toLowerCase().includes(searchBar.value.toLowerCase())) {
      appendPorducts(index)
    }
  })
  addevents()
})
let filterToggler = document.querySelector(".filterToggler");
filterToggler.addEventListener("click",()=>{
  nav.classList.toggle("displayNone");
  console.log(window.matchMedia("(min-width:1050px)").matches);

  if (window.matchMedia("(max-width:529px)").matches) {
    productsDiv.style.cssText =`margin-top: 283px;`
  } 
  else if (window.matchMedia("(max-width:1049px)").matches) {
    productsDiv.style.cssText =`margin-top: 175px;`
  }
  else if (window.matchMedia("(min-width:1050px)").matches) {
    productsDiv.style.cssText =`margin-top: 121px;`
  }
})
let darkMode = document.querySelector(".darkMode");
darkMode.addEventListener("click",()=>{
  dark()
})
export function dark(){
  if (mode) {
    document.body.style.cssText ="color:white";
    document.documentElement.style.setProperty('--back-ground-',"#6B728E");
    document.documentElement.style.setProperty('--sec-back-ground-',"#50577A");
    document.documentElement.style.setProperty('--thi-back-ground-',"#474E68");
    document.documentElement.style.setProperty('--qua-back-ground-',"#404258");
    document.documentElement.style.setProperty('--pen-back-ground-',"#2a2b38");
    document.documentElement.style.setProperty('--place-holder',"#eee");
    mode =false;
    localStorage.setItem("mode",JSON.stringify(!mode));
    addevents()
    let productBtn = document.querySelectorAll(".addcartbtn")
    productBtn.forEach((e)=>{
      e.style.cssText ="color:white";
    })
  } else{
    document.body.style.cssText ="color:black";
    document.documentElement.style.setProperty('--back-ground-',"#F2EFE5");
    document.documentElement.style.setProperty('--sec-back-ground-',"#E3E1D9");
    document.documentElement.style.setProperty('--thi-back-ground-',"#C7C8CC");
    document.documentElement.style.setProperty('--qua-back-ground-',"#B4B4B8");
    document.documentElement.style.setProperty('--pen-back-ground-',"#9c9ca0");
    document.documentElement.style.setProperty('--place-holder',"#333");
    mode =true;
    localStorage.setItem("mode",JSON.stringify(!mode));
    addevents()
    let productBtn = document.querySelectorAll(".addcartbtn")
    productBtn.forEach((e)=>{
      e.style.cssText ="color:black";
    })
  }
}
if (localStorage.getItem("mode")) {
  mode=JSON.parse(localStorage.getItem("mode"));
  addevents()
  dark()
}
