import datetime

now = datetime.datetime.now()
print("現在時刻: ")
print(now)

# 現在から9時間後（日本時間）
nine_hours_later = now + datetime.timedelta(hours=9)
print("9時間前: ")
print(nine_hours_later)