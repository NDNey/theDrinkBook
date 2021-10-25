const edit = document.querySelector("#edit");
const trash = document.getElementsByClassName("fa-trash-o");
const params = new URLSearchParams(window.location.search)
const editName = document.querySelector('#name')
const editImage = document.querySelector('#image')
const editRecipe = document.querySelector('#text')

console.log('hello', params.get('id'))

 


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(e){
        const name = this.parentNode.parentNode.parentElement.firstElementChild.nextElementSibling.innerText
        const trash = e.target.value
        console.log(trash)
        // const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'id':trash
            // 'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});



///////////////////////////////////////


document.querySelector('#search').addEventListener('click', getDrink)

function getDrink(){
  console.log('ajsndadsjknj')
  const inputVal = document.querySelector('.form-control').value
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputVal}`

  fetch(url)
      .then(res => res.json())  
      .then(data => {
        let drinkName = data.drinks[0].strDrink
        let drinkThumb = data.drinks[0].strDrinkThumb
        let drinkInst = data.drinks[0].strInstructions
        document.querySelector('h2').innerText = drinkName
        document.querySelector('.drinkImg').src = drinkThumb
        document.querySelector('.text').innerText = drinkInst
        document.querySelector('.saveName').value = drinkName
        document.querySelector('.saveUrl').value = drinkThumb
        document.querySelector('.recipe').value = drinkInst
      })
      .catch(err => {
          console.log(`error ${err}`)
      })
}
edit.addEventListener('click', function(){

        
        fetch('edit', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            
            'name': params.get('name'),
            'newName':editName.value,
            'recipe': editRecipe.value ,
            'image':editImage.value

          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
 