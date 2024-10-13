let currentTabUrl = "";

chrome.action.onClicked.addListener((tab) => {
    if(tab.url.includes("medium.com/")){
        chrome.tabs.query({ active: true, currentWindow: true}, (tabs) =>{/// this is asynchronous
            if(tabs.length>0){
                currentTabUrl = tabs[0].url;
    
                let urlObj = new URL(currentTabUrl);
                let host = urlObj.hostname;
                let path = urlObj.pathname;
                let newURL = "https://freedium.cfd/"+host+path
                chrome.tabs.create({ url: newURL });
            }
        });
    }
    else {
        // Open the popup.html only for non-Medium sites
        chrome.windows.create({
          url: chrome.runtime.getURL("popup.html"),
          type: "popup",
          width: 400,
          height: 300
        });
      }
  });
  