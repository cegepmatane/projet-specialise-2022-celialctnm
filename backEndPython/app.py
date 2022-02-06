from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://celia:03092002@localhost/backEndPython'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    magasin = db.Column(db.String(100))
    date = db.Column(db.DateTime)
    montant = db.Column(db.Integer)

    def __init__(self, magasin, date, montant):
        self.magasin = magasin
        self.date = date
        self.montant = montant


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'magasin', 'date', 'montant')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods=['GET'])
def get_articles():
    all_articles = Article.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)


@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    article = Article.query.get(id)
    return article_schema.jsonify(article)


@app.route('/add', methods=['POST'])
def add_article():
    magasin = request.json['magasin']
    date = request.json['date']
    montant = request.json['montant']

    articles = Article(magasin, date, montant)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)


@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = Article.query.get(id)
    magasin = request.json['magasin']
    date = request.json['date']
    montant = request.json['montant']

    article.magasin = magasin
    article.date = date
    article.montant = montant
    db.session.commit()
    return article_schema.jsonify(article)


@app.route('/delete/<id>/', methods=['DELETE'])
def delete_article(id):
    article = Article.query.get(id)
    db.session.delete(article)
    db.session.commit()
    return article_schema.jsonify(article)


if __name__ == '__main__':
    app.run(host='192.168.24.248', port=19000, debug=True)
