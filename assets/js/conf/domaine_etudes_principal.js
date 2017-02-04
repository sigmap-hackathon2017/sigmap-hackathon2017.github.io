var domaine_etudes_principal = {
  "width": 200,
  "height": 140,
  "data": [
    {
      "name": "domaine_etudes_principal",
      "url": "data/domaine_etudes_principal_data.json"
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "linear",
      "range": "width",
      "zero": false,
      "domain": {"data": "domaine_etudes_principal", "field": "year"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "nice": true,
      "domain": {"data": "domaine_etudes_principal", "field": "total"}
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "domaine_etudes_principal", "field": "libelle_etude_princ"},
      "range": "category10"
    }
  ],
  "axes": [
    {"type": "x", "scale": "x", "tickSizeEnd": 0, "format": "d"},
    {"type": "y", "scale": "y"}
  ],
  "legends": [
    {"fill": "color", "title": "Domaine d'études"}
  ],
  "marks": [
    {
      "type": "group",
      "from": {
        "data": "domaine_etudes_principal",
        "transform": [{"type": "facet", "groupby": ["libelle_etude_princ"]}]
      },
      "marks": [
        {
          "type": "line",
          "properties": {
            "enter": {
              "x": {"scale": "x", "field": "year"},
              "y": {"scale": "y", "field": "total"},
              "stroke": {"scale": "color", "field": "libelle_etude_princ"},
              "strokeWidth": {"value": 2},
              "interpolate": "step-before"
            }
          }
        },
        {
          "type": "symbol",
          "properties": {
            "enter": {
              "x": {"scale": "x","field": "year"},
              "y": {"scale": "y","field": "total"},
              "stroke": {"value": "steelblue"},
              "fill": {"value": "white"},
              "size": {"value": 30}
            }
          }
        }
      ]
    }
  ]
}
