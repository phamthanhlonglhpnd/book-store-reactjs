import { Buffer } from 'buffer';

export const convertToImage = (item) => {
  let imageBase64 = '';
  if (item) {
    imageBase64 = Buffer(item, 'base64').toString('binary');
  }
  return imageBase64;
}

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

export const convertArrayToSelectedOpject = (array) => {
  let newArray = array && array.length > 0 && array.map(item => {
    let newObject = {};
    newObject.value = item.id;
    newObject.label = item.name;
    return newObject;
  });
  return newArray
}

export const convertObjectToSelectedOpject = (object) => {
  let newObject = {};
  newObject.value = object.id;
  newObject.label = object.name;
  return newObject;
}

export const handleDate = (date) => {

}