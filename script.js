
var txt;
var i = 0;
function mockResponse() {
  txt = `SELECT
  *
FROM
  worker
WHERE
  sex = 'F'
  and age < ALL (
    SELECT
      MIN(age)
    FROM
      worker
  );`
  i = 0;
  typeWriter();

}



function getResponse() {
  //console.log('https://apicrabsandcakes.venkspr.repl.co/app/?question='+document.getElementById('question').value);
  var _query
  document.getElementById('language').value;
  if (document.getElementById('language').value == 'sql') {
    _query = 'https://apicrabsandcakes.venkspr.repl.co/app/?question='
  } else {
     document.getElementById('placeHolder').innerHTML='';
    _query = 'https://apicrabsandcakes.venkspr.repl.co/react/?question='
  }
  query = _query + document.getElementById('question').value;
  const request = new Request(query,
    { method: 'GET' });
  fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
    .then(response => {
      // console.log(response);
      // console.log(response.choices[0].text);
      document.getElementById('answer').value = "";
      if (document.getElementById('language').value == 'sql') {
        txt = String(window.sqlFormatter.format(response.choices[0].text));
        i = 0;
        typeWriter('answer');
      } else {
        document.getElementById('answer').value = "";
        txt = response.choices[0].text;
        i = 0;
        typeWriter('answer');
      }
      // document.getElementById('answer').value=window.sqlFormatter.format(response.choices[0].text);
      // ...
    }).catch(error => {
      console.error(error);
    });
}
var comment='';
var log;
// self executing function here
function pageLoad() {
document.getElementById('answer').addEventListener('keyup', logKey);
  //document.getElementById('answer').value='Hello world';
  // document.getElementById('answer').value=window.sqlFormatter.format('select * From dual');
log = document.getElementById('placeHolder');
};

function typeWriter() {
  if (i < txt.length) {
    document.getElementById('answer').value += txt.charAt(i);
    i++;
    setTimeout(typeWriter, 10);
      if(i>txt.length-1){
          document.getElementById('placeHolder').innerHTML=txt;

      }
  }
}

function logKey(e) {
  console.log(e.browserEvent.key);
  if (IsAlphaNumericTour(e.browserEvent.key) &&  e.browserEvent.key.length<2){
          console.log('inside logkey');
      comment+= e.browserEvent.key;
      console.log(comment);
  }
  
  if (e.keyCode==8)
    comment=comment.slice(0, -1)

        if (e.keyCode == 91) {
      //console.log('submitting');
      appendResponse(comment);
      comment="";
  }
}

function appendResponse(comment) {
  var query;
  //console.log('https://apicrabsandcakes.venkspr.repl.co/app/?question='+document.getElementById('question').value);
    query = 'https://apicrabsandcakes.venkspr.repl.co/react/?question='+ comment;
    const request = new Request(query,
    { method: 'GET' });
  fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
    .then(response => {
      // console.log(response);
      // console.log(response.choices[0].text);
      document.getElementById('answer').value+= " \r\n " +response.choices[0].text ;  
      document.getElementById('placeHolder').innerHTML+=response.choices[0].text + "</br>" ;
      // document.getElementById('answer').value=window.sqlFormatter.format(response.choices[0].text);
      // ...
    }).catch(error => {
      console.error(error);
    });
}
var comment='';
var log;
// self executing function here
function pageLoad() {
document.getElementById('answer').addEventListener('keyup', logKey);
  //document.getElementById('answer').value='Hello world';
  // document.getElementById('answer').value=window.sqlFormatter.format('select * From dual');
log = document.getElementById('placeHolder');
};

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };
let proxy = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min'
    };
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/base/worker/workerMain.min.js');
`], { type: 'text/javascript' }));
require(["vs/editor/editor.main"], function () {
    let editor = monaco.editor.create(document.getElementById('container'), {
        value: `function x() {
  console.log("Hello world!");
}`,
        language: 'html',
        theme: 'vs-dark'
    });
    editor.onKeyUp(function(e) { console.log(e); 
        console.log(e.browserEvent.keyCode);
    logKey(e); });
});

function IsAlphaNumericTour(e) {
  var key = e;
  var regex = new RegExp(/[a-zA-Z0-9 ]/);
  var ret = regex.test(e);
  // This method returns true if it finds a match, otherwise it returns false.
  return ret;
}