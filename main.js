

class App {
  constructor() {

    this.repositories = [];

    this.formEl = document.getElementById('repo-input');
    this.listEl = document.getElementById('repo-list');

    this.inputEl = document.querySelector('input[name=repository]');

    this.registerHandlers();
  }

  registerHandlers() {

    this.formEl.addEventListener('click', event => this.addRepository(event))
  }

  async addRepository(event) {
    event.preventDefault();


    const repoInput = this.inputEl.value;
    if (repoInput === 0) {
      return;
    }


    const responseIl = await axios.get(`https://api.github.com/users/${repoInput}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));

      const { login, bio, avatar_url, public_repos, html_url } = responseIl;
      this.repositories.push({
        login,
        bio,
        avatar_url,
        public_repos,
        html_url, 
      });
      
    this.render();
  }

  render() {

    this.listEl.innerHTML = '';
    
    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.login));

      let bioEl = document.createElement('p');
      bioEl.appendChild(document.createTextNode(repo.bio));

      let reposiEl = document.createElement('spam');
      reposiEl.appendChild(document.createTextNode(`N° repository: ${repo.public_repos}`))

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url)
      linkEl.appendChild(document.createTextNode('Acessar'));

      let ListItemEl = document.createElement('li');
      ListItemEl.appendChild(imgEl);
      ListItemEl.appendChild(titleEl);
      ListItemEl.appendChild(bioEl);
      ListItemEl.appendChild(reposiEl);
      ListItemEl.appendChild(linkEl);

      this.listEl.appendChild(ListItemEl);

    })
  }
}

new App();