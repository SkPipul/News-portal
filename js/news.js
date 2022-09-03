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
        <div onclick="preparedNews('${news.category_id}')">
        <h5>${news.category_name}</h5>
        <?div>
        `;
        newsList.appendChild(newsDiv);
    })
}

const preparedNews = (newsId) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;

    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
}

const displayNews = totalNews =>{
    totalNews.forEach(news =>{
        console.log(news);
    })
}

loadAllNews();