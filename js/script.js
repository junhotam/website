if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

window.addEventListener('scroll', function() {
  var footer = document.getElementById('footer');
  var scrollPosition = window.innerHeight + window.pageYOffset;
  var bodyHeight = document.body.offsetHeight;
  if (scrollPosition >= bodyHeight) {
    footer.style.bottom = '0';
  } else {
    footer.style.bottom = '-100px';
  }
});
