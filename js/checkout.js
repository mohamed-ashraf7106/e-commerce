import { products } from "./products.js";
let checkout = document.querySelector(".checkout");
// start logo 
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
let mode = false;
if(localStorage.length == 1){
  if(localStorage.key(0) == "mode"){
    checkout.innerHTML=`No items in cart`;
    checkout.style.cssText=`text-align:center;margin:52px auto;display:block;padding-top:10px`;
  }
};
mode = JSON.parse(localStorage.getItem("mode"));
// end logo 
let darkMode = document.querySelector(".darkMode");
darkMode.addEventListener("click",()=>{
  console.log("clicked");
  if (mode) {
    mode = false;
    localStorage.setItem("mode",mode)
    location.href = "checkout.html"
  }else{
    mode = true
    localStorage.setItem("mode",mode)
    location.href = "checkout.html"
  }
})
if (mode) {
    document.body.style.cssText ="color:white";
    document.documentElement.style.setProperty('--back-ground-',"#6B728E");
    document.documentElement.style.setProperty('--sec-back-ground-',"#50577A");
    document.documentElement.style.setProperty('--thi-back-ground-',"#474E68");
    document.documentElement.style.setProperty('--qua-back-ground-',"#404258");
    document.documentElement.style.setProperty('--pen-back-ground-',"#2a2b38");
}else{
    document.body.style.cssText ="color:black";
    document.documentElement.style.setProperty('--back-ground-',"#F2EFE5");
    document.documentElement.style.setProperty('--sec-back-ground-',"#E3E1D9");
    document.documentElement.style.setProperty('--thi-back-ground-',"#C7C8CC");
    document.documentElement.style.setProperty('--qua-back-ground-',"#B4B4B8");
    document.documentElement.style.setProperty('--pen-back-ground-',"#9c9ca0");
}
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
});
function addevents() {
  let removeCart = document.querySelectorAll(".removeCart");
  removeCart.forEach((e)=>{
    if (mode) {
      e.style.cssText =`color:white`;
      e.onmouseenter = () => {
        e.style.cssText="background-color:var(--pen-back-ground-);color:black;transition:0.3s";
      }
      e.onmouseleave = () => {
        e.style.cssText="background-color:var(--qua-back-ground-);color:white;transition:0.3s";
      };
    }else{
    e.style.cssText =`color:black`;
      e.onmouseenter = () => {
      e.style.cssText="background-color:var(--pen-back-ground-);color:white;transition:0.3s";
    }
    e.onmouseleave = () => {
      e.style.cssText="background-color:var(--qua-back-ground-);color:black;transition:0.3s";
    };
    }
  })
}
let total =0;
let totalP = document.querySelector(".total");
let totalTax =document.querySelector(".totalTax");
let itemList = document.querySelector(".itemList");
for (let i = 0; i < localStorage.length; i++) {
  for (let j = 0; j < products.length; j++) {
    if (products[j].id == localStorage.key(i)) {
      let li = document.createElement("li");
      let quantity = localStorage.getItem(`${localStorage.key(i)}`)
      li.innerHTML=`
      <div class="image">
        <img src="media/products/${products[j].src}" alt="">
      </div>
      <div class="itemData">
        <p>${products[j].name}</p>
        <p>Price:${products[j].priceCents/100}
          <span>${products[j].priceCents/100} X ${quantity} = ${(products[j].priceCents/100 * quantity).toFixed(2)}$</span>
        </p>
        <p>Brand:${products[j].brand}</p>
        <div class="remove">
          <button class="removeCart" id="${products[j].id}">remove</button>
        </div>
      </div>
    `
    total += products[j].priceCents/100 * quantity;
    totalP.innerHTML=`Total : ${total}$`;
    totalTax.innerHTML=`Total after Tax :${(total+total/10).toFixed(2)}$`;
    itemList.appendChild(li);
    continue;
    }
  }
}
addevents();
let removeCart =document.querySelectorAll(".removeCart");
removeCart.forEach((e)=>{
  e.addEventListener("click",()=>{
    localStorage.removeItem(e.id)
    location.href="checkout.html"
  })
});
let order = document.querySelector(".order");
order.addEventListener("mouseenter",()=>{
  if (mode) {
        order.style.cssText="background-color:var(--pen-back-ground-);color:black;transition:0.3s";
  }else{
      order.style.cssText="background-color:var(--pen-back-ground-);color:white;transition:0.3s";
  }
})
order.addEventListener("mouseleave",()=>{
  if (mode) {
      order.style.cssText="background-color:var(--qua-back-ground-);color:white;transition:0.3s";
  }else{
    order.style.cssText="background-color:var(--pen-back-ground-);color:black;transition:0.3s";
  }
})
order.addEventListener("click",()=>{
  localStorage.clear();
  checkout.innerHTML=`Order sent`;
  localStorage.setItem("mode",mode)
  checkout.style.cssText=`text-align:center;margin:52px auto;display:block;padding-top:10px`;
})