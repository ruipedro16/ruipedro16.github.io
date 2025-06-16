#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import re
import requests
import pprint

from pathlib import Path
from colorama import Fore, Style

## TODO: This does not work for URLs ;ike `https://github.com/${props.github_username}`
## TODO: Resolve props.github_username and then check the URL

URL_REGEX = re.compile(r"https?://(?:www\.)?[a-zA-Z0-9./_-]+")
broken_links = []


def check_url(url: str):
    try:
        response = requests.head(url, allow_redirects=True, timeout=5)
        if response.status_code in range(200, 400):
            print(f"{url}: {Fore.GREEN}OK{Style.RESET_ALL}")
    except requests.RequestException:
        print(f"{url}: {Fore.RED}Broken{Style.RESET_ALL}")
        broken_links.append(url)


def extract_links_from_file(file_path: str) -> list[str]:
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
        return URL_REGEX.findall(content)


def main(path: str) -> int:
    verbose: bool = True
    if not os.path.exists(path):
        print(f"Path '{path}' does not exist.")
        return 1

    files_to_check = [
        f
        for f in Path(path).rglob("*")
        if f.is_file() and f.suffix in {".js", ".jsx", ".ts", ".tsx"}
    ]

    print(f"Found {len(files_to_check)} files to check.")
    pprint.pprint(files_to_check)

    urls = list(set([link for file in files_to_check for link in extract_links_from_file(file)]))

    if verbose:
        print(f"Found {len(urls)} URLs to check.")
        pprint.pprint(urls)

    for url in urls:
        check_url(url)

    print("")
    print("=" * 100, end="\n\n")

    if not broken_links:
        print(f"{Fore.GREEN}No broken links found{Style.RESET_ALL}")
        return 0
    else:
        print(f"{Fore.RED}Broken links found:{Style.RESET_ALL}")
        for link in broken_links:
            print(f"  - {link}")
        return 1


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 check_broken_links.py <path>")
        sys.exit(1)

    sys.exit(main(sys.argv[1]))
