'use strict';


// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});


// Handling League Information btn pushed pop up the iframe selected
function getTeamInfo(legueInfo) {
  // let team = document.getElementById("Team_id").getAttribute('data-value');
  let League = legueInfo;
  // console.log(League);

  if (League == "LiveScore") {
    var P = document.getElementById("LiveScore").outerHTML;
    document.getElementById("Live").innerHTML = P;
  } else if (League == "england-premier-league") {
    // document.getElementById("Premier-Leage").innerHTML = x;
    var P = document.getElementById("Preiframe").outerHTML;
    document.getElementById("Pre").innerHTML = P;

  } else if (League == "spain-la-liga") {
    var P = document.getElementById("Laframe").outerHTML;
    document.getElementById("La").innerHTML = P;

  } else if (League == "germany-bundesliga") {
    var P = document.getElementById("Bunframe").outerHTML;
    document.getElementById("Bu").innerHTML = P;

  } else if (League == "italy-serie-a") {
    var P = document.getElementById("Seframe").outerHTML;
    document.getElementById("Se").innerHTML = P;
  } else if (League == "france-ligue-1") {
    var P = document.getElementById("Prframe").outerHTML;
    document.getElementById("Pr").innerHTML = P;
  } else if (League == "uefa-champions-league") {
    var P = document.getElementById("Champframe").outerHTML;
    document.getElementById("Chmp").innerHTML = P;
  } else if (League == "uefa-europa-league") {
    var P = document.getElementById("Euroframe").outerHTML;
    document.getElementById("Euro").innerHTML = P;
  } else {
    var P = document.getElementById("Worldcupframe").outerHTML;
    document.getElementById("Wcp").innerHTML = P;
  }

};

// Remove selection from the previous item and select the new one
const workBtnContainer = document.querySelector('.navbar__menu');
// const projectContainer = document.querySelector('.work__projects');
const projectContainer = document.querySelector('.navbar__club_results');
const projects = document.querySelectorAll('.project');
const results = document.querySelector('.navbar__club_results');
workBtnContainer.addEventListener('click', (e) => {
  // const filter = e.target.dataset.filter;
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  projects.forEach((project) => {
    // console.log(project.dataset.type);
    if (filter === project.dataset.type) {
      console.log(filter);
      project.classList.remove('invisible');
      // console.log(55);
    } else {
      project.classList.add('invisible');
      // console.log(66);
    }

  });
});



// Enable hidden navbar
const navbarMenu = document.querySelector('.navbar__menu');
// const nav = document.querySelector(".navbar__menu");
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  if (lastScrollY < window.scrollY) {
    navbarMenu.classList.remove('open');
  } else {
    // navbarMenu.classList.add('open');  
  }
  lastScrollY = window.scrollY;
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}


// Navbar toggle button for small screen
// const navbarMenu = document.querySelector('.navbar__menu');
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});


// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
// const arrowUp = document.querySelector('.arrow-up');
// document.addEventListener('scroll', () => {
//   if (window.scrollY > homeHeight / 2) {
//     arrowUp.classList.add('visible');
//   } else {
//     arrowUp.classList.remove('visible');
//   }
// });

// Handle click on the "arrow up" button
// arrowUp.addEventListener('click', () => {
//   scrollIntoView('#home');
// });


// View home page thumbnails of recent Top team match
const teamlists = [
  'real-madrid',
  'barcelona',
  'manchester-city',
  'arsenal',
  'chelsea',
  'atletico-madrid',
  'tottenham-hotspur',
  'liverpool',
  'manchester-united',
  'psg',
  'juventus',
  'ac-milan',
  'inter-milan',
];

const imgArry = [];

// Using forEach to show thumbnails of each team on the main first page
function gethomeInfo(teamInfo) {
  // let team = document.getElementById("Team_id").getAttribute('data-value');
  let team = teamInfo;

  fetch(`https://www.scorebat.com/video-api/v3/team/${team}/?token=Mjk4NjVfMTY2NzA4ODM2MF8wZmVmMzllYjM5YjcwOGY1OWZmY2E0NGZlZmM5MDExYmE0N2I2ZWQ1`)
    .then((response) => response.json())
    .then((data) => {
      // data는 json으로 변환된 객체 즉 parsing완료    

      imgArry.push(data.response[0]['thumbnail']);
      console.log(imgArry);
      // document.getElementById("TeamTitle").innerHTML = data.response[0]['title'];
      // document.getElementById("MatchDate").innerHTML = data.response[0]['date'];
      document.getElementById("thumbnail").setAttribute("src", data.response[0]['thumbnail']);
      // document.getElementById("CompetitionUrl").setAttribute("href",data.response[0]['competitionUrl']);
      // document.getElementById("videos").innerHTML = data.response[0]['videos'][0]['embed'];

    });

};

function showimg(team){
  let img = team;
  
  document.getElementById("thumbnail").innerHTML=imgArry[img];

  // for(var i = 0; i<imgArry.length; i++){
  //   document.getElementById("thumbnail")=imgArry[i];
  // }
  
}

teamlists.forEach((teamlist) => {
  console.log(teamlist);
  gethomeInfo(teamlist);
  setTimeout(showimg(teamlist),3000);
  // setTimeout(gethomeInfo(teamlist), 1500);
});








