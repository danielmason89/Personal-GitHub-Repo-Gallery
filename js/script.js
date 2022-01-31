// div where profile info will appear
const overview = document.querySelector(".overview");
// github username
const username = "danielmason89";
const repoList = document.querySelector(".repo-list");

const gitInfoGithub = async () => {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  // console.log(data);
  displayInfoGithub(data);
};

gitInfoGithub();

const displayInfoGithub = (data) => {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(div);
  fetchGithubRepos();
};

const fetchGithubRepos = async () => {
  const sortOneHundredRepo = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const data = await sortOneHundredRepo.json();
  // console.log(data);
  displayGithubRepos(data);
};

const displayGithubRepos = (repos) => {
  for (const repo of repos) {
    const repoLi = document.createElement("li");
    repoLi.classList.add("repo");
    repoLi.innerHTML = `<h3> ${repo.name}</h3>`;
    repoList.append(repoLi);
  }
};
