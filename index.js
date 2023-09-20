const API_KEY = '3ff246dd973f32f25d6458e67d484252';
const url = 'https://gnews.io/api/v4/search?q=';

window.addEventListener('load', () => fetchNews("India"));

function reload()
{
    window.location.reload();
}

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&max=100&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data.articles);
    bindData(data.articles);
}

function bindData (articles) {
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';

    articles.forEach((article) => {
        if(!article.image) return;
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

    newsImg.src = article.image;
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