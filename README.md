# Deep Scraper


## Concise Description
**Deep Scraper** is a tool designed for **efficient, unrestricted** web scraping.

It leverages a **Chrome Extension** to enable access to data that would otherwise be difficult or impossible to collect through traditional scraping methods.


## Motivation

### 1. Common Problems with Traditional Scraping
Traditional scraping methods struggle to access dynamic, valuable data from websites. This includes challenges with:
- **Blocked requests and rate limiting**: Many sites actively block scrapers, making data collection inefficient or impossible.
- **Limited data extraction**: Often, only the initial page loads or basic data is scraped, while crucial information like media URLs, user engagement (likes, views), and deeper data layers are missed.

### 2. Scraping Valuable Data from Complex Websites
Websites like Instagram use advanced technologies to restrict data scraping. These platforms make it especially difficult to gather:
- **Media URLs** (videos, images, audio)
- **User engagement data** (likes, view counts, metadata)
- **Large-scale data** beyond the initial page load


## Proposed solution
Deep Scraper was built to **overcome these limitations** by **mimicing human behavior** and **interacting directly** with the website, making it a powerful tool for extracting valuable information.


## Poject's Code

### 1. Publicly Available Code
This repository contains a simplified version, which enables scraping:
- Instagram Reels from **any page, without limits** on the number collected.
- Collecting **user's profile pictures**, using a logic specifically optimized for Instagram by analyzing image size and shape.

### 2. Overview of the private code
This project also has a UI and a server to display, manage and orchestrate data collection. These components remain private as of now.

[GIF] show example

[GIF] show example 2

## Contributions
- **Backend Server Logic**: Developed by **Nathan Queme** and **Jannik Aueur**.
- **UI and Chrome Extension**: Exclusively developed by **Nathan Queme**, including the simplified public version in this repository.


## Disclaimer
This project is intended **solely for learning purposes**. The code and tools provided in this repository should **not be used to scrape websites** in violation of their terms of service, privacy policies, or any applicable laws. Users are responsible for ensuring their activities comply with the legal and ethical guidelines of the websites they interact with.

The developers of this project are not liable for any misuse of this software, and it is provided **"AS IS" WITHOUT ANY WARRANTY OR LIABILIT**. The use of this tool for illegal or unethical scraping, or for any activities not aligned with website policies, is strictly prohibited.

---


## License
<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><span property="dct:title">IGScrapingExtension</span> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/n-queme">Nathan Queme</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt=""></a></p>
