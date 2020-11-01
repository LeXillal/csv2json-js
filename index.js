function csvJSON(csv){
  var lines=csvPrepare(csv).split("\n");
  var result = [];

  var headers=lines[0].split(",");
  for (var i = 0; i < headers.length; i++) {
    headers[i] = csvUnPrepare(headers[i])
  }

  for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
        index = headers[j]
        num = 1

        while (typeof obj[index] != 'undefined') {
          index = `${headers[j]}__${num}`
          num++
        }

        obj[index] = csvUnPrepare(currentline[j]);
      }
      result.push(obj);
  }

  return JSON.stringify(result); //convert in JSON

  function csvPrepare(txt) { // Replace all "escaped" comma and enter by a code
    txt = txt.split('"')
    for (var i = 1; i < txt.length; i+=2) {
      txt[i] = txt[i].replace(/,/g, '&[co&ma]&')
      txt[i] = txt[i].replace(/\n/g, '&[en&ter]&')
    }
    return txt.join('')
  }

  function csvUnPrepare(txt){ // Replace all code by comma or enter
    txt = txt.replace(/&\[co&ma\]&/g, ',')
    txt = txt.replace(/&\[en&ter\]&/g, '\n')
    return txt
  }
}
