// div for profile info - overview
const overview = document.querySelector(".overview");
// username
const username = "CobyKalter";


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
};