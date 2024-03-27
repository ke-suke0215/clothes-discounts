import os
from supabase import create_client, Client
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time
import re
from datetime import datetime
import psycopg2

###############################
########## 定数を定義 ###########
###############################

UNIQLO_DOMAIN = "https://www.uniqlo.com"
OPEN_URL = "https://www.uniqlo.com/jp/ja/feature/limited-offers/men"
SUPABASE_URL: str = os.environ['SUPABASE_URL']
SUPABASE_API_KEY: str = os.environ['SUPABASE_API_KEY']
SUPABASE_CLIENT: Client = create_client(SUPABASE_URL, SUPABASE_API_KEY)

###############################
#### 使用する関数を事前に定義 #####
###############################

# 特定の文字列を含む要素を取得する.
def get_matching_elements(substring, array):
  matched_elements = [item for item in array if substring in item]
  
  if not matched_elements: return ''  # 一致しなかった場合は空文字を返す
  return matched_elements[0]  # 最初にマッチした要素を返す

# 要素内に記述されているidを商品番号の形式に変換する.
def extract_id(input_string):
  # 「-」以降を削除
  parts = input_string.split('-')

  pattern = r'\D'
  numbers_only = re.sub(pattern, '', parts[0])
  return numbers_only

# idを指定してItemを取得する.
def find_by_id_from_item(id):
  conn = psycopg2.connect(
    host = HOST,
    port = PORT,
    database = DATABASE_NAME,
    user = USER_NAME,
    password = PASSWORD
  )

  cursor = conn.cursor()
  cursor.execute("SELECT id, name, page_url, image_url FROM item WHERE id = %s;", (id,))

  record = cursor.fetchone()

  # コネクションとカーソルをクローズ
  cursor.close()
  conn.close()

  if record:
    item = Item(*record)  
    return item
  else:
    return None

###############################
######### メインの処理 ##########
###############################

webdriver_service = Service(ChromeDriverManager().install())
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(service=webdriver_service, options=options)
driver.get(OPEN_URL)
time.sleep(10)

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

names = [element.text for element in soup.find_all('h3', class_='fr-ec-title')]
prices = [int(element.text.replace('¥', '').replace(',', '')) for element in soup.find_all('p', class_='fr-ec-price-text')]
ids = [extract_id(element.get('id')) for element in soup.find_all('a', class_='fr-ec-product-tile')]
page_urls = [UNIQLO_DOMAIN + element.get('href') for element in soup.find_all('a', class_='fr-ec-product-tile')]
image_urls = [element.get('src') for element in soup.find_all('img', class_='fr-ec-image__img')]

if len(names) == len(prices) == len(ids):

  for name, price, id in zip(names, prices, ids):
    item = find_by_id_from_item(id)

    if item:
      print(name + " is already exist in item table")
    else :
      # TODO: どちらかのURLがNoneだったらエラーにする
      page_url = get_matching_elements(id, page_urls)
      image_url = get_matching_elements(id, image_urls)

      item = Item(id, name, page_url, image_url)

      # itemテーブルへのinsert
      print("insert " + name + " to item table")
      # TODO: 修正必要かも（insertの引数はオブジェクトの形にすべき？）
      # insert_response = SUPABASE_CLIENT.table("item").insert(item).execute()

    # limited_discountへのinsert
    # TODO: 当日のデータがすでにあった場合はinsertしないようにする
    try:
      print("insert " + name + " to limited_discount table")
      limited_discount = LimitedDiscount(id, price)
      # TODO: 修正必要かも（insertの引数はオブジェクトの形にすべき？）
      # insert_response = SUPABASE_CLIENT.table("limited_discount").insert(limited_discount).execute()
    except Exception:
      print("failed to insert " + name + " to limited_discount table")

# 取得した要素の数が一致しないとき、エラーとする
else:
  print('取得された要素数が正しくありません')
  print(f'Name: {len(names)}')
  print(f'Prices: {len(prices)}')
  print(f'Ids: {len(ids)}')