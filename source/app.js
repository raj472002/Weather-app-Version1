const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')




const app=express()



// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))









// app.get('',(req,res)=>{
//     res.send('<h1 style="font-size: 90px;">Weather</h1>')
// })
//
// app.get('/help',(req,res)=>{
//     res.send(
//         app.use(express.static(helpDirectory))
//     )
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })




//Define paths for express confg
const pathDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
 const partialPath=path.join(__dirname,'../template/partials')
//setup handlerbar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory

app.use(express.static(pathDirectory))





app.get('',(req,res)=>{
    res. render('index',{
        title:'Weather app',
        name:'Raj'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Raj'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'Enter the location to get the forecast. Enter a valid location otherwise no forecast will be  showed.',
        name:'Raj'
    })
})


app.get('/help/*',(req, res)=>{
    res.render('error',{
        title:'Error 404',
        message:'help article not found',

        name:'Raj'
    })
})


app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
          error:'please provide a search'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please provide a address'
        })
    }
    // console.log(req.query.address)
    // res.send({
    //     forecast:'Haze',
    //     location:'Jaipur'
    // })
    const address=req.query.address
    geocode(address ,(error,{latitude,longitude,location}={}
    )=>{
        if(error){
            return res.send({error})
        }


        forecast(latitude,longitude, (error, data) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:data,
                location,
                address:address
            })
        })

    })




})





app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        message:'Page not found!',
        name:'raj'
    })
})











app.listen(3000,()=>{
    console.log('the  server started on port 3000')
})