from flask import Flask, render_template, request
from pusher import Pusher
import sqlite3
import os.path

app = Flask(__name__)

# configure pusher object
pusher = Pusher(
    app_id="1618615",
    key="7bcef49942abe5d0aee5",
    secret="4fc55fe03aa7d80b569a",
    cluster="sa1",
    ssl=True,
)


def get_db_connection():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "database.db")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/log")
def log():
    conn = get_db_connection()
    logs = conn.execute("SELECT * FROM parameters_log;").fetchall()
    conn.close()
    return render_template("log.html", logs=logs)


@app.route("/update_parameters", methods=["POST"])
def update_paremeters():
    # Trigger pusher event
    data = request.json
    pusher.trigger(
        "parameters",
        "update",
        {
            "ph": data["ph"],
            "temperature": data["temperature"],
            "humidity": data["humidity"],
            "luminosity": data["luminosity"],
            "water_level": data["water_level"],
        },
    )

    conn = get_db_connection()

    cur = conn.cursor()

    cur.execute(
        f"INSERT INTO parameters_log (ph_level,temperature_level,humidity_level,luminosity_level,water_level) values ({data['ph']},{data['temperature']},{data['humidity']},{data['luminosity']},{data['water_level']});"
    )

    conn.commit()
    conn.close()

    return "parameters updated"


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0")
