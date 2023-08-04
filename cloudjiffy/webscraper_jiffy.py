from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import sys
import json
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from tqdm import tqdm  # Import tqdm


def is_valid(url):
    parsed = urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)


def get_all_website_links_with_progress(url):
    urls = set()
    base_url = url if url.endswith("/") else url + "/"
    print(f"Base URL: {base_url}")

    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Firefox(options=options)

    try:
        driver.get(url)
        soup = BeautifulSoup(driver.page_source, "html.parser")
    except Exception as e:
        print(f"Failed to make a request to {url}, Error: {str(e)}")
        return urls
    finally:
        driver.quit()

    for a_tag in tqdm(soup.findAll("a"), desc="Fetching URLs", unit="URL"):
        href = a_tag.attrs.get("href")
        if href == "" or href is None:
            print(f"Empty or None href at {a_tag}")
            continue
        href = urljoin(url, href)
        if not href.startswith(base_url):
            print(f"URL not starting with base URL: {href}")
            continue
        parsed_href = urlparse(href)
        href = parsed_href.scheme + "://" + parsed_href.netloc + parsed_href.path
        if not is_valid(href):
            print(f"Invalid URL: {href}")
            continue
        if href in urls:
            print(f"Duplicate URL: {href}")
            continue
        urls.add(href)
        print(f"Valid and unique URL: {href}")
    return urls


def get_page_text(url):
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Firefox(options=options)
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()
    for script in soup(["script", "style"]):
        script.extract()
    return " ".join(soup.stripped_strings)


url = sys.argv[1]
print(url)
all_urls = get_all_website_links_with_progress(url)
print(f"all urls: {all_urls}")
page_texts = {}

for url in tqdm(all_urls, desc="Fetching pages", unit="page"):
    page_texts[url] = get_page_text(url)

parsed_url = urlparse(url)
domain = parsed_url.netloc
if domain.startswith("www."):
    domain = domain[4:]
domain = domain.split(".")[0]

with open(f"{domain}.json", "w") as outfile:
    json.dump(page_texts, outfile)
