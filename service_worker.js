// Copyright (c) 2024 Nathan Queme
// All rights reserved.
//
// Licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives
// 4.0 International License, (CC BY-NC-ND 4.0);
// you may not use this code for commercial purposes, and no 
// derivative works are allowed without explicit permission.
// You may obtain a copy of the License at
// 
//      https://creativecommons.org/licenses/by-nc-nd/4.0/
//

// DISCLAIMER: THIS CODE IS A SIMPLIFIED VERSION OF THE ORIGINAL;
// COMPONENTS HAVE BEEN REMOVED TO LIMIT PUBLIC DISCLOSURE.


/**
 * @typedef { 'crawl-ig-page' } CommandType
 * crawl-ig-page: Collects the given quantity of reels from an IG page.
 */

const CONFIG = {
  TASK_COMPLETION_DELAY: 45, // In seconds
  DEBUGING: {
    ENABLED: false,
  },
  IG_REEL_INITIAL_REQUESTS_SENT: 10,
  /** 
   * 1 audio file + 3 videos 
   * wait for additionnal requests to come which lead to files of higher quality
   */
  IG_MIN_UNIQUE_REQUESTS: 4,
}


class Utils {

  /**
   * Checks if a given URL points to a .mp4 file.
   *
   * @param {string} url - The URL to check.
   * @returns {boolean}
   */
  static isMediaUrl(url) {
    return url.includes('.mp4');
  }

  /**
   * Checks if a given URL is an accepted domain (instagram or youtube).
   * @param {string} url - The URL to check.
   * @returns {boolean} - True if the URL's domain is accepted, false otherwise.
   */
  static isAcceptedDomain(url) {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      // Works for all subdomains of instagram.com and youtube.com
      // Works for all TLDs eg .com, .com.au, .fr etc.
      const domainPattern = /^(.*\.)?(instagram|youtube)\./;
      return domainPattern.test(hostname);
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if a given URL is an HTTP or HTTPS website.
   * @param {string} url - The URL to check.
   * @returns {boolean} - True if the URL is an HTTP or HTTPS website, false otherwise.
   */
  static isHTTPWebsite(url) {
    return (
      url.startsWith('http://') ||
      url.startsWith('https://')
    );
  }

  /**
   * Checks if a value is non-empty, non-null, non-undefined.
   * @param {*} value - The value to check.
   * @returns {boolean} - True if the value is non-empty, false otherwise.
   */
  static isNonEmpty(value) {
    return (
      value !== null &&
      value !== undefined &&
      (typeof value !== 'string' || value !== '') &&
      (!Array.isArray(value) || value.length > 0)
    );
  }

  static isEmpty(value) {
    return !this.isNonEmpty(value);
  }

  /** 
   * Filters an object to keep only the allowed keys.
   * @param {Object} originalObj - The object to filter.
   * @param {string[]} allowedKeys - The keys to keep.
   */
  static filterKeys(originalObj, allowedKeys) {
    const filteredObj = {};

    allowedKeys.forEach(key => {
      if (originalObj.hasOwnProperty(key)) {
        filteredObj[key] = originalObj[key];
      }
    });

    return filteredObj;
  }

  /**
   * Strips the given parameters from the URL.
   * @param {string} url - The URL to strip the parameters from.
   * @param {string[]} paramsToStrip - The parameters to strip.
   */
  static stripParamsFromUrl(url, paramsToStrip) {
    let urlObj = new URL(url);
    paramsToStrip.forEach(param => {
      urlObj.searchParams.delete(param);
    });
    return urlObj.toString();
  }

  /**
  * Checks if a key is valid in the given data.
  * @param {string} key - The key to check.
  * @param {Object} data - The data object to check against.
  * @returns {boolean} - True if the key is valid, false otherwise.
  */
  static isValidKey(key, data) {
    const parts = key.split('.');
    let current = data;

    for (let i = 0; i < parts.length; i++) {
      if (!current.hasOwnProperty(parts[i])) {
        return false;
      }
      current = current[parts[i]];
    }

    return Utils.isNonEmpty(current);
  }

}


/** Controlls the Chrome Extension based on commands received. */
/**
 * @typedef {Object} - Information about a task to be executed.
 * @property {string} taskId - The ID of the task.
 * @property {CommandType} command - The command to execute.
 * @property {Object} data - The data to use for the command.
 */
class ExtensionController {

  initializeComponents() {
    console.log("Initializing components");

    // ######## INITIALIZE ALL THE COMPONENTS THAT ALLOW AUTOMATION ########

    /** @type {IGReelScraper} */
    this.igPageScraper = new IGReelScraper();

  }

  /** 
   * Deals with the messages received from the server
   * to execute the actions within the Chrome Extension.
   */
  handleRequest(req) {
    return new Promise((resolve, reject) => {
      switch (req.command) {
        case 'crawl-ig-page':
          try {
            this._checkCommandParams(['taskId', 'data.url', 'data.reel_qty'], req);

            // Call the scraper and resolve/reject based on success
            this.igPageScraper.collectIgPageReelUrls(req)
              .then((data) => resolve(data))
              .catch((error) => reject(error));
          } catch (error) {
            this._printCommandError(req, error);
            reject(error); // Return the error to the caller
          }
          break;
        default:
          console.log("Unknown command received.", req);
          reject(new Error('Unknown command')); // Reject for unknown commands
      }
    });
  }

  _printCommandError(req, error) {
    console.log('Error (' + req.command + ')\n', error);
  }

  /**
   * Throws an error if any of the keys are missing or have invalid values.
   * @param {string[]} keys - The keys to check.
   * @param {Object} data - The data object to check against.
   */
  _checkCommandParams(keys, data) {
    const invalidKeys = keys.filter(key => !Utils.isValidKey(key, data));
    if (invalidKeys.length > 0) {
      throw new Error(
        "Invalid parameters: " + invalidKeys + ' in command: ' + JSON.stringify(data)
      );
    }
  }

}


class ChromeApi {

  /**
   * [CHROME API]  https://developer.chrome.com/docs/extensions/reference/api/tabs#method-create
   */
  openTab(url, active = false) {
    return new Promise((resolve, reject) => {
      chrome.tabs.create({ url, active }, (tab) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(tab);
        }
      });
    });
  }

  closeTab(tabId) {
    chrome.tabs.remove(tabId);
  }

  /** @param {string} tabId */
  activeTab(tabId) {
    return new Promise((resolve, reject) => {
      chrome.tabs.update(tabId, { active: true }, (tab) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(tab);
        }
      });
    });
  }

  /** 
* @param {string} url
* @returns {Promise<string>} - The ID of the tab.
*/
  async openAndActivateTab(url) {
    return new Promise(async (resolve,) => {
      const tab = await this.openTab(url, true /* active */);
      resolve(tab["id"]);
    });
  };

  /** 
   * @param {string} tabId
   * @param {string} scriptFilePath
   * @param {object | undefined} scriptParams - The arguments to pass to the script. eg { "reel_qty": 10 }
   * @param {number} pageLoadDelay - The delay before injecting the script. 
   * 
   * 
   * Script Execution Docs
   * https://developer.chrome.com/docs/extensions/reference/api/scripting#method-executeScript
   */
  executeScript(tabId, scriptFilePath, scriptParams = {}, pageLoadDelay = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        this.activeTab(tabId);

        // The script must contain a function run() that will execute the main logic.
        // Refer to the documentation for more details.
        const startingPointFunc = 'run';

        setTimeout(() => {
          chrome.scripting.executeScript({
            target: { tabId },
            files: [scriptFilePath],
            injectImmediately: false,
          }, () => {
            chrome.scripting.executeScript({
              target: { tabId },
              args: scriptParams ? Object.values(scriptParams) : [],
              func: (startingPointFunc, ...params) => {
                return window[startingPointFunc](...params);
              },
              args: [startingPointFunc, ...Object.values(scriptParams)]
            }, (results) => {
              if (results && results[0] && results[0].result) {
                resolve(results[0].result);
              } else {
                reject('No results from script execution.');
              }
            });
          });
        }, pageLoadDelay);

      } catch (error) {
        reject(error);
      }
    });
  }


}


/** 
 * Can interact with the Chrome browser and send back 
 * the data to the server. 
 */
class ChromeApiWithCompletion extends ChromeApi {

  /** @param {TaskData} task - The task to send. */
  logTaskData(task) {
    console.log(JSON.stringify(task));
  }

  /**
   * @param {any} data
   * @param {string} taskId
   * @param {CommandType} command
   * @returns {TaskData} - The task data.
   */
  logSuccessfulCompletion(data, taskId, command) {
    const task = {
      'status': 'completed',
      'data': data,
      'error': null,
      'taskId': taskId,
      'command': command,
    }
    this.logTaskData(task);
    return task;
  }

  /**
   * @param {string} error
   * @param {string} taskId
   * @param {CommandType} command
   * @returns {TaskData} - The task data.
   */
  logFailedTask(error, taskId, command) {
    const task = {
      'status': 'error',
      'data': null,
      'error': JSON.stringify(error),
      'taskId': taskId,
      'command': command,
    }
    this.logTaskData(task);
    return task;
  }

}


// [COMPONENTS] ----------------------------------------------
/** A tool to collect a list of reels from any Instagram page. */
class IGReelScraper extends ChromeApiWithCompletion {

  collectIgPageReelUrls(req) {
    return new Promise((resolve, reject) => {
      const { taskId, command, data: { url, reel_qty } } = req;

      this.openAndActivateTab(url)
        .then(async (tabId) => {
          const scriptParams = { "reel_qty": reel_qty };

          // Collect reels
          const data = await this.executeScript(
            tabId, 'scripts/collect_reels.js', scriptParams, 5000 /* pageLoadDelay */);

          // Collect profile picture
          const script2Params = { "size": 35 };
          const data2 = await this.executeScript(
            tabId, 'scripts/profile_picture.js', script2Params, 0 /* pageLoadDelay */);

          // Close the tab after scraping is done
          this.closeTab(tabId);
          
          // Return the collected data
          return { "reels": data, "profile_pic_base64": data2 };
        })
        .then(({ reels, profile_pic_base64 }) => {
          let data = reels;
          data["profile_pic_base64"] = profile_pic_base64;

          console.log("IG Reels collected:", data);
          
          // Log successful completion and resolve with data
          this.logSuccessfulCompletion(data, taskId, command);
          resolve(data);
        })
        .catch((error) => {
          console.log('Error while collecting IG Reels:', error);

          // Log the failure and reject with error
          this.logFailedTask(error, taskId, command);
          reject(error);
        });
    });
  }

}



// [USAGE] -----------------------------------------------------
// 1. Initializes the extension components.
const extension = new ExtensionController();
extension.initializeComponents();
// 2. Add your own code here to launch scraping tasks
// ...

// [INLINE USAGE - EXAMPLE] -------------------------------------------
// This code will collect 10 reels from the Instagram page of 
// Mercedes Benz.

//   const scrapingReq = {
//     "taskId": "123",
//     "command": "crawl-ig-page",
//     "data": {
//       "url": "https://www.instagram.com/mercedesbenz/reels/",
//       "reel_qty": 10
//     }
//   };
//   extension.handleRequest(scrapingReq);

// [POPUP USAGE] -----------------------------------------------------
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'crawl-ig-page') {
    const { url, reel_qty } = message.data;
    const scrapingReq = {
      taskId: '123',
      command: 'crawl-ig-page',
      data: {
        url: url,
        reel_qty: reel_qty
      }
    };

    extension.handleRequest(scrapingReq)
      .then((resp) => {
        console.log("Received data:", resp);

        chrome.storage.local.set({ lastCompletion: resp }, () => {
          console.log("Scraped data saved to storage:", resp);
        });

        sendResponse({ data: resp });
      })
      .catch((error) => {
        console.error("Error:", error);
        sendResponse({ error });
      });

    // keep channel open
    return true;
  }
});

