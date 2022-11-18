// http://api.fandango.com/<version>?op=<operation>&<parameter list>&apikey=<apikey>&sig=<sig>
const fandangoAPIkey = 'y8xzwnm8dc9mh2dynbjx43d3';
const FandangoSecretKey = 'c3U5keUBDh';

async function generateAPISig() {
const unixTimestamp = Date.now ();
const unhashedSig = fandangoAPIkey + FandangoSecretKey + unixTimestamp;

var textAsBuffer = new TextEncoder().encode(unhashedSig);
var hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
var hashArray = Array.from(new Uint8Array(hashBuffer))
var hashedSig = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
return hashedSig;
}

function fandangoAPICall() {
  const hashedSig = generateAPISig();
  const apiURL = `http://api.fandango.com/v1/?op=theatersbypostalcodesearch&postalcode=94105&apikey=${fandangoAPIkey}&sig=${hashedSig}`;

  fetch(apiURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
      console.log(data)      
    });
  }

  fandangoAPICall()