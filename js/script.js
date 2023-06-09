if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}


window.addEventListener('scroll', function() {
  var footer = document.getElementById('footer');
  var scrollPosition = window.innerHeight + window.pageYOffset;
  var bodyHeight = document.body.offsetHeight;
  var offset = -150; // Adjust this value as needed

  if (scrollPosition >= bodyHeight - offset) {
    footer.classList.add('footer-visible');
  } else {
    footer.classList.remove('footer-visible');
  }
});
