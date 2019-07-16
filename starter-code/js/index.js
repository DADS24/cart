let newNode = ""
$( document ).ready(() => {
 newNode = document.querySelectorAll('.flex-type') // remove item only purpose
 let item = $(this).siblings('.article').text() 
 let price = parseFloat($('.price-unit').html())// Has all the prices
 let quantity = parseFloat($('.qty').val())//has all the quantities
 let total =0
 let newItem = document.getElementById("newItem")
 let totalBtn = $('#calc-prices-button')
 let totalPrice = document.querySelectorAll('.total-price')

 
$('.btn').click(e =>{
  $(e.target).closest(newNode).remove()
})
 
$("#new-item-create").click(e =>{
    let clonedNode = $('.flex-type:first').clone()
    let newItem = document.querySelector(".newItem").value
    let newPrice = document.querySelector('.priceNewItem').value    
        
    clonedNode[0].querySelector('.article').innerHTML = newItem
    clonedNode[0].querySelector('.price-unit').innerHTML = newPrice
    clonedNode[0].querySelector('#btn-delete').onclick = function(){
      
      removeItem(this)
    }
    clonedNode.appendTo('.content')  
  
})

totalBtn.click(e =>{
  total =getTotal(newNode)  
  
})
  
});

function removeItem(e){ // Remove item
  e.parentNode.parentNode.parentNode.remove()
  
}

function getTotal(newNode){
  let total = 0
  let totalPrice = document.querySelectorAll('.total-price')
  for(let i =0; i<newNode.length;i++){
    newNode[i].querySelector('#total-price').innerHTML = (newNode[i].querySelector('#price-unit').innerHTML) * (newNode[i].querySelector('.qty').value)   
    
  }
    
    
}