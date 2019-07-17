let BASE_URL;
const xhr = new XMLHttpRequest();
xhr.overrideMimeType('application/json');
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      BASE_URL = JSON.parse(xhr.response);
    }
  }
};
xhr.open('get', './urlConfig.json', false);
xhr.send();