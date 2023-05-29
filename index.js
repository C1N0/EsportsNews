
// Referințele elementelor HTML
const navLinks = document.querySelectorAll('.nav-links ul li a');
const heroBtn = document.querySelector('.hero-btn');
const mediaRow = document.querySelector('.media .row');
const greetingMessage = document.querySelector('.greeting-message');


// Funcția de verificare a vârstei
function checkAge(event, pageUrl) {
    event.preventDefault();

    const age = prompt('Enter your age:');

    if (age && parseInt(age) >= 15) {
        const pageUrl = event.target.href;
        window.location.href = pageUrl;
    } else {
        alert('Restricted access! You must be at least 15 years old to access this page.');
    }
}

function registerEmail(event) {
    event.preventDefault(); 
  
    const email = prompt('Please enter your email:');
    if (email) {
      alert(`Your email (${email}) has been registered!`);
  
      heroBtn.style.display = 'none';
  
      const welcomeText = document.createElement('h2');
      welcomeText.textContent = `Hello, ${email}. Welcome!`;
      welcomeText.style.fontSize = '24px'; 
      welcomeText.style.textAlign = 'center'; 
      heroBtn.parentNode.insertBefore(welcomeText, heroBtn.nextSibling);
  
      const image = document.createElement('img');
      image.src = 'images/wave.png'; 
      image.style.display = 'block'; 
      image.style.width = '100px'; 
      image.style.margin = '0 auto'; 
      heroBtn.parentNode.insertBefore(image, heroBtn.nextSibling);
  
     
      window.location.href = '#esports';
    }
  }
  
  heroBtn.addEventListener('click', function(event) {
    registerEmail(event);
  });
  
  


// Schimbarea culorii fundalului paginii la fiecare 2 secunde
const body = document.querySelector('body');
let hue = 0;
let saturation = 100;
let lightness = 50;

function changeBackgroundColor() {
  hue = (hue + 1) % 360;
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  body.style.backgroundColor = color;
}

setInterval(changeBackgroundColor, 10);



document.addEventListener('DOMContentLoaded', function() {
    const esportsNewsContainer = document.getElementById('esports-news');

    
    const esportsNews = [
        {
            image: 'images/Major Esports Tournament.jpg',
            title: 'Major Esports Tournament',
            description: 'Last year was collectively the best and the worst year in Esports history. A record number of new players joined the community...',
            link: 'https://earlygame.com/more/biggest-esports-tournaments-2021'
        },
        {
            image: 'images/New Esports Team Announcement.png',
            title: 'New Esports Team Announcement',
            description: 'We are a completely new team, in which we tried to combine experienced and young blood hungry for victories...',
            link: 'https://teamsingularity.com/new-csgo-team/'
        },
        {
            image: 'images/The 10 Largest Prize Pools in Esports.jpg',
            title: 'The 10 Largest Prize Pools in Esports',
            description: 'Esports players have seen some outrageous payouts over the last 20 years. While the overall size of a prize pool...',
            link: 'https://dotesports.com/general/news/biggest-prize-pools-esports-14605'
        }
    ];

    esportsNews.forEach(function(news) {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const image = document.createElement('img');
        image.src = news.image;
        newsItem.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = news.title;
        newsItem.appendChild(title);

        const description = document.createElement('p');
        description.textContent = news.description;
        newsItem.appendChild(description);

        const link = document.createElement('a');
        link.href = news.link;
        link.textContent = 'Read more';
        newsItem.appendChild(link);

        esportsNewsContainer.appendChild(newsItem);
    });
});


  
  