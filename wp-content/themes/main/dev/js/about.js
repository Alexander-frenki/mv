const videoWrapper = document.querySelector('.about_video_wrapper');
const windowWidth = window.innerWidth;

if (videoWrapper) {
  const videoSrc = getVideoSrc();
  appendVideo(videoSrc);
}

function getVideoSrc() {
  const isMobileSize = windowWidth <= 992;
  const src = isMobileSize ? videoWrapper.dataset.mobileVideo : videoWrapper.dataset.video;
  const className = isMobileSize ? 'video-mobile' : 'video-desktop';
  return { src, className };
};

function appendVideo({ src, className }) {
  const video = `<video class='${className}' playsinline muted autoplay src='${src}'></video>`;
  videoWrapper.children[0].outerHTML = video;
};