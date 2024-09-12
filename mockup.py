import json
from datetime import datetime, timedelta

def generate_temperature(time):
    hour = time.hour
    minute = time.minute
    second = time.second
    total_seconds = hour * 3600 + minute * 60 + second

    if hour < 5 or hour >= 21:
        return 0
    elif hour == 5:
        return round((total_seconds - 5 * 3600) / 36, 1)  # 0.1도씩 증가
    elif 5 < hour < 7 or (hour == 7 and minute < 30):
        return min(230, round((total_seconds - 5 * 3600) / 36, 1))
    elif hour >= 7 and hour < 20:
        base = 230 + (total_seconds % 240) / 12  # 4분 주기로 230에서 250 사이 변동
        return round(min(250, max(230, base)), 1)
    else:  # 20:00 to 20:59:59
        return max(0, round(240 - (total_seconds - 20 * 3600) / 3, 1))

def create_temperature_data():
    data = []
    current_time = datetime(2024, 9, 11)
    end_time = datetime(2024, 9, 12)

    while current_time < end_time:
        temperature = generate_temperature(current_time)
        data.append({
            "time": current_time.strftime("%H:%M:%S"),
            "temperature": temperature
        })
        current_time += timedelta(seconds=10)

    return {
        "date": "2024-09-11",
        "data": data
    }

def save_to_json(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    temperature_data = create_temperature_data()
    save_to_json(temperature_data, "temperature_data_2024_09_11.json")
    print("Temperature data has been generated and saved to 'temperature_data_2024_09_11.json'")