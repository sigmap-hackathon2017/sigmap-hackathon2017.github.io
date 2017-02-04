// Configuration Vega pour générer un diagramme circulaire
var conf = {
  "width": 300,
  "height": 300,
  "data": [
    {
      "name": "table",
      "url": '',
      "transform": [
        {
          "type": "pie",
          "field": "counter"
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "r",
      "type": "linear",
      "domain": {
        "data": "table",
        "field": "counter"
      },
      "range": [
        20,
        100
      ]
    },
    {
        "name": "c",
        "type": "ordinal",
        "domain": [1, 2],
        "range": ["#e377c2", "#1f77b4"]
      }
  ],
  "marks": [
    {
      "type": "arc",
      "from": {
        "data": "table"
      },
      "properties": {
        "enter": {
          "x": {
            "field": {
              "group": "width"
            },
            "mult": 0.5
          },
          "y": {
            "field": {
              "group": "height"
            },
            "mult": 0.5
          },
          "startAngle": {
            "field": "layout_start"
          },
          "endAngle": {
            "field": "layout_end"
          },
          "innerRadius": {
            "value": 20
          },
          "outerRadius": {
            "value": 150
          },
          "stroke": {
            "value": "#fff"
          }
        },
        "update": {
        	"fill": {"scale": "c", "field": "pr_abv_sexe"}
        }
      }
    }
  ]
};
