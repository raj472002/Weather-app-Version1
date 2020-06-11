const request=require('request')





const geocode=(address,callback)=>{
   const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFqLTM3IiwiYSI6ImNrOXdyZ3IydjA0bHczcnJqa3lkNnVweW0ifQ.46Xi_hnWAbnsYgmyuOLqdQ&limit=1'

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to  network',undefined)
        }else if(body.features.length===0){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode