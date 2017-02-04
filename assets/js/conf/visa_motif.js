var visa_motif = {
  "width": 210,
  "height": 200,
  "data": [
    {
      "name": "visa_motif",
      "url": "data/visa_motif_data.json"
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "linear",
      "range": "width",
      "zero": false,
      "domain": {"data": "visa_motif", "field": "year"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "zero": true,
      "domain": {"data": "visa_motif", "field": "total"},
      "round": true
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "visa_motif", "field": "recode"},
      "range": "category20"
    }
  ],
  "axes": [
    {"type": "x", "scale": "x", "tickSizeEnd": 0, "format": "d", "properties": {
      "labels": {
        "angle": {"value": -45},
        "baseline": {"value": "top"},
        "dx": {"value": -15},
        "dy": {"value": 0}
      }
    }},
    {"type": "y", "scale": "y", "properties": {
      "labels": {
        "angle": {"value": -45},
        "baseline": {"value": "top"},
        "dy": {"value": -15}
      }
    }}
  ],
  "legends": [
    {"fill": "color", "title": "Motifs du visa"}
  ],
  "marks": [
    {
      "type": "group",
      "from": {
        "data": "visa_motif",
        "transform": [{"type": "facet", "groupby": ["recode"]}]
      },
      "marks": [
        {
          "type": "line",
          "properties": {
            "enter": {
              "x": {"scale": "x", "field": "year"},
              "y": {"scale": "y", "field": "total"},
              "stroke": {"scale": "color", "field": "recode"},
              "strokeWidth": {"value": 2}
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
};
