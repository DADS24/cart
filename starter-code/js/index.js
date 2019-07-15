function getPriceByProduct(itemNode){
  var totalPrices = [];
  var index= [];
  var total= 0;
  for (x = 0; x < itemNode[0].length; x++){
    totalPrices.push([itemNode[0][x].innerHTML * itemNode[1][x].value,itemNode[2][x]]);
  }
    totalPrices.map(function(aTotalPrice,index){
      updatePriceByProduct(aTotalPrice,itemNode[2][index]);
      total += aTotalPrice[0];
    });

  updatePriceTotal(total);
}

function updatePriceByProduct(productPrice, index){
  var value;
  if (productPrice[0] == 0){
    value = "0.00";
  }else{
    value = productPrice[0];
  }
  index.innerHTML = value;
}

function getTotalPrice() {
  var listOfElements = [];
  listOfElements.push(document.getElementsByClassName('price-unit'));
  listOfElements.push(document.getElementsByClassName('qty'));
  listOfElements.push(document.getElementsByClassName('total-price'));
  getPriceByProduct(listOfElements);
}

function updatePriceTotal(totalPrice){
  document.getElementById('spanFinalPrice').innerHTML = totalPrice;// = totalPrice;
}
function deleteItem(){
  this.parentNode.parentNode.parentNode.remove();
}

function createNewItem(divCopied) {
  divCopied.querySelector(".article").innerHTML=document.querySelector(".newItem").value;
  divCopied.querySelector(".price-unit").innerHTML=document.querySelector(".priceNewItem").value;
  divCopied.querySelector(".btn-delete").onclick= function(){
    this.parentNode.parentNode.parentNode.remove();
  };
  divCopied.querySelector(".qty").onchange=function(){
    detectChangeQuantity();
  };
  document.querySelector(".content").appendChild(divCopied);
}

function detectChangeQuantity(){
  var checkValue = document.querySelector('.qty').value;
  console.log(checkValue);
  if (checkValue < 0 || !/^\d+$/.test(checkValue)){
    document.querySelector('.qty').value = 1;
    alert("Please, insert a value");
  }
  else if(checkValue == 0){
    if (confirm('Are you sure you want to remove this item from your cart?')) {
    // Remove it!
    this.parentNode.parentNode.parentNode.remove();
    } else {
    // Do nothing!
    document.querySelector('.qty').value = 1;
    }
  }
  else{
    if (document.querySelector('.refreshOrNot').checked == true){
      getTotalPrice();
    }
  }
}
window.onload = function(){
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  var deleteButtons = document.getElementsByClassName('btn-delete');
  var quantityBox = document.getElementsByClassName('qty');
  var autoRefreshEnabled = document.querySelector('.refreshOrNot');
  var setCopy = document.querySelector(".info").cloneNode(true);
  var buttonRefresh;
  // Initial Price
  getTotalPrice();
  calculatePriceButton.onclick = getTotalPrice;
  // Anonymous function for not auto execute
  createItemButton.onclick = function(){
    // cloneNode(true) Childs copy too
    var valueEmpty = document.querySelector(".newItem");
    var priceEmpty = document.querySelector(".priceNewItem");
    if (valueEmpty.value == ""){
      alert("Please, fill item product");
    }else{
      if (document.querySelector(".info") != null){
        setCopy = document.querySelector(".info").cloneNode(true);
      }
      if (priceEmpty.value == ""){
        priceEmpty.value = 0;
      }
      createNewItem(setCopy);
      getTotalPrice();
      valueEmpty.value = "";
      priceEmpty.value = 0;
    }
  };
  autoRefreshEnabled.onchange = function(){
    buttonRefresh = document.querySelector(".btn-success");
    if (document.querySelector('.refreshOrNot').checked == true){
      buttonRefresh.disabled = true;
      buttonRefresh.style.backgroundColor = "#cacaca";
      buttonRefresh.style.borderColor = "#ffffff";
    }
    else{
      buttonRefresh.disabled = false;
      buttonRefresh.style.backgroundColor = "#5cb85c";
      buttonRefresh.style.borderColor = "#4cae4c";
    }
  };
  for(var i = 0; i<deleteButtons.length ; i++){
    deleteButtons[i].onclick = deleteItem;
  }
  for(var z = 0; z<quantityBox.length; z++){
    quantityBox[z].onchange = detectChangeQuantity;
  }
};

// external js
// https://draggabilly.desandro.com/draggabilly.pkgd.js

// use left/top for all positioning
Draggabilly.prototype.positionDrag = Draggabilly.prototype.setLeftTop;

$( function() {
  $('.knob').each( function( i, knob ) {
    var draggie = new Draggabilly( knob, {
      containment: true,
      axis: 'x'
    });
    draggie.on( 'dragMove', onDragMove );
    draggie.on( 'dragEnd', onDragEnd );

  });
});

function onDragMove() {
  var $knob = $( this.element );
  var $label = $knob.parents('label');
  // on initial drag move
  if ( !this.hasDragged ) {
    this.movePotential = $knob.parent().width() - $knob.width();
    $label.on( 'click', onLabelClickDragging );
    this.input = $label.find('input')[0];
    this.hasDragged = true;
  }

  var isChecked = this.position.x > this.movePotential / 2;
  this.input.checked = isChecked;
}

// disable label clicks when dragging
function onLabelClickDragging( event ) {
  event.preventDefault();
}

function onDragEnd() {
  // clear out Draggabilly's position setting
  this.element.style.left = '';
  delete this.hasDragged;
  var $knob = $( this.element );
  var $label = $knob.parents('label');
  setTimeout( function() {
    $label.off( 'click', onLabelClickDragging );
  });
}
