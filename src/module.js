console.log("module.js is working!");

$('.welcome').on('mouseover', () => {
    $('.welcome').fadeOut();
 
})

$('.welcome').on('touchstart', () => {
    $('.welcome').fadeOut();
 
})

function music() {
    const audioContainer = document.querySelector('#audioContainer');
    audioContainer.loop = true
    audioContainer.play()
    }


$(document).on(document.event, () => {
    console.log('event!!' , document.event);
})