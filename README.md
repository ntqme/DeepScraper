
<div align="center">
  <img src="images/DeepSraperIcon.png" alt="Deep Sraper Ico" style="width:140px;border-radius: 12px;"/>
</div>

# Deep Scraper

## Table of Contents
1. [Concise Description](#concise-description)
2. [Motivations](#motivations)
    - [1. Limitations of Traditional Scraping Methods](#1-limitations-of-traditional-scraping-methods)
    - [2. Scraping Valuable Data from Complex Websites](#2-scraping-valuable-data-from-complex-websites)
3. [Proposed Solution](#proposed-solution)
4. [Project's Code](#projects-code)
    - [1. Publicly Available Code](#1-publicly-available-code)
    - [2. Overall Project Overview](#2-overall-project-overview)
5. [Visual Demonstrations](#visual-demonstrations)
    - [Efficient Instagram Scraping](#efficient-instagram-scraping)
    - [Reel Analysis](#reel-analysis)
6. [Contributions](#contributions)
7. [Disclaimer](#disclaimer)
8. [License](#license)

## Concise Description
**Deep Scraper** is a Chrome Extension designed for **efficient and unrestricted** web scraping.

## Motivations

### 1. Limitations of traditional scraping methods
- **Blocked requests and rate limiting**: Many sites actively block scrapers, making data collection inefficient or impossible.
- **Partial data access**: In many cases, scrapers only gather surface-level information from the first page, while vital elements like media links, engagement stats (likes, views), and deeper insights remain inaccessible.

### 2. Scraping Valuable Data from Complex Websites
Websites like Instagram use advanced technologies to restrict data scraping. These platforms make it especially difficult to gather:
- **User engagement data** (likes, view counts, metadata)
- **Media URLs** (videos, images, audio)
- **Large-scale data** beyond the initial page load

## Proposed Solution
With the lower-level access provided by Chrome extensions, Deep Scraper **navigates websites like a human**, offering **deeper control** and the ability to **extract more specific data**.

## Project's Code

### 1. Publicly Available Code
This repository contains a simplified version, which enables scraping:
- Instagram Reels from **any page, without limits** on the number collected.
- Collecting **users' profile pictures**, using logic specifically optimized for Instagram by analyzing image size and shape.

### 2. Overall Project Overview
Deep Scraper includes:
- A UI for displaying scraped data.
- A server for handling data collection.
Both components remain private at this time.

### Visual Demonstrations

##### Efficient Instagram Scraping
![Efficient Instagram Scraping](images/demo/ReelCollection.gif)
- In this video, the user scrapes 10 reels from Dua Lipa’s Instagram page. 
- The process is initiated through the UI, carried out by the Chrome extension, and completed by the server within seconds. 
- So far, we've consistently gathered large amounts of data without encountering any limits, as shown by the large quantity of data displayed on the UI.

##### Reel Analysis
![Reel Analysis](images/demo/ReelAnalysis.gif)
In this video, the user pastes a reel URL to obtain all its metadata, including:
- Comments
- Like count
- Publisher(s)
- Main publisher’s information, including their: 
    - Profile picture
    - Username
- Links to remote files which are not present on the page:
    - Audio URL
    - Video URL

With this data, you could train a model to identify patterns and predict what makes content go viral.

## Contributions
- **Backend Server Logic**: Developed by [Nathan Queme](https://github.com/ntqme) and [Jannik Aueur](https://github.com/jannikauer).
- **UI and Chrome Extension**: Exclusively developed by [Nathan Queme](https://github.com/ntqme), including the simplified public version in this repository.

## Disclaimer
This project is intended **solely for learning purposes**. The code and tools provided in this repository should **not be used to scrape websites** in violation of their terms of service, privacy policies, or any applicable laws. Users are responsible for ensuring their activities comply with the legal and ethical guidelines of the websites they interact with.

The developers of this project are not liable for any misuse of this software, and it is provided **"AS IS" WITHOUT ANY WARRANTY OR LIABILITY**. The use of this tool for illegal or unethical scraping, or for any activities not aligned with website policies, is strictly prohibited.

---


## License
<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><span property="dct:title">DeepScraper</span> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/n-queme">Nathan Queme</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt=""></a></p>
