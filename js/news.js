const loadAllNews = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllNews(data.data.news_category))
    .catch(error => console.log(error));
}

const displayAllNews = newsAll => {
    const newsList = document.getElementById('news-list');
    newsAll.forEach(news =>{
        // console.log(news);
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
  loadingSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;

    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch(error => console.log(error));
}

const displayNews = totalNews =>{
   const totalNumberOfNews = totalNews.length;
   document.getElementById('calculate-news').innerText = totalNumberOfNews;
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML = ``;
    const alertSite = document.getElementById('alert-site');
    if(totalNews.length === 0){
        alertSite.classList.remove('d-none');
    }
    else{
        alertSite.classList.add('d-none');
    }
    totalNews.forEach(news =>{
        // console.log(news);
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
                    <h6>${news.author.name ? news.author.name : 'No data given'}</h6>
                    </div>
                    <h5><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : 'No data here'}</h5>
                    <button type="button" class="btn btn-primary" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsModal">Show Details</button>
                  </div>
                </div>
        </div>
        `;
        newsCard.appendChild(newsDiv)
    })
    loadingSpinner(false)
}

const loadNewsDetails = async id => {
  const url = ` https://openapi.programming-hero.com/api/news/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayAllDetails(data.data[0]);
  
}

const displayAllDetails = news => {
  // console.log(news);
  const modalTitle = document.getElementById("newsModalLabel")
    modalTitle.innerText = news.author.name;
    const newsDetails = document.getElementById('news-detail');
    newsDetails.innerHTML = `
    <img class="img-fluid" src="${news.author.img}"></img>
    <p>${news.author.published_date ? news.author.published_date : 'No data found'}</p>
    <h6>views: ${news.total_view ? news.total_view : 'No views'}</h6>
    <h4>Badge: ${news.rating.badge}</h4>
    `
}

const loadingSpinner = isLoading => {
  const spinner = document.getElementById('spinner');
  if(isLoading){
    spinner.classList.remove('d-none')
  }
  else{
    spinner.classList.add('d-none')
  }
}

const blogSection = document.getElementById('blog').addEventListener('click', function(){
  window.location.href = 'blog.html'
})

loadAllNews();


