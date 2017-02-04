      /**
       * Define a namespace for the application.
       */
      window.app = {};
      var app = window.app;


      //
      // Indicateur pour le contexte (Monde ou pays) et l'année
      //


      /**
       * @constructor
       * @extends {ol.control.Control}
       * @param {Object=} opt_options Control options.
       */
      app.IndicateContextPerYear = function(opt_options) {

        var options = this.options = opt_options || {
          context: 'Monde',
          year: '2015'
        };

        var div = document.createElement('div');
        div.innerHTML = `Contexte: ${options.context}, Année: ${options.year}`;

        var this_ = this;

        var element = document.createElement('div');
        element.className = 'context-per-year ol-unselectable ol-control';
        element.appendChild(div);

        ol.control.Control.call(this, {
          element: element,
          target: options.target
        });

      };

      ol.inherits(app.IndicateContextPerYear, ol.control.Control);

      app.IndicateContextPerYear.prototype.setYear = function setYear(year) {
        this.options.year = year;
        this.element.firstChild.innerHTML = `Contexte: ${this.options.context}, Année: ${this.options.year}`;
      };

      app.IndicateContextPerYear.prototype.setContext = function setContext(context) {
        this.options.context = context;
        this.element.firstChild.innerHTML = `Contexte: ${this.options.context}, Année: ${this.options.year}`;
      };