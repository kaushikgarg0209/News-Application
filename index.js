const API_KEY = '6f25615af727480bb24729ba2282ad1d';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', () => fetchNews("India"));

function reload()
{
    window.location.reload();
}

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data.articles);
    bindData(data.articles);
}

function bindData (articles) {
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg  = cardClone.querySelector('#news-img');
    const newsTitle  = cardClone.querySelector('#news-title');
    const newsSource  = cardClone.querySelector('#news-source');
    const newsDesc  = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}

var btn = document.getElementById('search-btn');
var input = document.getElementById('news-input');

input.addEventListener('keypress', (event)=>{
    if (event.key == 'Enter')
    {
        if (input.value !== '') fetchNews(input.value);
        input.value = '';
    }
})

btn.addEventListener('click', ()=>{
    if (input.value !== '') fetchNews(input.value);
    input.value = '';
})