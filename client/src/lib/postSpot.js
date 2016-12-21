const postSpot = (data) => {
  console.log('I a posting a spot');
  console.log(JSON.stringify(data));
 
  fetch('http://localhost:4040/spots', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
    body: JSON.stringify(data)
  }).then((response) =>{
  	console.log(response)
  }).catch((error)=>{
  	console.log(error)
  })
};
//this will go through all of our data, check the category and tag it with an icon to later be used

export default postSpot;
