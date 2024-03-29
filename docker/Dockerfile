FROM python:3.10-slim

# Chromeをインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    xvfb \
    libxi6 \
    libgconf-2-4 \
 && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
 && dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /google-chrome-stable_current_amd64.deb

# Python依存関係のインストール
RUN pip install --upgrade pip \
    && pip install supabase selenium webdriver-manager beautifulsoup4 \
    && rm -rf /root/.cache/pip

WORKDIR /app
