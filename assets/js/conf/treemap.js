// Configuration Vega pour générer un treemap
var conf_treemap = {
  "width": 960,
  "height": 500,
  "padding": 2.5,
  "data": [
    {
      "name": "tree",
      "url": "data/treemap/2014.json",
      "format": {"type": "treejson"},
      "transform": [
        {"type": "treemap", "field": "size", "size": [960, 500]}
      ]
    }
  ],
  "scales": [
    {
      "name": "color",
      "type": "ordinal",
      "range": [
        "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d",
        "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476",
        "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc",
        "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"
      ]
    },
    {
      "name": "size",
      "type": "ordinal",
      "domain": [0, 20000],
      "range": [25, 50]
    }
  ],
  "marks": [
    {
      "type": "rect",
      "from": {
        "data": "tree",
        "transform": [{"type":"filter", "test":"datum.children"}]
      },
      "interactive": false,
      "properties": {
        "enter": {
          "x": {"field": "layout_x"},
          "y": {"field": "layout_y"},
          "width": {"field": "layout_width"},
          "height": {"field": "layout_height"},
          "fill": {"scale": "color", "field": "name"}
        }
      }
    },
    {
      "type": "rect",
      "from": {
        "data": "tree",
        "transform": [{"type":"filter", "test":"!datum.children"}]
      },
      "properties": {
        "enter": {
          "x": {"field": "layout_x"},
          "y": {"field": "layout_y"},
          "width": {"field": "layout_width"},
          "height": {"field": "layout_height"},
          "stroke": {"value": "#fff"}
        },
        "update": {
          "fill": {"value": "rgba(0,0,0,0)"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    },
    {
      "type": "text",
      "from": {
        "data": "tree",
        "transform": [{"type":"filter", "test":"datum.children"}]
      },
      "interactive": false,
      "properties": {
        "enter": {
          "x": {"field": "layout_x"},
          "y": {"field": "layout_y"},
          "dx": {"field": "layout_width", "mult": 0.5},
          "dy": {"field": "layout_height", "mult": 0.5},
          "font": {"value": "Helvetica Neue"},
          "fontSize": {"value": "12"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "fill": {"value": "#000"},
          "text": {"field": "name"}
        }
      }
    }
  ]
}

