
function getAllImages() {
    return document.querySelectorAll('img');
}

function isFullyRounded(element) {
    const computedStyle = window.getComputedStyle(element);
    const borderRadius = computedStyle.borderRadius;
    return borderRadius === '50%';
}

function filterImagesByRoundedParent(images) {
    return Array.from(images).filter(img => {
        const parent = img.parentElement;
        return parent && isFullyRounded(parent);
    });
}

function getImageSize(image) {
    return image.naturalWidth * image.naturalHeight;
}

function sortImgBySize(images, descending = true) {
    return images.sort((a, b) => {
        const sizeA = getImageSize(a);
        const sizeB = getImageSize(b);

        if (descending) {
            return sizeB - sizeA;
        } else {
            return sizeA - sizeB;
        }
    });
}

// Main function to filter and sort images
function getRoundedImages() {
    const images = getAllImages();
    const roundedParentImages = filterImagesByRoundedParent(images);
    return sortImgBySize(roundedParentImages);
}

function resizeImage(img, x) {
    // Create a canvas element in memory
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var newWidth, newHeight;

    if (img.width === img.height) {
        newWidth = newHeight = x;
    } else if (img.width < img.height) {
        newWidth = x;
        newHeight = Math.round((x / img.width) * img.height);
    } else {
        newHeight = x;
        newWidth = Math.round((x / img.height) * img.width);
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    return canvas.toDataURL();
}

/** 
 * Takes the largest rounded profile picture and scales it down
 * to make it less heavy to store on the database.
 * @param {number} size
 */
function run(size) {
    const profilePics = getRoundedImages();
    var resizedImg = null;
    if (profilePics.length > 0) {
        resizedImg = resizeImage(profilePics[0], size);
    }
    return resizedImg;
}