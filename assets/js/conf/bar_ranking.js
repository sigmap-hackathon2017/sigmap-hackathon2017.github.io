var conf_ranking = {
  "width": 280,
  "height": 340,
  "data": [
    {
      "name": "table",
      "url": "data/ranking/2000.json"
    }
  ],
  "scales": [
    {
      "name": "cat",
      "type": "ordinal",
      "domain": {"data": "table", "field": "category"},
      "range": "height",
      "padding": 0.2
    },
    {
      "name": "val",
      "type": "linear",
      "domain": {"data": "table", "field": "value"},
      "range": "width",
      "round": true,
      "nice": true
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "table", "field": "position"},
      "range": "category10"
    }
  ],
  "axes": [
    {"type": "y", "scale": "cat", "tickSize": 0, "tickPadding": 8, "properties": {
    	"labels": {
    		"angle": {"value": -45},
    		"baseline": {"value": "top"},
    		"dy": {"value": -15}
    	}
    }},
    {"type": "x", "scale": "val", "properties": {
    	"labels": {
    		"angle": {"value": -45},
    		"baseline": {"value": "top"},
    		"dx": {"value": -15}
    	}
    }}
  ],
  "marks": [
    {
      "type": "group",
      "from": {
        "data": "table",
        "transform": [{"type":"facet", "groupby": ["category"]}]
      },
      "properties": {
        "enter": {
          "y": {"scale": "cat", "field": "key"},
          "height": {"scale": "cat", "band": true}
        }
      },
      "scales": [
        {
          "name": "pos",
          "type": "ordinal",
          "range": "height",
          "domain": {"field": "position"}
        }
      ],
      "marks": [
        {
          "name": "bars",
          "type": "rect",
          "properties": {
            "enter": {
              "y": {"scale": "pos", "field": "position"},
              "height": {"scale": "pos", "band": true},
              "x": {"scale": "val", "field": "value"},
              "x2": {"scale": "val", "value": 0},
              "fill": {"scale": "color", "field": "position"}
            }
          }
        },
        {
          "type": "text",
          "from": {"mark": "bars"},
          "properties": {
            "enter": {
              "x": {"field": "x2", "offset": -5},
              "y": {"field": "y"},
              "dy": {"field": "height", "mult": 0.5},
              "fill": {"value": "white"},
              "align": {"value": "right"},
              "baseline": {"value": "middle"},
              "text": {"field": "datum.value"}
            }
          }
        }
      ]
    }
  ]
};