var APP_DATA = {
  "scenes": [
    {
      "id": "0-1main",
      "name": "1main",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 },
        { "tileSize": 512, "size": 4096 }
      ],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -1.2767719687178314, "pitch": 0.3358033765763029, "fov": 1.38217411905719 },
      "linkHotspots": [
        { "yaw": -0.5610080151233436, "pitch": 0.04828451069140982, "rotation": 0, "target": "0-1buffer1" },
        { "yaw": -2.1882489028186995, "pitch": 0.10146366226230263, "rotation": 0, "target": "3-1buffer4" },
        { "yaw": 2.5901812828376416, "pitch": 0.11272111195255974, "rotation": 0, "target": "2-1buffer3" },
        { "yaw": 0.8263964175033909, "pitch": 0.13463585627235908, "rotation": 0, "target": "1-1buffer2" }
      ],
      "infoHotspots": [
        { "yaw": -1.0864382223976037, "pitch": 0.3877784949533325, "title": "Plot 01", "text": "<button onclick=\"openImage('images/hnee.jpg')\">View Image</button>" }
      ]
    },
    {
      "id": "0-1buffer1",
      "name": "1buffer1",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -0.3028238799776837, "pitch": -0.07010707875340572, "fov": 1.38217411905719 },
      "linkHotspots": [{ "yaw": -0.35271923898125834, "pitch": 0.2748874474243621, "rotation": 3.141592653589793, "target": "0-1main" }],
      "infoHotspots": []
    },
    {
      "id": "1-1buffer2",
      "name": "1buffer2",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -2.5941034191628223, "pitch": -0.053669363271430015, "fov": 1.38217411905719 },
      "linkHotspots": [{ "yaw": -2.635896872877243, "pitch": 0.13705146810767488, "rotation": 3.141592653589793, "target": "0-1main" }],
      "infoHotspots": []
    },
    {
      "id": "2-1buffer3",
      "name": "1buffer3",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -2.7082761183255712, "pitch": -0.0889006727297641, "fov": 1.38217411905719 },
      "linkHotspots": [{ "yaw": -2.7927250843232, "pitch": 0.20570728147162498, "rotation": 3.141592653589793, "target": "0-1main" }],
      "infoHotspots": []
    },
    {
      "id": "3-1buffer4",
      "name": "1buffer4",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -0.5552836049112209, "pitch": -0.012985984373372617, "fov": 1.38217411905719 },
      "linkHotspots": [{ "yaw": -0.6537222513718177, "pitch": 0.15803350138321726, "rotation": 3.141592653589793, "target": "0-1main" }],
      "infoHotspots": []
    },
    {
      "id": "1-2main",
      "name": "2main",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -0.39043169444333614, "pitch": 0.612212862418394, "fov": 1.38217411905719 },
      "linkHotspots": [
        { "yaw": -0.2749526072015165, "pitch": 1.1584333175493882, "rotation": 3.141592653589793, "target": "5-2main_top" },
        { "yaw": 1.283001507744821, "pitch": 0.02638083936146529, "rotation": 0, "target": "3-2buffer4" },
        { "yaw": -0.2584180616955081, "pitch": 0.10958862346345022, "rotation": 0, "target": "2-2buffer3" },
        { "yaw": 2.8425358011887143, "pitch": 0.04390712066450675, "rotation": 0, "target": "1-2buffer2" },
        { "yaw": -1.8732258825172323, "pitch": 0.07408945460196215, "rotation": 0, "target": "0-2buffer1" },
        { "yaw": -2.766240777799652, "pitch": 0.09248548073252039, "rotation": 3.141592653589793, "target": "6-2route1" }
      ],
      "infoHotspots": [{ "yaw": -0.06309853128794174, "pitch": 0.5199183660261308, "title": "Plot 02", "text": "Plot 02-" }]
    },
    {
      "id": "0-2buffer1",
      "name": "2buffer1",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -0.6497962757320881, "pitch": -0.029684276382438313, "fov": 1.38217411905719 },
      "linkHotspots": [{ "yaw": -0.6740203492089645, "pitch": 0.25332808661178774, "rotation": 3.141592653589793, "target": "1-2main" }],
      "infoHotspots": []
    },
    {
      "id": "1-2buffer2",
      "name": "2buffer2",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": 0.7800236098281808, "pitch": 0.07792122550389458, "fov": 1.38217411905719 },
      "linkHotspots": [{ "yaw": 0.6909621317270087, "pitch": 0.41191725473987795, "rotation": 3.141592653589793, "target": "1-2main" }],
      "infoHotspots": []
    },
    {
      "id": "2-2buffer3",
      "name": "2buffer3",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -2.636272036494221, "pitch": -0.10193117582813827, "fov": 1.38217411905719 },
      "linkHotspots": [{ "yaw": -2.73084477530897, "pitch": 0.23054253373718403, "rotation": 3.141592653589793, "target": "1-2main" }],
      "infoHotspots": []
    },
    {
      "id": "3-2buffer4",
      "name": "2buffer4",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -2.3514165741688533, "pitch": -0.06191558161657795, "fov": 1.38217411905719 },
      "linkHotspots": [{ "yaw": -2.4360917773994597, "pitch": 0.28244070914603014, "rotation": 3.141592653589793, "target": "1-2main" }],
      "infoHotspots": []
    },
    {
      "id": "5-2main_top",
      "name": "2main_top",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": 0.030873588210788228, "pitch": 0.5602686869283495, "fov": 1.38217411905719 },
      "linkHotspots": [{ "yaw": -0.19231760050680613, "pitch": 1.0249596477690197, "rotation": 3.141592653589793, "target": "1-2main" }],
      "infoHotspots": []
    },
    {
      "id": "6-2route1",
      "name": "2route1",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -0.9733932174028954, "pitch": -0.016843485972463768, "fov": 1.38217411905719 },
      "linkHotspots": [
        { "yaw": 2.031933832932066, "pitch": 0.1945618621452283, "rotation": 3.141592653589793, "target": "1-2main" },
        { "yaw": -0.9822515166388666, "pitch": 0.1546540530971079, "rotation": 0, "target": "7-2route2" }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-2route2",
      "name": "2route2",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -2.615661692241112, "pitch": -0.09082714817603232, "fov": 1.38217411905719 },
      "linkHotspots": [
        { "yaw": 0.3572406932742638, "pitch": 0.036371250191125526, "rotation": 3.141592653589793, "target": "6-2route1" },
        { "yaw": -2.62003545330834, "pitch": 0.12132625849279854, "rotation": 0, "target": "8-2route3" }
      ],
      "infoHotspots": []
    },
    {
      "id": "8-2route3",
      "name": "2route3",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": -1.5817336488622988, "pitch": -0.07860647542311128, "fov": 1.38217411905719 },
      "linkHotspots": [
        { "yaw": 1.324671465688052, "pitch": 0.04676046106220966, "rotation": 3.141592653589793, "target": "7-2route2" },
        { "yaw": -1.6015254174014046, "pitch": 0.08208165640092346, "rotation": 0, "target": "9-2route4" }
      ],
      "infoHotspots": []
    },
    {
      "id": "9-2route4",
      "name": "2route4",
      "levels": [{ "tileSize": 256, "size": 256, "fallbackOnly": true }, { "tileSize": 512, "size": 512 }, { "tileSize": 512, "size": 1024 }, { "tileSize": 512, "size": 2048 }, { "tileSize": 512, "size": 4096 }],
      "faceSize": 2976,
      "initialViewParameters": { "yaw": 0.8122493826589139, "pitch": -0.1836714601163152, "fov": 1.38217411905719 },
      "linkHotspots": [
        { "yaw": 0.
