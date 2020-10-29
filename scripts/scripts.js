window.addEventListener('DOMContentLoaded', scrollEffects);

function scrollEffects() {
    let home = document.querySelector('#hero');
    let ablities = document.querySelector('#abilities');
    let projects = document.querySelector('#projects');
    let contact = document.querySelector('#contact');
    let nav = document.querySelector('nav');
    let text = document.querySelectorAll('.nav-item > a');
    let menuIcon = document.querySelector('i');

    document.addEventListener('scroll', () => {
    if (home.getBoundingClientRect().top <= 50) {
        nav.setAttribute('style', 'background-color:black');
        for (let i = 0; i < text.length; i++) {
            text[i].setAttribute('style', 'color:white');
        }
        menuIcon.setAttribute('style', 'color:white');
    }
    if (ablities.getBoundingClientRect().top <= 50) {
        nav.setAttribute('style', 'background-color:rgb(252, 163, 17)');
        for (let i = 0; i < text.length; i++) {
            text[i].setAttribute('style', 'color:black');
        }
        menuIcon.setAttribute('style', 'color:black');
    }
    if (projects.getBoundingClientRect().top <= 50) {
        nav.setAttribute('style', 'background-color:rgb(20, 33, 61)');
        for (let i = 0; i < text.length; i++) {
            text[i].setAttribute('style', 'color:white');
        }
        menuIcon.setAttribute('style', 'color:white');
    }
    if (contact.getBoundingClientRect().top <= 50) {
        nav.setAttribute('style', 'background-color:white');
        for (let i = 0; i < text.length; i++) {
            text[i].setAttribute('style', 'color:black');
        }
        menuIcon.setAttribute('style', 'color:black');
    }
    })
}