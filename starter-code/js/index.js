$( document ).ready(() => {
 let newNode = $('.flex-type').clone()
  console.log(newNode);
  
 $(".btn").click((e) => {
  $(e.target).closest(newNode).remove()
  console.log("click");
  
});

  
  
  
  

  
});
