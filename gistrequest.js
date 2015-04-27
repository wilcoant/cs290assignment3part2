/*function myFunction() {
    var x = document.getElementById("myCheck");
    x.checked = true;
}*/
//setup local storage
var favorites = null;

function urlStringify(obj){
    var str = [];//got form cs290 lecture
    for(var prop in obj){
        var s = encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]);
    }
}
var GistObj = []; //declare empty array for GistObj
function getGists(){
    var req = new XMLHttpRequest(); //based on example from cs290 AJAx lecture
    if(!req){
        throw 'Unable to create Http Request';
    }//exit if
    var url = 'https://api.github.com/gists';
    var x = document.getElementById("pages").selectedIndex//get elements of pages array
    console.log(x);
    var numpages = x + 1;
    console.log(numpages);
    var params = {
        page: numpages,
    }
    url += '?' + urlStringify(params);
     req.onreadystatechange = function(){
        if(this.readyState === 4 && this.status ==200){//4 means full server response has been received and it's ok to continue
        //0 uninitialized; 1 loading; 2 loaded; 3 interactive; 4 complete
            GistObj = JSON.parse(this.responseText);
            localStorage.setItem('favorites', GistObj);
            console.log(GistObj[1]);
            createGistList();
            /* for(var i; i < GistObj.length; i++){
            //var url = GistObj.list[i].html_url;
            //var description = GistObj.list[i].description;
            creatGistList(document.getElementById('results'), GistObj.list[i]);
            }//exit for */
        }//exit if
     }//exit on ready state function exit
            /* httpRequest.open('GET', 'http://www.example.org/some.file', true);
              httpRequest.send(null); keep GET capitalized
           httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');    */
        req.open('GET', url, true);
        req.send();
}


function createGistList(){
    //function creatGistlist(GistObj)
//from CS290 Lecture
   
  
   var list = document.getElementById('results');
   console.log(GistObj.length);
   list.textContent = 'Search Results:';
   for(var i = 0; i < GistObj.length; i++)
   {//general technique found here http://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array
       
       var li = document.createElement('li');
       var a = document.createElement('a');
       a.setAttribute('href', GistObj[i].html_url); //technique from http://stackoverflow.com/questions/9831074/dynamically-create-link-javascript
       if(GistObj[i].description != ' ')
       a.appendChild(document.createTextNode(GistObj[i].description));
       li.appendChild(a);
       list.appendChild(li);
   }//exit for
   return list;

}





