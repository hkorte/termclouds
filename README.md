Elasticsearch Term Clouds
=========================

This project can be used as an [Elasticsearch](http://www.elasticsearch.org/) plugin or a standalone javascript application to generate word clouds based on your index and your search queries.

It is called term clouds, because in the search engine world words are called terms. The terms and their weights are computed using the new [significant terms aggregations](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significantterms-aggregation.html) feature of Elasticsearch. Thus, you will need at least Elasticsearch 1.1.0 to use this plugin. For rendering the word cloud the great library [wordcloud2.js](https://github.com/timdream/wordcloud2.js) is used.

**Please feel free to contribute!** Right now it is rather a proof-of-concept than a real application producing customizable and beautiful word clouds. ;)

Installation
------------

1. `bin/plugin -install hkorte/termclouds`
2. open `http://localhost:9200/_plugin/termclouds/`

Usage
-----

Simply enter the index name, the document type and the field to read the values from, make up a sensible query and hit the submit button.

Examples
--------

Here are some example screenshots for the impatient:

![The term cloud for a query for "programming" over a wikipedia subset.](http://hkorte.github.io/termclouds/2014-05-23_termclouds-screenshot-programming.png "The term cloud for a query for "programming" over a wikipedia subset.")

![The term cloud for a query for "nsa" over a wikipedia subset.](http://hkorte.github.io/termclouds/2014-05-23_termclouds-screenshot-nsa.png "The term cloud for a query for "nsa" over a wikipedia subset.")

![The term cloud for a query for "jazz" over a wikipedia subset.](http://hkorte.github.io/termclouds/2014-05-23_termclouds-screenshot-jazz.png "The term cloud for a query for "jazz" over a wikipedia subset.")
