const request=require('request')



const forecast=(lat,long,callback)=>{
  const  url='http://api.weatherstack.com/current?access_key=2dc5fb8c15dde45ebdc02943cf7878a6&query='+lat+','+long+'&units=m'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to network..please try  again',undefined)
        }else if(body.error){
            callback('unable to find location please enter a valid location')
        }else{
            callback(undefined,
               // body.current.weather_descriptions[0] + '. there is ' + body.current["temperature"] + ' degree in ' + body.location["name"] + ' and there is ' + body.current["precip"] + '% chances of rain')
                    body.current)

        }
    })


}



module.exports=forecast