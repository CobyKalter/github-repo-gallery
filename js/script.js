// div for profile info - overview
const overview = document.querySelector(".overview");
// username
const username = "CobyKalter";
// repo list ul
const repoList = document.querySelector(".repo-list");


// fetching Github API
const grabGithub = async function () {
const users = await fetch (
    `https://api.github.com/users/${username}`
);
const data = await users.json();
console.log(data);
userDisplay(data);
};

grabGithub();

// display github user info on page
const userDisplay = function (data) {
const userInfoDiv = document.createElement("div");
userInfoDiv.innerHTML = `<div class="user-info"> <figure>
<img alt="user avatar" src=${data.avatar_url}/>
</figure>
<div>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Bio:</strong> ${data.bio}</p>
<p><strong>Location:</strong> ${data.location}</p>
<p><strong>Number of public repos:</strong> ${data.public_repos}</p>
</div>
</div>`;
overview.append(userInfoDiv);
repoGrab();
};

// fetching repos
const repoGrab = async function () {
    const repos = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    )
const repoData = await repos.json();
//console.log(repoData);
repoDisplay(repoData);
}
//repoGrab();

//Display repos
const repoDisplay = function (repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
    
};