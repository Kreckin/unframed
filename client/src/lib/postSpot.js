//import { FormData } from 'react';

const postSpot = (data) => {
  console.log('I a posting a spot');
  //console.log(JSON.stringify(data));
 console.log(data);
 const photo = {
  uri: `file://${data.uri}`,
  type: 'image/jpeg',
  name: 'photo.jpg',
};
 const form = new FormData();
 form.append('title', data.title);
 form.append('description', data.description);
 form.append('category', data.category);
 form.append('latitude', data.latitude);
 form.append('longitude', data.longitude);
 form.append('spot_image', photo);
 console.log(form);
 const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
      //'Content-Language': React.NativeModules.RNI18n.locale,
      //Authorization: 'Token ABCDEF123457890',
    },
    body: form,
  }
   fetch(`http://localhost:4040/spots`, config)
    .then(data=>console.log(data))
//}
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
