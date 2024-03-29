FROM python:3.10

# Chromeをインストールするための依存関係をインストール
RUN apt-get update && apt-get install -y \
    wget \
    xvfb \
    libxi6 \
    libgconf-2-4

# Chromeをダウンロードしてインストール
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

# Python依存関係のインストール
RUN pip install --upgrade pip \
    && pip install supabase selenium webdriver-manager beautifulsoup4 psycopg2-binary

# 作業ディレクトリの設定
WORKDIR /app
