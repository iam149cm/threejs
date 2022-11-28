console.log("module.js is working!");

$('.welcome').on('mouseover', () => {
    $('.welcome').fadeOut();
 
})

function music() {
    const audioContainer = document.querySelector('#audioContainer');
    audioContainer.loop = true
    audioContainer.play()
    }