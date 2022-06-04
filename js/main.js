let deckId = ''

const userCardsImg = document.querySelectorAll('.userCardsImg')
const userCardsName = document.querySelectorAll('.userCardsName')
const userResult = document.querySelector('.userResult')
const hide = document.querySelectorAll('.hide')
const hide2 = document.querySelector('.hide2')
const hide3 = document.querySelector('.hide3')
const draw = document.querySelector('.draw')
const lock = document.querySelector('.lock')
const botDraw = document.querySelectorAll('.botDraw')

let userVal = ''

let playersCard = []
let playersPic = []
let playersValue = []
let playersName = []

fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?cards=2S,3S,4S,5S,6S,7S,8S,9S,0S,2D,3D,4D,5D,6D,7D,8D,9D,0D,2C,3C,4C,5C,6C,7C,8C,9C,0C,2H,3H,4H,5H,6H,7H,8H,9H,0H`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      deckId = data.deck_id
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

document.querySelector('.start').addEventListener('click', startGame)

function startGame () {
  document.querySelector('.start').classList.add('hide')
  hide.forEach(x => x.classList.remove('hide'))

  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=12`)

    .then(res => res.json()) // parse response as JSON
    .then(data => {

      for (let i = 0; i< 4; i++){
        playersCard.push(data.cards.slice(i * 3, (i * 3) + 3))
      }

      playersPic = playersCard.map(x=> x.map(a => a.image))
      
      playersName = playersCard.map(x=> x.map(a => `${a.value} of \n${a.suit}`))

      playersValue = playersCard.map(x=> x.map(a => Number(a.value))).map(x => [x.slice(0,2).reduce((a,b) => a+b,0) % 10, x[2]])

      for (let i = 0; i < 3; i++) {
        userCardsImg[i].src = playersPic[0][i]
        userCardsName[i].innerText = playersName[0][i]
      }

      userResult.innerText = `The value of your deck is currently ${playersValue[0][0]}`

      userVal = playersValue[0][0]

      console.log(playersCard)
      console.log(playersPic)
      console.log(playersName)
      console.log(playersValue)

      return userVal

 
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}


// ======================================================
//                      DRAW FUNCTION
//=========================================================

draw.addEventListener('click', userDraw)

function userDraw () {
  hide2.classList.remove('hide2')
  userVal = (playersValue[0][0] + playersValue[0][1]) % 10
  userResult.innerText = `The value of your deck is currently ${userVal}`

  return userVal
  
}

// ======================================================
//                      LOCK FUNCTION
//=========================================================

lock.addEventListener('click', getResults)

function getResults () {
  hide3.classList.remove('hide3')
  let botVal = playersValue.slice(1)
  botVal = botVal.map(x => x[0] >=5 ? x[0] : (x[0] + x[1]) % 10)

  console.log(botVal)
  console.log(userVal)
  
}