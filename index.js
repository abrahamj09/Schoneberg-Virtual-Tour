/*
 * Copyright 2016 Google Inc. All rights reserved.
 */
'use strict';

(function() {

  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.APP_DATA;

  // =========================
  // DOM ELEMENTS
  // =========================
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

  var mapView = document.getElementById('map-view');
  var tourView = document.getElementById('tour-view');
  var backToMapButton = document.getElementById('backToMapButton');

  var overlay = document.getElementById('image-overlay');
  var overlayImg = document.getElementById('overlay-img');

  // =========================
  // DEVICE MODE
  // =========================
  if (window.matchMedia) {
    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");

    var setMode = function() {
      document.body.classList.toggle('mobile', mql.matches);
      document.body.classList.toggle('desktop', !mql.matches);
    };

    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  }

  document.body.classList.add('no-touch');

  window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });

  // =========================
  // VIEWER
  // =========================
  var viewer = new Marzipano.Viewer(panoElement, {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  });

  // =========================
  // SCENES
  // =========================
  var scenes = data.scenes.map(function(sceneData) {

    var urlPrefix = "https://pub-9fafa387330246479f2cea55901c2121.r2.dev";

    var source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + "/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg",
      { cubeMapPreviewUrl: urlPrefix + "/" + sceneData.id + "/preview.jpg" }
    );

    var geometry = new Marzipano.CubeGeometry(sceneData.levels);

    var limiter = Marzipano.RectilinearView.limit.traditional(
      sceneData.faceSize,
      100 * Math.PI / 180,
      120 * Math.PI / 180
    );

    var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // =========================
    // IMAGE HOTSPOTS (SAFE)
    // =========================
    (sceneData.imageHotspots || []).forEach(function(hotspot) {

      var element = createImageHotspotElement(hotspot);

      scene.hotspotContainer().createHotspot(element, {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch
      });
    });

    // =========================
    // LINK HOTSPOTS
    // =========================
    (sceneData.linkHotspots || []).forEach(function(hotspot) {

      var element = createLinkHotspotElement(hotspot);

      scene.hotspotContainer().createHotspot(element, {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch
      });
    });

    // =========================
    // INFO HOTSPOTS
    // =========================
    (sceneData.infoHotspots || []).forEach(function(hotspot) {

      var element = createInfoHotspotElement(hotspot);

      scene.hotspotContainer().createHotspot(element, {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch
      });
    });

    return {
      data: sceneData,
      scene: scene,
      view: view
    };
  });

  // =========================
  // OVERLAY CLOSE
  // =========================
  if (overlay) {
    overlay.addEventListener("click", function() {
      overlay.classList.remove("active");
    });
  }

  // =========================
  // IMAGE HOTSPOT
  // =========================
  function createImageHotspotElement(hotspot) {

    var wrapper = document.createElement('div');
    wrapper.className = 'image-hotspot';

    var img = document.createElement('img');
    img.src = hotspot.preview || '';

    wrapper.appendChild(img);

    wrapper.addEventListener('click', function() {

      if (!overlay || !overlayImg) return;

      overlayImg.src = hotspot.full || hotspot.preview;
      overlay.classList.add('active');
    });

    return wrapper;
  }

  // =========================
  // LINK HOTSPOT
  // =========================
  function createLinkHotspotElement(hotspot) {

    var wrapper = document.createElement('div');
    wrapper.className = 'link-hotspot';

    var icon = document.createElement('img');
    icon.src = 'img/link.png';
    icon.className = 'link-hotspot-icon';

    wrapper.appendChild(icon);

    wrapper.addEventListener('click', function() {
      switchScene(findSceneById(hotspot.target));
    });

    return wrapper;
  }

  // =========================
  // INFO HOTSPOT
  // =========================
  function createInfoHotspotElement(hotspot) {

    var wrapper = document.createElement('div');
    wrapper.className = 'info-hotspot';

    wrapper.innerHTML = hotspot.title || '';

    return wrapper;
  }

  // =========================
  // SCENE SWITCH
  // =========================
  function switchScene(scene) {
    if (!scene) return;

    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo();
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) return scenes[i];
    }
    return null;
  }

  // =========================
  // FIRST SCENE
  // =========================
  switchScene(scenes[0]);

  // =========================
  // LEAFLET MAP
  // =========================
  var leafletMap = L.map('map').setView([53.0, 14.0], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(leafletMap);

  var sceneById = {};

  scenes.forEach(function(scene) {
    sceneById[scene.data.id] = scene;
  });

  function showTourView() {
    if (mapView) mapView.style.display = 'none';
    if (tourView) tourView.style.display = 'block';
    viewer.updateSize();
  }

  function showMapView() {
    if (mapView) mapView.style.display = 'block';
    if (tourView) tourView.style.display = 'none';
    leafletMap.invalidateSize();
  }

  if (backToMapButton) {
    backToMapButton.addEventListener('click', showMapView);
  }

  window.addPlotMarker = function(lat, lon, sceneId, label) {

    var marker = L.marker([lat, lon]).addTo(leafletMap);

    marker.on('click', function() {

      var scene = sceneById[sceneId];

      if (!scene) return;

      showTourView();
      switchScene(scene);
    });

    if (label) {
      marker.bindTooltip(label, {
        permanent: true,
        direction: 'top'
      });
    }
  };

  // =========================
  // ALL 32 MARKERS (RESTORED)
  // =========================
  addPlotMarker(52.989636, 14.129339, "0-1main", "1");
  addPlotMarker(53.020282, 14.136444, "1-2main", "2");
  addPlotMarker(53.019952, 14.106040, "2-3main", "3");
  addPlotMarker(52.988698, 14.127318, "3-4main", "4");
  addPlotMarker(53.018582, 14.134691, "4-5main", "5");
  addPlotMarker(52.997346, 14.115483, "5-6main", "6");
  addPlotMarker(53.015736, 14.121196, "6-7main", "7");
  addPlotMarker(53.011363, 14.133022, "7-8main", "8");
  addPlotMarker(52.997225, 14.146734, "8-9main", "9");
  addPlotMarker(53.018645, 14.139248, "9-10main", "10");
  addPlotMarker(53.010735, 14.126274, "10-11main", "11");
  addPlotMarker(53.000277, 14.109501, "11-12main", "12");
  addPlotMarker(53.001041, 14.108857, "12-13main", "13");
  addPlotMarker(52.999426, 14.106514, "13-14main", "14");
  addPlotMarker(53.018728, 14.104562, "14-15main", "15");
  addPlotMarker(53.012367, 14.122239, "15-16main", "16");
  addPlotMarker(52.999722, 14.125335, "16-17main", "17");
  addPlotMarker(53.001852, 14.131122, "17-18main", "18");
  addPlotMarker(53.000383, 14.142111, "18-19main", "19");
  addPlotMarker(53.011237, 14.119631, "19-20main", "20");
  addPlotMarker(53.001046, 14.119161, "20-21main", "21");
  addPlotMarker(53.019747, 14.130744, "21-22main", "22");
  addPlotMarker(53.019754, 14.140222, "22-23main", "23");
  addPlotMarker(53.018268, 14.104579, "23-24main", "24");
  addPlotMarker(53.017285, 14.131387, "24-25main", "25");
  addPlotMarker(52.999544, 14.112875, "25-26main", "26");
  addPlotMarker(53.011279, 14.121718, "26-27main", "27");
  addPlotMarker(53.005039, 14.126723, "27-28main", "28");
  addPlotMarker(53.001507, 14.133491, "28-29main", "29");
  addPlotMarker(52.990532, 14.128711, "29-30main", "30");
  addPlotMarker(53.017075, 14.115501, "30-31main", "31");
  addPlotMarker(53.006340, 14.114901, "31-32main", "32");

  // START IN MAP MODE
  showMapView();

})();
