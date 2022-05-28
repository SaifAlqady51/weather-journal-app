/* Global Variables */

const btn = document.getElementById('generate')

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.toDateString()


// Get data from openWeather api

const getData = async () => {

    const zip_code =  document.getElementById('zip').value;
    const API_key = 'ed943cf83a56dc48bf5d32b0f5f90714&units=imperial';
    const openWeather_api_url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},&appid=${API_key}`

    try{
        const response = await fetch(openWeather_api_url);
        const data = await response.json();
        return data;
    }catch(err){
        
        console.log('Error',err);
    }

}

// Post data from openWeather api to your local server
const postData = async (url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials:"same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const info = await response.json();
        return info;
    }catch (err) {
        console.error(err);
    }
};


// Send from your local server to the browser and update the UI

const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData =  await request.json();
        const feelings = document.getElementById('feelings');
        // Choose data divs and update it with the data

        document.getElementById('date').innerHTML = '- Date: ' + allData.date ;
        document.getElementById('temp').innerHTML = '- Temperature: ' + allData.temp + ' degrees'; 
        document.getElementById('content').innerHTML = '- Feelings: ' + allData.feelings; 
        

    }catch(e){
        console.log('Error',e)
    }
}


// Putting all the steps together in one function

const performAction = async () =>{
    getData()
    .then((data) => {
        return postData('/api',{date:newDate,temp:Math.round(data.main.temp),feelings: feelings.value})
    })
    .then(() => {
        updateUI()
    })
    .catch(err =>{
        console.log('Error',err)
    })

    
}

// button click Event to exexute all the steps  

btn.addEventListener('click',performAction)


