
// File APIs supporting check
if ( ! (window.File && window.FileReader && window.FileList && window.Blob)) {
    alert('The File APIs are not fully supported in this browser.');
  }
  
// Handling file function
function handleFileSelect(evt) {
  var file = evt.target.files[0];
  if (!file.type.match('text.*')) {
    return alert(file.name + " is not a valid text file.");
  }
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (e) {
    var textForInput = reader.result; 
    var rows = textForInput.match(/\n/g);
    if (rows.length > 7) {
      document.getElementById('text').style.height = `${rows.length*30}px`;
      document.getElementById('input').style.height = `${rows.length*30}px`
    };
    document.getElementById('text').innerHTML = textForInput.replace(/\n/g, "<br>");
    document.getElementById('input').value = textForInput;
  };
};

// Call of the function  
window.onload = function () {
  document.getElementById('file').addEventListener('change', handleFileSelect, false);
};
 
// Code for switching <textarea> and <p> on click
$("#text").on("click", function() {
  $("#text").hide(); 
  $("#input").show();
});
$(document).on('click', function(event) {
  if (!$(event.target).closest('#text').length && !$(event.target).closest('#input').length) {
    $("#text").show();
    $("#input").hide();
  }
});

// Finding a word and highlighting it function 
document.querySelector('#find').onclick = function() {
  var TextInput = document.getElementById('input').value;
  var strFindWord = document.getElementById('inputWord').value;
  if (strFindWord != "") {
    var regFindWord = new RegExp(document.getElementById('inputWord').value,'gi');
    var textHighlight = TextInput.replace(regFindWord, `<span class="text_highlight"> ${strFindWord} </span>`);
    document.getElementById('text').innerHTML = textHighlight.replace(/\n/g, "<br>");
  };
};
  
// Replacing a word function
document.querySelector('#replace').onclick = function() {
  var TextInput = document.getElementById('input').value;
  var strFindWord = document.getElementById('inputWord').value;
  var strReplaceWord = document.getElementById('replaceWord').value; 
  if ((strFindWord != "") && (strReplaceWord != "")) {
    var regFindWord = new RegExp(document.getElementById('inputWord').value,'gi');
    var newText = TextInput.replace(regFindWord, `<span class="text_highlight"> ${strReplaceWord} </span>`);
    var newInput = TextInput.replace(regFindWord, strReplaceWord);
    document.getElementById('input').value = newInput;
    document.getElementById('text').innerHTML = newText.replace(/\n/g, "<br>");
    $(function(){
      $('.text_highlight').toggleClass('text_replace');
    });
  };
};

// Copy <textarea> changes in <p>, if any
document.getElementById('input').oninput = function() {
  var newInput = document.getElementById('input').value;
  document.getElementById('text').innerHTML = newInput.replace(/\n/g, "<br>");
};

// Saving a file function
document.getElementsByTagName('a')[0].onclick = function() {  
  var txt = document.getElementById('input').value;                
  var txtData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(txt);
  this.href = txtData;
  this.target = '_blank';
  this.download = 'edith.txt';
};
  