// div for profile info - overview
const overview = document.querySelector(".overview");
// username
const username = "CobyKalter";
// repo list ul
const repoList = document.querySelector(".repo-list");
// selects the sections with repos class
const repoSection = document.querySelector(".repos");
// Selects section with repo-data class
const repoDataSec = document.querySelector(".repo-data");
// Selects Back Repo Gallery button
const backGalleryRepo = document.querySelector(".view-repos");
// Selects Search input
const filterInput = document.querySelector(".filter-repos");

// fetching Github API
const grabGithub = async function () {
    const users = await fetch(
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
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `<figure>
        <img alt="user avatar" src=${data.avatar_url}/>
        </figure>
        <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
    overview.append(userInfoDiv);
    repoGrab();
};

// fetching repos
const repoGrab = async function () {
    const repos = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    )
    const repoData = await repos.json();
    //console.log(repoData);
    repoDisplay(repoData);
}
//repoGrab();

//Display repos
const repoDisplay = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

// Click event for clicking on the displayed repos
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoSpecs(repoName);
    }
});

//fetching specific repo information
const repoSpecs = async function (repoName) {
    const repoInfoSrc = await fetch(
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await repoInfoSrc.json();
    console.log(repoInfo);
    //grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    //make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

// Display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoDataSec.innerHTML = "";
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataSec.append(repoDiv);
    repoDataSec.classList.remove("hide");
    repoSection.classList.add("hide");
    backGalleryRepo.classList.remove("hide");
};

// Click event for Back to Repos button
backGalleryRepo.addEventListener("click", function() {
    repoSection.classList.remove("hide");
    repoDataSec.classList.add("hide");
    backGalleryRepo.classList.add("hide");
});

// Input event for Search Box
filterInput.addEventListener("input", function(e) {
    const inputVal = e.target.value;
    console.log(inputVal);
    const repos = document.querySelectorAll(".repo");
    const inputLowCas = inputVal.toLowerCase();
    for (const repo of repos ) {
        const repoText = repo.innerText.toLowerCase();
            if (repoText.includes(inputLowCas)) {
                repo.classList.remove("hide");
            } else {
                repo.classList.add("hide");
            }
    }
});