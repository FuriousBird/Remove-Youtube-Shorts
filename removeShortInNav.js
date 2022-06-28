function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

waitForElm("ytd-guide-section-renderer a[title=Shorts]").then((elem) =>
  elem.parentElement.remove()
);

waitForElm("ytd-mini-guide-entry-renderer[aria-label=Shorts]").then((elem) => {
  elem.remove();
});

//remove yt short sections
waitForElm("ytd-rich-section-renderer").then((elem) => {
	let targets = Array.from(elem.getElementsByTagName("ytd-rich-shelf-renderer")).filter((e)=> e.hasAttribute("is-shorts"));
	if (targets.length>0){
		console.log("remove!!!");
		elem.style.display = "none";
	};
});
