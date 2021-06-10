const videoWrapper = document.querySelector('.about_video_wrapper');
const windowWidth = window.innerWidth;

if (videoWrapper) {
  const videoSrc = getVideoSrc();
  appendVideo(videoSrc);
}

function getVideoSrc() {
  const isMobileSize = windowWidth <= 992;
  return isMobileSize ? videoWrapper.dataset.mobileVideo : videoWrapper.dataset.video;
};

function appendVideo(src) {
  const video = `<video playsinline muted autoplay src='${src}'></video>`;
  videoWrapper.children[0].outerHTML = video;
};