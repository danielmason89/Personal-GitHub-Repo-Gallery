// div where profile info will appear
const overview = document.querySelector(".overview");
// github username
const username = "danielmason89";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

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

repoList.addEventListener("click", (e) => {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async (repoName) => {
  const getSpecificInfo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await getSpecificInfo.json();
  console.log(repoInfo);
  const fetchLanguage = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`
  );
  const languageData = await fetchLanguage.json();
  console.log(languageData);
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  console.log(languages);
  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = (repoInfo, languages) => {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repos.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${
    repoInfo.html_url
  }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(div);
};
