// https://youtu.be/GWJhE7Licjs
// Using FormData Objects Effectively
// by Steve Griffith - Prof3ssorSt3v3

function convertFD2JSON(formData) {
    let obj = {};
    for (let key of formData.keys()) {
      obj[key] = formData.get(key);
    }
    return JSON.stringify(obj);
  }