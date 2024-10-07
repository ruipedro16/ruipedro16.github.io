#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import re
import os
import sys

from colorama import Fore, Style

posts_path = "../content/posts"
URL_REGEX = re.compile(r"https?://(?:www\.)?[a-zA-Z0-9./_-]+")

broken_links = []


def extract_links_from_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
        return URL_REGEX.findall(content)


def check_url(url):
    print(f"  - Checking link: {url}: ", end="")
    try:
        response = requests.head(url, allow_redirects=True, timeout=5)

        # Consider the URL reachable if the status code is 200-399
        if response.status_code in range(200, 400):
            print(f"{Fore.GREEN}OK{Style.RESET_ALL}")
        else:
            print(f"{Fore.RED}Broken{Style.RESET_ALL}")
            broken_links.append(url)

    except requests.RequestException:
        # If there is any exception (network issue, invalid URL, etc.), consider it broken
        print(f"{Fore.RED}Broken{Style.RESET_ALL}")
        broken_links.append(url)


def extract_links_from_posts():
    all_links = []

    for root, _, files in os.walk(posts_path):
        for file_name in files:
            if file_name.endswith(".md"):
                file_path = os.path.join(root, file_name)
                links = extract_links_from_file(file_path)

                if links:
                    all_links.extend(links)
                    print(f"Links found in {file_path}:")
                    for link in links:
                        print(f"  - {link}")
                        check_url(link)
                else:
                    print(f"No links found in {file_path}.")

    all_links = set(list(all_links))  # Remove duplicates

    return all_links


def main():
    extract_links_from_posts()

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
    sys.exit(main())
