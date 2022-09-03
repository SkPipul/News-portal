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
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML = ``;
    totalNews.forEach(news =>{
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.innerHTML = `
        
        <div class="row g-0">
                <div class="col-md-4">
                  <img src="${news.image_url}" class="img-width h-100 img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text p-text">${news.details.slice(0, 150)}...</p>
                    
                  </div>
                  <div class="d-flex justify-content-around align-items-center">
                    <div>
                    <img class="rounded-circle logo" src="${news.author.img}" alt="">
                    <h6>${news.author.name}</h6>
                    </div>
                    <h5><i class="bi bi-eye-fill"></i>${news.total_view}</h5>
                    <button class="btn btn-primary">Details</button>
                  </div>
                </div>
        </div>
        `;
        newsCard.appendChild(newsDiv)
    })

    
}

loadAllNews();

