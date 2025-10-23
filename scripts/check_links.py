#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import re
import time

from pathlib import Path

try:
    import requests
except ModuleNotFoundError:
    sys.stderr.write("The 'requests' library is not installed.")
    sys.exit(1)

VERBOSE = True

if VERBOSE:
    import pprint


def is_url_reachable(url: str, timeout=5, max_retries=3, delay=2) -> bool:
    for attempt in range(max_retries):
        try:
            response = requests.head(url, allow_redirects=True, timeout=timeout)

            if response.status_code == 200:
                return True

            return False

        except requests.RequestException as e:
            if VERBOSE:
                print(f"Attempt {attempt + 1}/{max_retries} failed for {url}: {e}")

            if attempt + 1 == max_retries:
                return False

            time.sleep(delay)

    return False  # Should not be reached (fallback)


def extract_urls(text: str) -> list[str]:
    url_pattern = r"https?://[^\s\)\]\}\>,\"'`]+"
    return re.findall(url_pattern, text)


if len(sys.argv) < 2:
    # if no files are provided, check the default ones
    SCRIPT_DIR = Path(__file__).resolve().parent
    input_files: list[str] = [
        (SCRIPT_DIR / "../code.markdown").resolve(),
        (SCRIPT_DIR / "../index.markdown").resolve(),
        (SCRIPT_DIR / "../_posts/spring/2025-10-17-jdbc-template.md").resolve(),
        (SCRIPT_DIR / "../_posts/spring/2025-10-18-spring-boot.md").resolve(),
        (SCRIPT_DIR / "../_posts/spring/2025-10-20-spring-mvc.md").resolve(),
        (SCRIPT_DIR / "../_posts/spring/2025-10-22-spring-security.md").resolve(),
    ]
else:
    input_files: list[str] = sys.argv[1:]

urls: list[str] = []

for file in input_files:
    path = Path(file)

    if not path.is_file():
        sys.stderr.write(f"{path} does not exist or is not a file.\n")
        sys.exit(1)

    with open(file, "r", encoding="utf-8") as file:
        text = file.read()

    urls.extend(extract_urls(text))

urls = [url for url in urls if not url.startswith("http://localhost")]

if VERBOSE:
    pprint.pprint(urls)

broken_urls = []

for url in urls:
    if is_url_reachable(url):
        if VERBOSE:
            print(f"\033[92m[OK]\033[0m {url}")
    else:
        if VERBOSE:
            print(f"\033[91m[BROKEN]\033[0m {url}")
        broken_urls.append(url)

sys.exit(len(broken_urls))
