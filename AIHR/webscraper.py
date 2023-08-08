from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import sys
import os
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from tqdm import tqdm
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet


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
            continue
        href = urljoin(url, href)
        if not href.startswith(base_url):
            continue
        parsed_href = urlparse(href)
        href = parsed_href.scheme + "://" + parsed_href.netloc + parsed_href.path
        if not is_valid(href):
            continue
        if href in urls:
            continue
        urls.add(href)
    return urls


def get_page_text(url):
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Firefox(options=options)
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()

    p1_texts = [p.get_text() for p in soup.find_all("p", class_="p1")]
    body_text = soup.find("body").get_text()

    return "\n".join(p1_texts) + "\n" + body_text


def save_text_as_pdf(text, filename):
    doc = SimpleDocTemplate(filename, pagesize=letter)
    styles = getSampleStyleSheet()
    text_parts = text.split("\n")
    elements = [Paragraph(p, styles["Normal"]) for p in text_parts]
    doc.build(elements)


url = sys.argv[1]
print(url)
all_urls = get_all_website_links_with_progress(url)

# Create pdf_docs directory if not exists
pdf_docs_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pdf_docs")
if not os.path.exists(pdf_docs_path):
    os.makedirs(pdf_docs_path)

base_url = url if url.endswith("/") else url + "/"

for url in tqdm(all_urls, desc="Fetching pages", unit="page"):
    page_text = get_page_text(url)
    pdf_filename_part = urlparse(url).path.replace(base_url, "").replace("/", "_")
    pdf_filename = os.path.join(pdf_docs_path, f"{pdf_filename_part or 'index'}.pdf")
    save_text_as_pdf(page_text, pdf_filename)
