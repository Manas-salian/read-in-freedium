// listner for action of clicking the extension icon
chrome.action.onClicked.addListener((tab) => {
    // checking tab.url && tab.url.includes because if url is not completely formed
    // calling tab.url.includes results in a runtime error
    if (tab.url && tab.url.includes("medium.com/")) {
        let currentTabUrl = tab.url;
        
        let urlObj = new URL(currentTabUrl);   // convert the url string to url object
        let host = urlObj.hostname;            // this is dont to extract components of the url
        let path = urlObj.pathname;            // and to avoid https:// appearing twice
        let newURL = "https://freedium.cfd/" + host + path;

        chrome.tabs.create({ url: newURL });
    } else {
        chrome.notifications.create({          // To display error notification
            type: "basic",
            iconUrl: "assets/142643505.png",
            title: "Extension Alert",
            message: "This extension only works with Medium.",
            priority: 2
          });
    }
});

// listner for keyboard shortcut CTRL+SHIFT+F
chrome.commands.onCommand.addListener((command) => {                         // commands set already in manifest.json
    if (command === "open-freedium") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { // Queries the active tab in the current window from the array of tabs
            if (tabs.length > 0) {                                           // same logic can be used in the first listner as well but
                let currentTabUrl = tabs[0].url;                             // the onClick listner already has tabs as the parameter

                if (currentTabUrl && currentTabUrl.includes("medium.com/")) {
                    let urlObj = new URL(currentTabUrl);
                    let host = urlObj.hostname;
                    let path = urlObj.pathname;
                    let newURL = "https://freedium.cfd/" + host + path;

                    chrome.tabs.create({ url: newURL });
                } else {
                    chrome.notifications.create({
                        type: "basic",
                        iconUrl: "assets/142643505.png",
                        title: "Extension Alert",
                        message: "This extension only works with Medium.",
                        priority: 2
                      });
                }
            }
        });
    }
});