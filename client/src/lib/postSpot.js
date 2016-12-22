//import { FormData } from 'react';

const postSpot = (data) => {
  console.log('I a posting a spot');
  //console.log(JSON.stringify(data));
 console.log(data)
 //This takes data from AddSpot.js and sends a post request to the server
 const form = new FormData();
 form.append('title',data.title)
 form.append('description',data.description)
 form.append('category',data.category)
 form.append('latitude',data.latitude)
 form.append('longitude',data.longitude)
 console.log(form)

//   fetch('http://localhost:4040/spots', {
//     method: 'POST',
//     headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//     body: JSON.stringify(data)
//   }).then((response) =>{
//   	console.log(response)
//   }).catch((error)=>{
//   	console.log(error)
//   })
 };


export default postSpot;
