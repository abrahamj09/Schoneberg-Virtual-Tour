/*
 * Copyright 2016 Google Inc. All rights reserved.
 */
'use strict';

(function () {
  const Marzipano = window.Marzipano;
  const bowser = window.bowser;
  const screenfull = window.screenfull;
  const data = window.APP_DATA || {};

  if (!Marzipano || !data.scenes) {
    console.error("Marzipano or APP_DATA missing");
    return;
  }

  // ======================
  // DOM ELEMENTS
  // ======================
  const panoElement = document.querySelector('#pano');
  const sceneNameElement = document.querySelector('#titleBar .sceneName');
  const sceneListElement = document.querySelector('#sceneList');
  const sceneElements = document.querySelectorAll('#sceneList .scene');
  const sceneListToggleElement = document.querySelector('#sceneListToggle');
  const autorotateToggleElement = document.querySelector('#autorotateToggle');
  const fullscreenToggleElement = document.querySelector('#fullscreenToggle');

  // ======================
  // DEVICE MODE
  // ======================
  if (window.matchMedia) {
    const mql = window.matchMedia("(max-width: 500px), (max-height: 500px)");

    const setMode = () => {
      document.body.classList.toggle('mobile', mql.matches);
      document.body.classList.toggle('desktop', !mql.matches);
    };

    setMode();
    mql.addEventListener('change', setMode);
  } else {
    document.body.classList.add('desktop');
  }

  // Touch detection
  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', () => {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  }, { once: true });

  // IE fallback
  if (bowser?.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // ======================
  // VIEWER INIT
  // ======================
  const viewer = new Marzipano.Viewer(panoElement, {
    controls: {
      mouseViewMode: data.settings?.mouseViewMode || 'drag'
    }
  });

  // ======================
  // CREATE SCENES
  // ======================
  const scenes = data.scenes.map(sceneData => {
    const urlPrefix = "https://pub-9fafa387330246479f2cea55901c2121.r2.dev";

    const source = Marzipano.ImageUrlSource.fromString(
      `${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
      { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg` }
    );

    const geometry = new Marzipano.CubeGeometry(sceneData.levels);

    const limiter = Marzipano.RectilinearView.limit.traditional(
      sceneData.faceSize,
      Math.PI * 100 / 180,
      Math.PI * 120 / 180
    );

    const view = new Marzipano.RectilinearView(
      sceneData.initialViewParameters,
      limiter
    );

    const scene = viewer.createScene({
      source,
      geometry,
      view,
      pinFirstLevel: true
    });

    // ---- HOTSPOTS SAFE ----
    (sceneData.imageHotspots || []).forEach(h =>
      scene.hotspotContainer().createHotspot(createImageHotspotElement(h), h)
    );

    (sceneData.linkHotspots || []).forEach(h =>
      scene.hotspotContainer().createHotspot(createLinkHotspotElement(h), h)
    );

    (sceneData.infoHotspots || []).forEach(h =>
      scene.hotspotContainer().createHotspot(createInfoHotspotElement(h), h)
    );

    return { data: sceneData, scene, view };
  });

  // ======================
  // AUTOROTATE
  // ======================
  const autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2
  });

  function startAutorotate() {
    if (!autorotateToggleElement?.classList.contains('enabled')) return;
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  autorotateToggleElement?.addEventListener('click', () => {
    autorotateToggleElement.classList.toggle('enabled');
    autorotateToggleElement.classList.contains('enabled')
      ? startAutorotate()
      : stopAutorotate();
  });

  // ======================
  // FULLSCREEN
  // ======================
  if (screenfull?.enabled && data.settings?.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');

    fullscreenToggleElement?.addEventListener('click', () => {
      screenfull.toggle();
    });

    screenfull.on('change', () => {
      fullscreenToggleElement.classList.toggle('enabled', screenfull.isFullscreen);
    });
  }

  // ======================
  // SCENE SWITCHING
  // ======================
  function switchScene(sceneObj) {
    stopAutorotate();

    sceneObj.view.setParameters(sceneObj.data.initialViewParameters);
    sceneObj.scene.switchTo();

    updateSceneName(sceneObj);
    updateSceneList(sceneObj);

    startAutorotate();

    setTimeout(() => viewer.updateSize(), 50);
  }

  function updateSceneName(sceneObj) {
    if (sceneNameElement) {
      sceneNameElement.textContent = sceneObj.data.name;
    }
  }

  function updateSceneList(sceneObj) {
    sceneElements.forEach(el => {
      el.classList.toggle(
        'current',
        el.getAttribute('data-id') === sceneObj.data.id
      );
    });
  }

  // Scene click
  scenes.forEach(sceneObj => {
    const el = document.querySelector(
      `#sceneList .scene[data-id="${sceneObj.data.id}"]`
    );

    el?.addEventListener('click', () => {
      switchScene(sceneObj);
      if (document.body.classList.contains('mobile')) {
        sceneListElement?.classList.remove('enabled');
      }
    });
  });

  // ======================
  // HOTSPOTS
  // ======================
  function createImageHotspotElement(h) {
    const wrapper = document.createElement('div');
    wrapper.className = 'image-hotspot';

    const img = document.createElement('img');
    img.src = h.preview;
    wrapper.appendChild(img);

    wrapper.onclick = () => {
      const overlay = document.getElementById('image-overlay');
      const overlayImg = document.getElementById('overlay-img');

      if (overlay && overlayImg) {
        overlayImg.src = h.full;
        overlay.classList.add('active');
      }
    };

    return wrapper;
  }

  function createLinkHotspotElement(h) {
    const wrapper = document.createElement('div');
    wrapper.className = 'hotspot link-hotspot';

    const icon = document.createElement('img');
    icon.src = 'img/link.png';
    icon.style.transform = `rotate(${h.rotation}rad)`;

    wrapper.appendChild(icon);

    wrapper.onclick = () => {
      const target = scenes.find(s => s.data.id === h.target);
      if (target) switchScene(target);
    };

    return wrapper;
  }

  function createInfoHotspotElement(h) {
    const wrapper = document.createElement('div');
    wrapper.className = 'hotspot info-hotspot';
    wrapper.innerHTML = `
      <div class="info-hotspot-header">
        <div class="info-hotspot-title">${h.title}</div>
      </div>
      <div class="info-hotspot-text">${h.text}</div>
    `;
    return wrapper;
  }

  // ======================
  // MAP (LEAFLET)
  // ======================
  let leafletMap;
  const sceneById = Object.fromEntries(
    scenes.map(s => [s.data.id, s])
  );

  if (window.L) {
    leafletMap = L.map('map').setView([53.0, 14.0], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(leafletMap);

    function addPlotMarker(lat, lon, sceneId, label) {
      const marker = L.marker([lat, lon]).addTo(leafletMap);

      marker.on('click', () => {
        const target = sceneById[sceneId];
        if (target) {
          showTourView();
          switchScene(target);
        }
      });

      if (label) {
        marker.bindTooltip(label, { permanent: true });
      }
    }

    // Example markers
    addPlotMarker(52.989636, 14.129339, "0-1main", "1");
    addPlotMarker(53.020282, 14.136444, "1-2main", "2");
  }

  // ======================
  // VIEW SWITCH
  // ======================
  const mapView = document.getElementById('map-view');
  const tourView = document.getElementById('tour-view');
  const backBtn = document.getElementById('backToMapButton');

  function showMapView() {
    mapView && (mapView.style.display = 'block');
    tourView && (tourView.style.display = 'none');
    leafletMap && setTimeout(() => leafletMap.invalidateSize(), 50);
  }

  function showTourView() {
    mapView && (mapView.style.display = 'none');
    tourView && (tourView.style.display = 'block');
    setTimeout(() => viewer.updateSize(), 50);
  }

  backBtn?.addEventListener('click', showMapView);

  // ======================
  // INIT
  // ======================
  switchScene(scenes[0]);
  showMapView();

})();

// ======================
// IMAGE OVERLAY CLOSE
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("image-overlay");
  overlay?.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
});
