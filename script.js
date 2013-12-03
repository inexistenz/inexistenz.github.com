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

    var userClasses = document.getElementsByClassName("user");
    var len = userClasses.length;

    for(i = 0; i < len; ++i){
        userClasses[i].innerHTML = gitData.user.data.name;
    }

    document.title = gitData.user.data.name + "'s Github Page";
    //$(".user").text(gitData.user.data.name);
    //$(".avatar").prop("src", gitData.user.data.avatar_url);
};

var repoDataCb = function(response) {
    gitData.repo = {};
    gitData.repo.meta = response.meta;
    gitData.repo.data = response.data;
    gitData.repo.data.forEach(function(repo){
        if(repo.name != "inexistenz.github.io" && repo.name != "vim" && repo.name != "gitignore") {
            var html = '<a target="_blank" href="' + repo.html_url + '">' + repo.name + '</a>';

            repoList = document.getElementsByClassName("repos");
            var len = repoList.length;

            for(i = 0; i < len; ++i){
                node = document.createElement("li");
                node.innerHTML = html;
                repoList[i].appendChild(node);
            }
            //$(".repos").append(html);
        }
    });
};

var fn = function() {
    getUserData();
    getRepoData();
}

if(document.addEventListener){
    document.addEventListener('DOMContentLoaded', fn, false);
}else{
    window.onload = fn;
}
//window.addEventListener('load', fn, false);
//document.attachEvent("onreadystatechange", fn);
