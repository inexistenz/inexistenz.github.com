var userDataUrl = "https://api.github.com/users/inexistenz?callback=userDataCb";
var repoUrl = "https://api.github.com/users/inexistenz/repos?callback=repoDataCb";

var gitData = {};

var getUserData = function () {
  var s = document.createElement('script');
  s.type = "text/javascript";
  s.src = userDataUrl;
  document.body.appendChild(s);
};

var getRepoData = function () {
  var s = document.createElement('script');
  s.type = "text/javascript";
  s.src = repoUrl;
  document.body.appendChild(s);
};

var userDataCb = function(response) {
   gitData.user = {};
   gitData.user.meta = response.meta;
   gitData.user.data = response.data;

   $(".user").text(gitData.user.data.name);
   $(".avatar").prop("src", gitData.user.data.avatar_url);
};

var repoDataCb = function(response) {
   gitData.repo = {};
   gitData.repo.meta = response.meta;
   gitData.repo.data = response.data;
   gitData.repo.data.forEach(function(repo){
       if(repo.name != "inexistenz.github.io" && repo.name != "vim" && repo.name != "gitignore") {
           var html = '<li><a href="' + repo.html_url + '">' + repo.name + '</a></li>';
           $(".repos").append(html);
       }
   });
};

$(document).ready(function() {
    getUserData();
    getRepoData();
});
