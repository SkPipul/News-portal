const loadAllNews = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllNews(data.data.news_category))
}

const displayAllNews = newsAll => {
    const newsList = document.getElementById('news-list');
    newsAll.forEach(news =>{
        console.log(news);
        const newsDiv = document.createElement('div')
        newsDiv.classList.add('news')
        newsDiv.innerHTML = `
        <h5>${news.category_name}</h5>
        `;
        newsList.appendChild(newsDiv);
    })
}

loadAllNews();