/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiKey = 'fee4010176a20f16650b00fff269e862';



const button = document.getElementById('generate');

button.addEventListener('click' , checkWeather );



async function checkWeather(){
    try{
        const zipCode = document.getElementById('zip').value;
        const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`; 
        const feeling = document.getElementById('feelings').value;
        getData(url)
        .then(await function(data){
            postData('/adddata' , {date:newDate , temp:data , content:feeling} )})
        
            updateUi('/all')}

            


    

    catch(error){
        console.log(error)
    }

}

const getData = async (url='')=>{
    console.log(url);
const res = await fetch(url);
try{
    const allData = await res.json();
    const temperature = allData.main.temp;
    return temperature;
}
catch(error){
console.log(error);
}}

const postData = async (url='' , data = {})=>{
    console.log(data)
    const response = await fetch(url , {
        method: "POST",
        credentials: "same-origin",
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });
    /* try{
        const newData = await response.json();
        console.log(newData)
        return newData;
    }
    catch(error){
        console.log(error);
    } */
}

const updateUi = async(url='')=>{
    const request = await fetch(url , {
        method:'GET',
        credentials: 'same-origin'
    });

    try{
        const newData = await request.json();
        document.getElementById('date').innerHTML = `Date = ${newData.date};`
        document.getElementById('temp').innerHTML = `Temp = ${newData.temp};`
        document.getElementById('content').innerHTML =`Feelings = ${newData.content};`
    }
    catch(error){
        console.log(error);
    }
}

