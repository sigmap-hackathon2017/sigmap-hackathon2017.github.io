//Partage information du contexte et année
var contexte = {
  year: 2011,
  contexte: 'Monde',
  idContexte: 'WORLD',
  graph: ''
};

//Ouvrir l'onglet lors du click sur la page d'accueil
function openSideBar(id){
  sidebar.open(id);
}
//Permet de mettre à jour le treemap dans l'onglet (sidebar) OCDE
function load_treemap(contexte, conf_vega, target, fct) {
  var year = contexte.year;
  conf_vega.data[0].url = 'data/treemap/' + year + '.json';
  if (fct) {
    vg.parse.spec(conf_vega, function(error, chart) {
      var view_vg = chart({
        el: target
      }).update();
      vg.tooltip(view_vg, options_treemap);
      image = document.getElementById('img_treemap');
      image.src = view_vg.toImageURL();
    });
  }
  var treemapPopup = 'Migration vers la France par pays d\'origine (' +
                     contexte.year + ')';
  document.getElementById('lblTreemapPopup').innerHTML = treemapPopup;
};


//Permet de mettre à jour le ranking par pays dans l'onglet OCDE
function load_ranking(conf_vega, target, set_image) {

  conf_vega.data[0].url = 'data/ranking/' + contexte.idContexte + '_' + contexte.year + '.json';
  vg.parse.spec(conf_vega, function(error, chart) {
    var view_vg_ranking = chart({
      el: target
    }).update();
    if (set_image) {
       var image_ranking = document.getElementById('img_ranking');
       image_ranking.src = view_vg_ranking.toImageURL();
    }


    fetch('data/ranking_france/FRA_' + contexte.idContexte + '_' + contexte.year + '.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var position;
        if (json[0].rank == 1) {
          position = json[0].rank + 'ere';
        } else {
          position = json[0].rank + 'eme';
        }
        var rankFrance = "<b>Pays d'émigration privilégiés pour : " +
                         json[0].category + "</b><br/> La France est en " +
                         position + " position avec " + json[0].value +
                         " personnes";
        if (json[0].category != 'France' && json[0].value != 0) {
          document.getElementById('lblRankFrance').innerHTML = rankFrance;
        } else {
          document.getElementById('lblRankFrance').innerHTML = '';
        }
      });
  });
}

function load_visa_motif(conf_vega, target, set_image) {
  vg.parse.spec(conf_vega, function(error, chart) {
    var view_vg_visa_motif = chart({
      el: target
    }).update();
    vg.tooltip(view_vg_visa_motif, options_visa_motif);
    if (set_image) {
      var image_visa_motif = document.getElementById('img-visa-motif');
      image_visa_motif.src = view_vg_visa_motif.toImageURL();
    }
  });

  var visaMotifPopup = 'Motifs du visa';
  document.getElementById('lblVisaMotifPopup').innerHTML = visaMotifPopup;
}

load_visa_motif(visa_motif, '#visa-motif', true);
visa_motif.width = 800;
visa_motif.height = 600;
load_visa_motif(visa_motif, '#visa-motif-full', false);

function load_domaine_etudes_principal(conf_vega, target, set_image) {
  vg.parse.spec(conf_vega, function(error, chart) {
    var view_vg_domaine_etudes_principal = chart({
      el: target
    }).update();
    vg.tooltip(view_vg_domaine_etudes_principal, options_domaine_etudes_principale);
    if (set_image) {
      var image_domaine_etudes_principal = document.getElementById('img-domaine-etudes-principal');
      image_domaine_etudes_principal.src = view_vg_domaine_etudes_principal.toImageURL();
    }
  });

  var domaineEtudesPopup = 'Domaine principal d\'études';
  document.getElementById('lblDomaineEtudesPopup').innerHTML = domaineEtudesPopup;

}

load_domaine_etudes_principal(domaine_etudes_principal, '#domaine-etudes-principal', true);
domaine_etudes_principal.width = 800;
domaine_etudes_principal.height = 600;
load_domaine_etudes_principal(domaine_etudes_principal, '#domaine-etudes-principal-full', false);

// Style pour les flèches
var createArrowStyle = function createArrowStyle(coordPt, radius, rotation, fillColor, strokeColor) {
  return new ol.style.Style({
    geometry: new ol.geom.Point(coordPt),
    image: new ol.style.RegularShape({
      fill: new ol.style.Fill({color: fillColor}),
      points: 3,
      radius: radius,
      stroke: new ol.style.Stroke({
        color: strokeColor
      }),
      rotateWithView: false,
      rotation: -rotation + (Math.PI / 2)
    })
  });
};

var extractRotation = function extractRotation(twoCoordinates) {
  var start = twoCoordinates[0];
  var end = twoCoordinates[1];
  var dx = end[0] - start[0];
  var dy = end[1] - start[1];
  return Math.atan2(dy, dx);
};

var lineStyle = function lineStyle(width, color) {
  return new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: color,
      width: width,
      lineCap: 'butt'
    })
  });
};

// Préparation des styles pour les visas par nationalité
var fill_nationalite = new ol.style.Fill({
//  color: [80, 80, 80, 0.9]
  color: [151, 59, 215, 0.9]
});

var stroke_nationalite = new ol.style.Stroke({
  color: [255, 255, 255],
  width: 2
});

function style_nationalite(feature, resolution) {
  var radius_size = Math.pow(feature.get('counter') / Math.PI, 1 / 2) / (resolution / 10000)
  feature.set('radius', radius_size);
  var styles = [new ol.style.Style({
    image: new ol.style.Circle({
      radius: feature.get('radius'),
      fill: fill_nationalite,
      stroke: stroke_nationalite
    })
  })];
  return styles;
}

//Creation du control slider
app.Slider = function(opt_options) {

  var options = opt_options || {};

  var slider = document.createElement('div');
  slider.id = 'slider1';
  slider.style.width = '400px';

  var sub_element = document.createElement('div');
  sub_element.appendChild(slider);

  var element = document.createElement('div');
  element.className = 'time-slider ol-unselectable ol-control';
  element.appendChild(sub_element);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });


};
ol.inherits(app.Slider, ol.control.Control);

var opentopomap_url = 'http://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png';
// var opentopomap_url = 'http://localhost:8081/{z}/{x}/{y}.png';

// Création d'une carte en ajoutant un fond de plan
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      id: 'osm',
      source: new ol.source.OSM({
        url: opentopomap_url,
        crossOrigin: null
      })
    })
  ],
  view: new ol.View({
    center: ol.proj.transform([7, 51.2], 'EPSG:4326', 'EPSG:3857'),
    zoom: 4,
    maxZoom: 8,
    minZoom: 2
  }),
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  })
});

// Valeur calculée reportée "en dur"
var max_valeur_flux = 12285;
var max_width_flux = 60;
var color_arrow = '#973BD7';

var flux_cef = new ol.layer.Image({
  source: new ol.source.ImageVector({
    source: new ol.source.Vector()
  })
});

flux_cef.getSource().setStyle(function(feature, resolution) {
  if (feature.get('total')) {

    var styles = [
      lineStyle(
        (max_width_flux / max_valeur_flux) * +feature.get('total') / (resolution / 10000) + 2,
        'white'
      ),
      lineStyle(
        (max_width_flux / max_valeur_flux) * +feature.get('total') / (resolution / 10000),
        color_arrow
      )
    ];

    var coordinates = feature.getGeometry().getCoordinates();
    var twoCoordinates = coordinates.slice(
      coordinates.length - 2,
      coordinates.length
    );
    var rotation = extractRotation(twoCoordinates);
    // arrows
    var radius = (max_width_flux / max_valeur_flux) * +feature.get('total');
    styles.push(
      createArrowStyle(twoCoordinates[1], radius / (resolution / 10000), rotation, color_arrow, color_arrow)
    );
    return styles;
  } else {
    return null;
  }
});

function loadVector(url, source) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var features = (new ol.format.GeoJSON()).readFeatures(json, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });
      source.addFeatures(features);
    });
}

// Création et ajout d'un control latéral
var sidebar = new ol.control.Sidebar({
  element: 'sidebar',
  position: 'left'
});

map.addControl(sidebar);

sidebar.open('home');

function load_visa_attributes(contexte, source) {
  fetch('data/visas/' + contexte.year + '.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
      source.forEachFeature(function(feature) {
        var code = feature.get('adm0_a3');
        for (var i = 0; i < json.length; i++) {
          if (json[i].code == code) {
            feature.set('counter', json[i].total);
            // console.log(json[i].total, feature.get('adm0_a3'), feature.get('counter'));
          }
        }
      })
    });
}

// Création et ajout de la couche des pays
var world_vector = new ol.layer.Image({
  id: 'countries',
  source: new ol.source.ImageVector({
    source: new ol.source.Vector({
      url: 'data/ne_10m_admin_0_countries.json',
      format: new ol.format.TopoJSON()
    }),
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
          color: 'green',
          width: 1
      })
  })
  })
});

map.addLayer(world_vector);

// Création et ajout de la couche des points ayant une nationalité
var layer_visa_nationalite = new ol.layer.Image({
  id: 'visa',
  title: 'Visas par nationalité',
  source: new ol.source.ImageVector({
    source: new ol.source.Vector({
      url: 'data/nb_visa_par_nationalite.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: style_nationalite
  })
});

map.addLayer(layer_visa_nationalite);

layer_visa_nationalite.setVisible(false);

map.addLayer(flux_cef);

// Référence vers la source
var vector_nationalite_source = layer_visa_nationalite.getSource().getSource();
// Quand la couche est chargée, calculer le diamètre pour le cercle
var key = vector_nationalite_source.on('change', function(event) {
  if (vector_nationalite_source.getState() == 'ready') {
    vector_nationalite_source.unByKey(key);
    load_visa_attributes(contexte, vector_nationalite_source);

  }
});

var my_slider = d3.slider();
// my_slider.value(2012)
// tabindex dans HTML
map.getControls().once('add', function(evt) {
  d3.select('#slider1').call(my_slider
    .axis(true)
    .min(2006)
    .max(2015)
    .step(1)
    .value(contexte.year)
    .on("slide", function(evt, value) {
      date = d3.slider().min() + value
      contextor.setYear('' + date);
      contexte.year = date;

      sidebar_change();
    }));
})

var addControl = new app.Slider();
map.addControl(addControl);

var contextor = new app.IndicateContextPerYear();
contextor.setYear(contexte.year);
contextor.setContext(contexte.contexte);
map.addControl(contextor);



// Ajout d'une infobulle (tooltip)
var tooltip = document.getElementById('tooltip');
var overlay = new ol.Overlay({
  element: tooltip,
  offset: [10, 0],
  positioning: 'bottom-left'
});
map.addOverlay(overlay);


function displayTooltipNbVisa(evt) {
  if (evt.dragging) {
    tooltip.style.display = 'none';
    return;
  }
  var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
    return feature;
  }, {
    layerFilter: function(candidate) {
      if (['visa'].indexOf(candidate.get('id')) > -1) {
        return true;
      };
      return false;
    }
  });
  tooltip.style.display = feature ? '' : 'none';
  if (feature) {
    overlay.setPosition(evt.coordinate);
    tooltip.innerHTML = 'Pays: ' + (feature.get('formal_fr') ? feature.get('formal_fr') : feature.get('name')) + '<br>' + 'Nombre de personnes: ' + feature.get('counter');
  }
};

map.on('pointermove', displayTooltipNbVisa);


var style_select_countries = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: tinycolor('green').darken(10).toHexString(),
    width: 2
  }),
  fill: new ol.style.Fill({
    color: [255, 255, 255, 0.5]
  })
});

// Selection du pays au click
var select = new ol.interaction.Select({
  toggleCondition: ol.events.condition.never,
  removeCondition: ol.events.condition.never,
  layers: [world_vector],
  style: style_select_countries
});

map.addInteraction(select);

select.on('select', function(evt) {
  var feature = evt.selected;
  document.getElementById('vis').style.display = feature ? '' : 'none';
  if (feature.length > 0) {
    conf.data[0].url = 'data/age/' + feature[0].get('adm0_a3').toLowerCase() + '.json';
    vg.parse.spec(conf, function(error, chart) {
      var view = chart({
        el: "#vis"
      }).update();
      vg.tooltip(view, options_diag_age);
    });
    document.getElementById('vis').style.display = feature ? '' : 'none';

    conf.data[0].url = 'data/age/' + feature[0].get('adm0_a3').toLowerCase() + '.json';
    vg.parse.spec(conf, function(error, chart) {
      var view = chart({
        el: "#vis"
      }).update();
      vg.tooltip(view, options_diag_age);
    });

    contexte.contexte = (feature[0].get('formal_fr') ? feature[0].get('formal_fr') : feature.get('name'));
    contexte.idContexte = feature[0].get('adm0_a3');
    document.getElementById('lblCountry').innerHTML = contexte.contexte;
  } else {
    contexte.contexte = 'Monde';
    contexte.idContexte = 'WORLD';
    document.getElementById('lblCountry').innerHTML = '';
    document.getElementById('lblCountry').style.display = 'none';
  }
  contextor.setContext(contexte.contexte);

  //On cache la pyramide lors du click sur un pays
  var div_world_show = document.getElementById('world-hide-show');
  var div_diag = document.getElementById('vis');
  if(contexte.idContexte == 'WORLD') {
    div_world_show.style.display = 'block';
    div_diag.style.display = 'none';
  }
  else {
    div_world_show.style.display = 'none';
    div_diag.style.display = 'block';
  }


  //MAJ du ranking pour le pays sélectionné
  if (contexte.idContexte != 'WORLD') {
    conf_ranking.width = 280;
    conf_ranking.height = 340;
    load_ranking(conf_ranking, '#ranking', true);

    conf_ranking.width = 960;
    conf_ranking.height = 500;
    load_ranking(conf_ranking, '#ranking-full');
  }

  var rankPopup = contexte.contexte + ' ' + contexte.year;
  document.getElementById('lblRankPopup').innerHTML = rankPopup;

});

var select_flux = new ol.interaction.Select({
  toggleCondition: ol.events.condition.never,
  removeCondition: ol.events.condition.never,
  layers: [flux_cef],
  style : function(feature, resolution) {
    if (feature.get('total')) {

      var select_arrow_color = tinycolor(color_arrow).lighten(20).toHexString();
      var styles = [
        lineStyle(
          (max_width_flux / max_valeur_flux) * +feature.get('total') / (resolution / 10000),
          select_arrow_color
        )
      ];

      var coordinates = feature.getGeometry().getCoordinates();
      var twoCoordinates = coordinates.slice(
        coordinates.length - 2,
        coordinates.length
      );
      var rotation = extractRotation(twoCoordinates);
      // arrows
      var radius = (max_width_flux / max_valeur_flux) * +feature.get('total');
      styles.push(
        createArrowStyle(
          twoCoordinates[1], radius / (resolution / 10000),
          rotation,
          select_arrow_color,
          select_arrow_color
        )
      );
      return styles;
    } else {
      return null;
    }
  }
});

map.addInteraction(select_flux);

select_flux.setActive(false);



var container = document.getElementById('popup');

var popup = new ol.Overlay.Popup();
map.addOverlay(popup);

select_flux.on('select', function(evt) {
  if (evt.selected.length > 0) {
    var text_popup = '<h2>Visas étudiants:</h2>' +
                     '<i>Pays: ' + evt.selected[0].get('nom_pays') + '</i><br/>' +
                     '<i>Nombre: ' + evt.selected[0].get('total') + '</i><br/>';
    container.innerHTML = text_popup;
    container.style.display = '';
    popup.show(evt.mapBrowserEvent.coordinate, container);
  } else {
    popup.innerHTML = '&nbsp;';
    popup.hide();
  }
});

vg.parse.spec('population.json', function(error, chart) {
  var view_pyramide = chart({
    el: "#pyramide-full"
  }).update();
  vg.tooltip(view_pyramide, options_pyramide);
  var pyramidePopup = 'Répartition femme/homme des Visas sur la période 2006 - 2016 vision mondiale';
  document.getElementById('lblPyramidePopup').innerHTML = pyramidePopup;
});

conf_treemap.data[0].url = 'data/treemap/' + contexte.year + '.json';

vg.parse.spec(conf_treemap, function(error, chart) {
  var view = chart({
    el: "#treemap-full"
  }).update();
  vg.tooltip(view, options_treemap);
});

// Instantier une nouvelle modale
var modal_treemap = new VanillaModal({
  onBeforeOpen: function(e) {
    sidebar.close('ocde');
    document.getElementById('sidebar').style.display = 'none';
  },
  onOpen: function(e) {
    var id_diagram;
    if (this.current.id == 'treemap-container' || this.current.id == 'ranking-container') {
      id_diagram = 'ocde';
    } else if (this.current.id == 'pyramide-container') {
      id_diagram = 'visa';
    } else if (this.current.id == 'visa-motif-container') {
      id_diagram = 'visa';
    }
    sidebar.close(id_diagram);
  },
  onBeforeClose: function(e) {
    var id_diagram;
    if (this.current.id == 'treemap-container' || this.current.id == 'ranking-container') {
      id_diagram = 'ocde';
    } else if (this.current.id == 'pyramide-container') {
      id_diagram = 'visa';
    } else if (this.current.id == 'visa-motif-container') {
      id_diagram = 'visa';
    } else if (this.current.id == 'domaine-etudes-principal-container') {
      id_diagram = 'cef';
    }
    sidebar.open(id_diagram);
  },
  onClose: function(e) {
    document.getElementById('sidebar').style.display = '';
  }
});

// Charger le treemap lors du premier lancement pour générer l'image d'aperçu
conf_treemap.width = 381;
conf_treemap.height = 200;

conf_treemap.data[0].transform[0].size[0] = 381;
conf_treemap.data[0].transform[0].size[1] = 200;

load_treemap(contexte, conf_treemap, '#treemap', (function() {
  if (contexte.year < 2014) {
    return true;
  }
  return false;
})());

// Listener pour savoir quelle onglet est actif quand on passe de l'un à l'autre
// Permet d'activer/désactiver l'affichage des diagrammes et couches associés à l'onglet
document.querySelector('#sidebar').addEventListener('click', function(element) {
  var activated;
  if (element.target && element.target.nodeName == 'I') {
    activated = element.target.parentElement.hash.replace('#', '');
  } else if (element.target && element.target.nodeName == 'A') {
    activated = element.target.hash.replace('#', '');
  }
  if (activated != undefined) {
    // Cas CEF actif et on a activé un autre onglet
    if (['home', 'visa', 'ocde', 'messages', 'settings'].indexOf(activated) != -1) {
      flux_cef.setVisible(false);
      select_flux.setActive(false);
      select.setActive(true);
    }
    if (activated == 'cef') {
      flux_cef.setVisible(true);
      select_flux.setActive(true);
      select.setActive(false);
      loadVector(
        'data/flux/' + contexte.year + '.json',
        flux_cef.getSource().getSource()
      );
      container.style.display = '';
      select.getFeatures().clear();
    } else {
      container.style.display = 'none';
      select_flux.getFeatures().clear();
      popup.hide();
    }

    if (activated != 'visa') {
      layer_visa_nationalite.setVisible(false);
    } else {
      layer_visa_nationalite.setVisible(true);
    }

  }
});


//Options d'affichage des différents Tooltip

var options_diag_age = {
  showAllFields: false,
  fields: [{
    field: "pr_abv_sexe",
    title: "Sexe ",
    formatType: "string"
  }, {
    field: "name",
    title: "Pays: ",
    formatType: "string"
  }, {
    field: "counter",
    title: "Visas délivrés ",
    formatType: "string"
  }]
};

var options_treemap = {
  showAllFields: false,
  fields: [{
      field: "country",
      title: "Pays: ",
      formatType: "string"
    },
    {
      field: "size",
      title: "Emigrants vers la France ",
      formatType: "string"
    }
  ]
};

var options_pyramide = {
  showAllFields: false,
  fields: [{
      field: "lib_sexe",
      title: "Type de population",
      formatType: "string"
    },
    {
      field: "people",
      title: "Emigrants vers la France ",
      formatType: "string"
    }
  ]
};

var options_domaine_etudes_principale = {
  showAllFields: false,
  fields: [{
      field: "libelle_etude_princ",
      title: "Études principal",
      formatType: "string"
    },
    {
      field: "year",
      title: "Année",
      formatType: "string"
    },
    {
      field: "total",
      title: "Total",
      formatType: "string"
    }
  ]
};

var options_visa_motif = {
  showAllFields: false,
  fields: [{
      field: "lib_recode",
      title: "Motifs du visa",
      formatType: "string"
    },
    {
      field: "year",
      title: "Année",
      formatType: "string"
    },
    {
      field: "total",
      title: "Total",
      formatType: "string"
    }
  ]
};

function sidebar_change() {

  var rankPopup = contexte.contexte + ' ' + contexte.year;
  document.getElementById('lblRankPopup').innerHTML = rankPopup;

  var treemapPopup = 'Migration vers la France par pays d\'origine (' +
                     contexte.year + ')';
  document.getElementById('lblTreemapPopup').innerHTML = treemapPopup;

  var active = document.querySelector('.sidebar-content .sidebar-pane.active');
  if (active != undefined) {

    // Gestion affichage contenu sidebar
    if (active.id == 'cef') {
      flux_cef.getSource().getSource().clear();
      loadVector(
        'data/flux/' + contexte.year + '.json',
        flux_cef.getSource().getSource()
      );
    } else if (active.id == 'ocde') {

      conf_treemap.width = 381;
      conf_treemap.height = 200;
      conf_treemap.data[0].transform[0].size[0] = 381;
      conf_treemap.data[0].transform[0].size[1] = 200;
      load_treemap(contexte, conf_treemap, '#treemap', (function() {
        if (contexte.year < 2014) {
          return true;
        }
        return false;
      })());

      conf_ranking.width = 280;
      conf_ranking.height = 340;
      load_ranking(conf_ranking, '#ranking', true);

      conf_treemap.width = 960;
      conf_treemap.height = 500;
      conf_treemap.data[0].transform[0].size[0] = 960;
      conf_treemap.data[0].transform[0].size[1] = 500;
      load_treemap(contexte, conf_treemap, '#treemap-full', (function() {
        if (contexte.year < 2014) {
          return true;
        }
        return false;
      })());

      conf_ranking.width = 960;
      conf_ranking.height = 500;
      load_ranking(conf_ranking, '#ranking-full');
    } else if (active.id == 'visa') {
        load_visa_attributes(contexte, vector_nationalite_source);
    }

    // Gestion affichage carte
    if (active.id == 'cef') {
      flux_cef.setVisible(true);
      container.style.display = 'none';
      select_flux.getFeatures().clear();
    } else {
      flux_cef.setVisible(false);
    }
    popup.hide();
  }
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if ([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014].indexOf(contexte.year) != -1) {
    if (keyName == 'ArrowRight') {
      contexte.year = contexte.year + 1;
      my_slider.value(contexte.year);
      contextor.setYear('' + contexte.year);
      sidebar_change();

    }
  }
  if ([2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015].indexOf(contexte.year) != -1) {
    if (keyName == 'ArrowLeft') {
      contexte.year = contexte.year - 1;
      my_slider.value(contexte.year);
      contextor.setYear('' + contexte.year);
      sidebar_change();
    }
  }
}, false);


