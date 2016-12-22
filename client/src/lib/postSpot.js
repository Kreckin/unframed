const postSpot = (data) => {
 //we make an object for the photo so the form knows how to read it
 const photo = {
  uri: `file://${data.uri}`,
  type: 'image/jpeg',
  name: 'photo.jpg',
};
//where the magic happens, we simulate a form and add everything we're passed to this form
 const form = new FormData();
 form.append('title', data.title);
 form.append('description', data.description);
 form.append('category', data.category);
 form.append('latitude', data.latitude);
 form.append('longitude', data.longitude);
 form.append('spot_image', photo);

 //a config object that tells the fetch function what to do
 const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
    },
    body: form,
  };
  //send a fetch rquest with our config file, complete with a body that contains our simulated form
   fetch('http://localhost:4040/spots', config)
    .then((response) => {
      console.log(response);
    }).catch(error => console.log(error));
 };


export default postSpot;
