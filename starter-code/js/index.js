
$( document ).ready(() => {
 let newNode = document.querySelectorAll('.flex-type') // remove item only purpose
 let totalBtn = $('#calc-prices-button')
 let modelListClone = $('.flex-type:first')
 let deleteBtn = $('#btn-delete')


 deleteBtn.click(e =>{
  console.log("Hola")
  
})

$("#new-item-create").click(e =>{
    createCollectionInDatabase()   
})

totalBtn.click(e =>{
  newNode = document.querySelectorAll('.flex-type')
  total =getTotal(newNode)  
  
})

function loadDatabase(){
axios.get('http://localhost:5000/articulos')
  .then((data) =>{
    refreshDatabaseIntoList(data['data']);//Se tiene que hacer dentro de Then, si no provoca errores de asincronia
    
  })
  .catch(e =>console.log("Error"))
}
loadDatabase()

function removeAllDataList(){
  $('.containerList').empty()
}

function refreshDatabaseIntoList(db){
  removeAllDataList()
  let total = 0
  db.forEach(e =>{
    let clone = modelListClone.clone()
    clone[0].querySelector('.article').innerHTML = e['name']
    clone[0].querySelector('.qty').value = e['quantity']  
    clone[0].querySelector('.price-unit').innerHTML = e['price']
    clone[0].querySelector('#total-price').innerHTML=  e['price'] * e['quantity'] 
    total +=  e['price'] * e['quantity']
    clone[0].querySelector('#btn-delete').onclick = function(){      
      removeItemInDatabase(e['_id'])
    }
    clone[0].querySelector('.qty').onchange= function(){
      
      updateQuantity = {
        '_id':e['_id'],
        'quantity':this.value
      }      
      updateQuantityInDataBase(updateQuantity)
      
    }
    clone.appendTo('.containerList')
    console.log(total);
    
    $('#spanFinalPrice').html(total)
  })
  

}
function createCollectionInDatabase(){
  /*meter en la base de datos*/
  dataToInsert = {}
  dataToInsert['name']=document.querySelector(".newItem").value
  dataToInsert['price']=document.querySelector(".priceNewItem").value
  dataToInsert['quantity']=1
  
  axios.post('http://localhost:5000/articulos', dataToInsert)
        .then(response =>{
          loadDatabase()
        })
        .catch(e =>console.log("error en exportar datos"))
}


function removeItemInDatabase(nameToDelete){ // Remove itemS  
  dataToDelete= {}
  dataToDelete['_id']= nameToDelete

  axios.post('http://localhost:5000/articulos/remove', dataToDelete)
        .then(response =>{
          loadDatabase()
        })
        .catch(e =>console.log("error al eliminar datos"))
  
}
function updateQuantityInDataBase(updateQty){
 dataToUpdate = {}
 dataToUpdate['_id'] = updateQty['_id']
 dataToUpdate['quantity'] = updateQty['quantity']

 axios.patch('http://localhost:5000/articulos/patch', dataToUpdate)
      .then(response =>{
        loadDatabase()
      })
      .catch(e => console.log("Update Error"))
}

function getTotal(newNode){
  let total = 0
  for(let i =0; i<newNode.length;i++){console.log(newNode[i])
    newNode[i].querySelector('#total-price').innerHTML = (newNode[i].querySelector('.price-unit').innerHTML)
                                                          * (newNode[i].querySelector('.qty').value)   
    total += parseFloat(newNode[i].querySelector('#total-price').innerHTML)
  }
  $('#spanFinalPrice').text(total)  
}
function createItem(){
  let clonedNode = $('.flex-type:first').clone()
  let newItem = document.querySelector(".newItem").value
  let newPrice = document.querySelector('.priceNewItem').value    
      
  clonedNode[0].querySelector('.article').innerHTML = newItem
  clonedNode[0].querySelector('.price-unit').innerHTML = newPrice
  clonedNode[0].querySelector('#btn-delete').onclick = function(){      
    removeItem(this)
  }
  clonedNode.appendTo('.content')  
}
});

