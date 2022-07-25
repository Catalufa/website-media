particlesJS.load('particles-js', 'assets/particles.json');

document.querySelector(".icon").addEventListener("click", function(){
  window.scrollTo(0, 0);
  menu.style.height = "60px"
});

const menu = document.querySelector(".nav")
document.querySelector(".menu").addEventListener("click", function(){
  if (menu.style.height != "100%") {
    menu.style.height = "100%"
  } else {
    menu.style.height = "60px"
  }
});

const navItems = document.querySelector(".nav").getElementsByTagName("p");
navItems[0].addEventListener("click", function(){
  window.scrollTo(0, document.querySelector(".content-1").getBoundingClientRect().top - document.body.getBoundingClientRect().top - 60)
  menu.style.height = "60px"
});
navItems[1].addEventListener("click", function(){
  window.scrollTo(0, document.querySelector(".content-2").getBoundingClientRect().top - document.body.getBoundingClientRect().top + 100)
  menu.style.height = "60px"
});
document.getElementById("frontButton").addEventListener("click", function(){
  window.scrollTo(0, document.querySelector(".content-3").getBoundingClientRect().top - document.body.getBoundingClientRect().top - 120)
  menu.style.height = "60px"
});
navItems[2].addEventListener("click", function(){
  window.scrollTo(0, document.querySelector(".content-3").getBoundingClientRect().top - document.body.getBoundingClientRect().top - 120)
  menu.style.height = "60px"
});
navItems[3].addEventListener("click", function(){
  window.scrollTo(0, document.querySelector(".content-5").getBoundingClientRect().top - document.body.getBoundingClientRect().top - 50)
  menu.style.height = "60px"
});
navItems[4].addEventListener("click", function(){
  window.scrollTo(0, document.querySelector(".content-4").getBoundingClientRect().top - document.body.getBoundingClientRect().top + 120)
  menu.style.height = "60px"
});

const cards = document.querySelector(".cards");
document.querySelector(".arrow-left").addEventListener("click", function(){
  cards.scrollTo(cards.scrollLeft - window.innerWidth - 16, 0)
});
document.querySelector(".arrow-right").addEventListener("click", function(){
  cards.scrollTo(cards.scrollLeft + window.innerWidth - 16, 0)
});


document.getElementById("map").addEventListener("click", function(){
  window.open("https://goo.gl/maps/ggM2CbRJUyMCAYBE6")
});
document.getElementById("more").addEventListener("click", function(){
  window.open("https://www.facebook.com/YumLushGosforth")
});

const social1 = document.querySelector(".social-links").getElementsByClassName("social")
const social2 = document.querySelector(".social-links-2").getElementsByClassName("social-2")
const social = Array.from(social1).concat(Array.from(social2))
const links = ["https://www.facebook.com/YumLushGosforth/", "https://www.instagram.com/yumlush/", "https://twitter.com/yumLush", "mailto:hello@yumlush.com", "tel:0191 285 4442"]
social.forEach(function (item, index) {
  item.addEventListener("click", function(){
    window.open(links[index])
  });
})


document.addEventListener("mousewheel", function(event){
  if (event.wheelDelta >= 0) {
    document.querySelector(".nav").style.transform = "translateY(0)"
  } else {
    document.querySelector(".nav").style.transform = "translateY(-60px)"
  }
})


d = new Date().getDay()
document.querySelector(".days").getElementsByTagName("p")[d].classList.add("today")


async function getPhotos() {
  var photos = []

  var token = "EAAEvYDABMdIBANv4KW0ymk5mJitELaik8irpgLhEyAL3ZAWuqxDr4v3PZAoyLoANb7WlRSCDuIe4FmaQ5AwdcVWkF2l3WdXDVUhHzMetlJLMkdLI46FXQiINBrIZCaLuaFelhvxKwR4FOLE9ytKaw9mBlh1a1BI2Cb0lsRs8n9CvI7VCy8ZAq9OYjENdjZCUZD"
  var id = "104157489011367"
  fetch(`https://graph.facebook.com/${id}/posts?access_token=${token}`)
    .then(response => response.json())
    .then(data => {
      var t = data.data.length
      var i = 0
      for (var item of Object.keys(data.data)) {
        var p = data.data[item]
        if (p.message.includes("#yumlush")) {
          fetch(`https://graph.facebook.com/${p.id}/attachments?access_token=${token}`)
            .then(response => response.json())
            .then(photo => {
              photos.push([photo.data[0].media.image.src, photo.data[0].description, photo.data[0].url])
              console.log(photos)
              i++
              if (i == t) {
                setPhotos(photos)
              }
          })
        } else {
          i++
          if (i == t) {
            setPhotos(photos)
          }
        }


      }

    })
}

async function setPhotos(photos) {
  photos.reverse()

  var cards = document.getElementsByClassName("new-card")
  var id = 0
  for (let x of cards) {
    if (id + 1 > photos.length) {
      break
    }
    x.style.backgroundImage = `url("${photos[id][0]}")`
    x.querySelector("h3").innerHTML = photos[id][1].split("#yumlush ")[1]
    let url = photos[id][2]
    x.querySelector("button").addEventListener("click", function(){ window.open(url); });
    id++
  }

}

getPhotos()

window.scrollTo(0,window.pageYOffset)

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
