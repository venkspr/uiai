function getResponse(){
  //console.log('https://apicrabsandcakes.venkspr.repl.co/app/?question='+document.getElementById('question').value);
  query = 'https://apicrabsandcakes.venkspr.repl.co/app/?question='+document.getElementById('question').value;
  const request = new Request(query,
    {method: 'GET'});
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
    document.getElementById('answer').value=window.sqlFormatter.format(response.choices[0].text);
    // ...
  }).catch(error => {
    console.error(error);
  });
  }
// self executing function here
function pageLoad() {
  //document.getElementById('answer').value='Hello world';
    // document.getElementById('answer').value=window.sqlFormatter.format('select * From dual');

};
  