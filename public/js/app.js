console.log('client side js file')


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })





const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#m1')
const message2=document.querySelector('#m2')
const message3=document.querySelector('#m3')
const message4=document.querySelector('#m4')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value

    message1.textContent='loading...'
    message2.textContent=''
    message3.textContent=''
    message4.textContent=''

    const symbol='°ᶜ\n'

    console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent=data.error
            }else{
                message1.textContent=data.location
                message2.textContent=data.forecast.temperature+symbol
                message3.textContent=data.forecast.weather_descriptions+'. '
                message4.textContent='Precipitation: '+data.forecast.precip+"%"
            }
        })
    })

})