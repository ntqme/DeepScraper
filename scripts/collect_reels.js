
function get_displayed_reel_urls() {
    return Array.
        from(document.querySelectorAll('a[href*="/reel/"]')).
        map((a) => a.href);
}

function scrollDown() {
    var scrollDistance = window.innerHeight * (1.3);
    window.scrollBy(0, scrollDistance);
}

/** 
 * Avoids humans to interact with the page;
 * and makes the user experience more pleasant.
 */
function addDialog() {
    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'dialog_overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    // Create dialog
    var dialog = document.createElement('div');
    dialog.style.backgroundColor = '#fff';
    dialog.style.padding = '20px';
    dialog.style.borderRadius = '12px';
    dialog.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    dialog.style.zIndex = '1001';

    // Add text to the dialog
    var text = document.createElement('p');
    text.innerText = 'Data collection in progress...';
    text.style.fontSize = '17px';
    text.style.fontWeight = '500';
    text.style.color = "#1a1a1a" // "#000000"
    dialog.appendChild(text);

    // Append dialog to overlay
    overlay.appendChild(dialog);

    // Append overlay to body
    document.body.appendChild(overlay);
}

/** 
 * @param {number} reel_qty - Quantity of reels to collect.
*/
async function run(reel_qty) {
    // Open the reels page if it's not already open
    // if (!window.location.href.includes('/reels/')) {
    //    document.querySelectorAll('a[href*="/reels/"]')[1].click();
    // }
    if (!window.location.href.includes('/reels/')) {
        return { "error": "Invalid Instagram url provided; the url must end with '/reels'" }
    }

    addDialog();
    var reel_urls = [];
    var iterations = 0;
    while (reel_urls.length < reel_qty) {
        reel_urls = [...new Set(reel_urls.concat(get_displayed_reel_urls()))];
        scrollDown();
        iterations++;
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    const dialogEl = document.getElementById('dialog_overlay');
    if (dialogEl) {
        dialogEl.remove();
    }
    data = {
        "page_url": window.location.href,
        "scroll_count": iterations,
        "ig_reel_urls": reel_urls.slice(0, reel_qty),
        "ig_reel_url_count": reel_qty,
    }
    return data;
}
