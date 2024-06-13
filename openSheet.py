from selenium import webdriver
import argparse

def open_sheet(url, name, password, publisher, sheet):
    browser = webdriver.Chrome()

    full_url = f"{url}/home_page/sheet/{sheet}/{publisher}"
    browser.get(full_url)
    browser.add_cookie({
        'name' : '',
		'value' : f"{name}:{password}"
    })
    browser.get(full_url)
    print(f"Opened sheet at {full_url}")
    while(True):
        pass

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Open a sheet in a browser.')
    parser.add_argument('--url', required=True, help='The base URL of the sheet application.')
    parser.add_argument('--name', required=True, help='The username for login.')
    parser.add_argument('--password', required=True, help='The password for login.')
    parser.add_argument('--publisher', required=True, help='The publisher of the sheet.')
    parser.add_argument('--sheet', required=True, help='The name of the sheet to open.')

    args = parser.parse_args()

    open_sheet(args.url, args.name, args.password, args.publisher, args.sheet)
