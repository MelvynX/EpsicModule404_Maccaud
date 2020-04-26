# Un objet "obj_mon_application" pour utiliser la classe Flask
# Pour les personnes qui veulent savoir ce que signifie __name__ une démonstration se trouve ici :
# https://www.studytonight.com/python/_name_-as-main-method-in-python
# C'est une chaîne de caractère qui permet de savoir si on exécute le code comme script principal
# appelé directement avec Python et pas importé.
from flask import Flask, render_template
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")

bcrypt = Bcrypt(app)
# cors permet de généré automatiquement les droits "allow-origin" etc... Qui permette de répondre
# à la méthod OPTION et donc de pouvoir excectuer la tache !
CORS(app)
# Flask va pouvoir crypter les cookies
app.secret_key = "MGC@@VdpdJr@c/Kp7(H#BO"


@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template("404.html"), 404


from app.controller.model import (
    category_page,
    dashboard_page,
    item_page,
    tiqet_page,
    auth_page,
)
from app.controller.api import category_api, item_api, tiqet_api, auth_api
