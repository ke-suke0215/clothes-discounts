import datetime

now = datetime.datetime.now()
print("現在時刻: ")
print(now)

# 現在から9時間前
nine_hours_ago = now - datetime.timedelta(hours=9)
print("9時間前: ")
print(nine_hours_ago)