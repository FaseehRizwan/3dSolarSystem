window.onload = function() {
            // --- Three.js Setup ---
            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x000000, 0.002);

            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 20, 50);

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            document.body.appendChild(renderer.domElement);

            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 5;
            controls.maxDistance = 200;
            controls.autoRotate = false; 

            const globalSpeed = 0.2;

            // --- Three.js Content ---
            // 1. Sun
            const sun = new THREE.Mesh(new THREE.SphereGeometry(5, 64, 64), new THREE.MeshBasicMaterial({ color: 0xffdd00 }));
            scene.add(sun);
            scene.add(new THREE.PointLight(0xffffff, 1.5, 300));
            scene.add(new THREE.AmbientLight(0x404040));

            // 2. Stars
            const starGeo = new THREE.BufferGeometry();
            const starCount = 8000;
            const pos = [], cols = [];
            for(let i=0; i<starCount; i++) {
                pos.push((Math.random()-0.5)*800, (Math.random()-0.5)*800, (Math.random()-0.5)*800);
                const c = Math.random();
                if(c>0.9) cols.push(1,0.8,0.8); else if(c>0.7) cols.push(0.8,0.9,1); else cols.push(1,1,1);
            }
            starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
            starGeo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
            const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.6, vertexColors: true, transparent: true, opacity: 0.8 }));
            scene.add(stars);

            // Helper for Text Labels
            function createTextLabel(text) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 256; canvas.height = 64;
                ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.fillRect(0,0, 256, 64);
                ctx.font = 'bold 32px Arial'; ctx.shadowColor = "rgba(0,0,0,0.8)"; ctx.shadowBlur = 4;
                ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.fillText(text, 128, 45);
                const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, opacity: 0.9 }));
                sprite.scale.set(6, 1.5, 1);
                return sprite;
            }

            // 3. Planets
            const planets = [];
            const planetData = [
                { name: 'Mercury', dist: 10, size: 0.8, color: 0xaaaaaa, speed: 0.04 },
                { name: 'Venus', dist: 15, size: 1.2, color: 0xe3bb76, speed: 0.025 },
                { name: 'Earth', dist: 22, size: 1.5, color: 0x1144cc, speed: 0.02 },
                { name: 'Mars', dist: 30, size: 1.0, color: 0xff4500, speed: 0.015 },
                { name: 'Jupiter', dist: 45, size: 3.5, color: 0xd8ca9d, speed: 0.008 },
                { name: 'Saturn', dist: 65, size: 3.0, color: 0xc5a16f, speed: 0.006, ring: { inner: 4, outer: 6, color: 0xc5a16f } },
                { name: 'Uranus', dist: 85, size: 2.0, color: 0x4fd0e7, speed: 0.004 },
                { name: 'Neptune', dist: 105, size: 1.9, color: 0x2b32a0, speed: 0.003 }
            ];

            planetData.forEach(data => {
                const orbit = new THREE.Mesh(new THREE.RingGeometry(data.dist - 0.1, data.dist + 0.1, 128), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.08 }));
                orbit.rotation.x = Math.PI / 2;
                scene.add(orbit);

                const systemGroup = new THREE.Group();
                scene.add(systemGroup);

                const planet = new THREE.Mesh(new THREE.SphereGeometry(data.size, 32, 32), new THREE.MeshPhongMaterial({ color: data.color, shininess: 10 }));
                systemGroup.add(planet);

                if (data.ring) {
                    const ring = new THREE.Mesh(new THREE.RingGeometry(data.ring.inner, data.ring.outer, 64), new THREE.MeshBasicMaterial({ color: data.ring.color, side: THREE.DoubleSide, transparent: true, opacity: 0.6 }));
                    ring.rotation.x = Math.PI / 2.5;
                    planet.add(ring);
                }

                let clouds=null, moon=null, moonAngle=0, label=null, satellites=[];
                
                if (data.name === 'Earth') {
                    // Atmosphere
                    planet.add(new THREE.Mesh(new THREE.SphereGeometry(data.size + 0.3, 32, 32), new THREE.MeshPhongMaterial({ color: 0x44aaff, transparent: true, opacity: 0.25, side: THREE.FrontSide, blending: THREE.AdditiveBlending })));
                    // Clouds
                    clouds = new THREE.Mesh(new THREE.SphereGeometry(data.size + 0.08, 64, 64), new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
                    planet.add(clouds);
                    // Highlight
                    const highlight = new THREE.Mesh(new THREE.RingGeometry(data.size * 1.5, data.size * 1.6, 64), new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 }));
                    highlight.rotation.x = Math.PI / 2;
                    systemGroup.add(highlight);
                    // Label
                    label = createTextLabel("EARTH"); label.position.set(0, data.size + 2, 0); systemGroup.add(label);
                    // Moon
                    moon = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.9 }));
                    systemGroup.add(moon);
                    // Satellites
                    const satGeo = new THREE.TetrahedronGeometry(0.1);
                    const satMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                    for(let k=0; k<5; k++) {
                        const sat = new THREE.Mesh(satGeo, satMat);
                        systemGroup.add(sat);
                        satellites.push({ mesh: sat, dist: data.size+0.8+Math.random()*0.5, speed: (0.05+Math.random()*0.05)*globalSpeed*5, angle: Math.random()*6, tilt: (Math.random()-0.5)*2 });
                    }
                }

                planets.push({ mesh: planet, system: systemGroup, speed: data.speed * globalSpeed, distance: data.dist, angle: Math.random()*6, clouds, moon, moonAngle: 0, satellites, label });
            });

            // 4. UFOs
            const ufos = [];
            for(let i=0; i<6; i++) {
                const group = new THREE.Group();
                group.add(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.6, 0.15, 16), new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9 }))); // Saucer
                const dome = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16, 0, 6.28, 0, 1.57), new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.5, transparent: true, opacity: 0.9 }));
                dome.position.y = 0.05; group.add(dome);
                const light = new THREE.PointLight(0x00ff00, 0.5, 3); light.position.y = 0.5; group.add(light);
                scene.add(group);
                ufos.push({ mesh: group, angle: Math.random()*6, radius: 35+Math.random()*40, speed: (0.005+Math.random()*0.005)*globalSpeed*4, yOffset: Math.random()*100, bobSpeed: 0.5+Math.random()*0.5 });
            }

            // --- MediaPipe Hand Tracking Setup ---
            const videoElement = document.getElementsByClassName('input_video')[0];
            const canvasElement = document.getElementsByClassName('output_canvas')[0];
            const canvasCtx = canvasElement.getContext('2d');
            const loadingText = document.querySelector('.loading-text');

            let handState = {
                x: 0, 
                y: 0,
                pinched: false,
                pinchDistance: 0
            };

            function onResults(results) {
                loadingText.style.display = 'none'; 
                canvasCtx.save();
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

                if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                    const landmarks = results.multiHandLandmarks[0];
                    drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 2});
                    drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1, radius: 2});

                    const palmX = landmarks[9].x;
                    const palmY = landmarks[9].y;
                    
                    handState.x = (palmX - 0.5) * 2; 
                    handState.y = (palmY - 0.5) * 2;

                    const thumbTip = landmarks[4];
                    const indexTip = landmarks[8];
                    
                    const distance = Math.sqrt(Math.pow(thumbTip.x - indexTip.x, 2) + Math.pow(thumbTip.y - indexTip.y, 2));
                    handState.pinchDistance = distance;
                    handState.pinched = distance < 0.05;

                    if (handState.pinched) {
                        canvasCtx.beginPath();
                        canvasCtx.arc(thumbTip.x * canvasElement.width, thumbTip.y * canvasElement.height, 20, 0, 2 * Math.PI);
                        canvasCtx.strokeStyle = "yellow";
                        canvasCtx.lineWidth = 3;
                        canvasCtx.stroke();
                    }

                } else {
                    handState.x = 0;
                    handState.y = 0;
                }
                canvasCtx.restore();
            }

            const hands = new Hands({locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }});
            hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            hands.onResults(onResults);

            const cameraUtils = new Camera(videoElement, {
                onFrame: async () => {
                    await hands.send({image: videoElement});
                },
                width: 320,
                height: 240
            });
            cameraUtils.start();

            // --- Custom Manual Camera Control Helpers ---
            // These functions manipulate the camera directly to simulate OrbitControls rotation
            // This prevents "controls.rotateLeft is not a function" errors.
            function rotateCamera(dx, dy) {
                const offset = new THREE.Vector3().copy(camera.position).sub(controls.target);
                
                // Spherical conversion
                const radius = offset.length();
                let theta = Math.atan2(offset.x, offset.z);
                let phi = Math.acos(THREE.MathUtils.clamp(offset.y / radius, -1, 1));

                // Apply deltas
                theta += dx;
                phi += dy;

                // Clamp Phi to avoid flipping
                phi = THREE.MathUtils.clamp(phi, 0.0001, Math.PI - 0.0001);

                // Convert back
                offset.x = radius * Math.sin(phi) * Math.sin(theta);
                offset.y = radius * Math.cos(phi);
                offset.z = radius * Math.sin(phi) * Math.cos(theta);

                camera.position.copy(controls.target).add(offset);
                camera.lookAt(controls.target);
            }

            function zoomCamera(amount) {
                // amount > 1 zooms out, < 1 zooms in
                const offset = new THREE.Vector3().copy(camera.position).sub(controls.target);
                const currentDist = offset.length();
                const newDist = currentDist * amount;
                
                // Limit zoom based on control limits
                if (newDist < controls.minDistance || newDist > controls.maxDistance) return;

                offset.setLength(newDist);
                camera.position.copy(controls.target).add(offset);
            }

            // --- Animation Loop ---
            function animate() {
                requestAnimationFrame(animate);

                const time = Date.now() * 0.001;

                // 1. Apply Hand Controls
                const sensitivity = 0.05;
                
                // Rotate Left/Right (Azimuth)
                if (Math.abs(handState.x) > 0.2) {
                    // Negative for natural drag feeling
                    rotateCamera(handState.x * sensitivity * -1, 0);
                }
                
                // Rotate Up/Down (Polar)
                if (Math.abs(handState.y) > 0.2) {
                    rotateCamera(0, handState.y * sensitivity * -1);
                }

                // Zoom Logic
                if (handState.pinchDistance > 0) {
                    if (handState.pinchDistance < 0.04) {
                        zoomCamera(0.98); // Close pinch = Zoom In
                    } else if (handState.pinchDistance > 0.15) {
                        zoomCamera(1.02); // Wide open = Zoom Out
                    }
                }

                // 2. Standard Animations
                sun.rotation.y += 0.0005;
                stars.rotation.y -= 0.00005;

                planets.forEach(p => {
                    p.angle += p.speed;
                    p.system.position.x = Math.cos(p.angle) * p.distance;
                    p.system.position.z = Math.sin(p.angle) * p.distance;
                    p.mesh.rotation.y += 0.005;

                    if (p.clouds) { p.clouds.rotation.y += 0.007; p.clouds.rotation.z = Math.sin(time*0.1)*0.05; }
                    if (p.moon) {
                        p.moonAngle += 0.02;
                        p.moon.position.set(Math.cos(p.moonAngle)*3, 0, Math.sin(p.moonAngle)*3);
                        p.moon.rotation.y += 0.01;
                    }
                    if (p.satellites.length) {
                        p.satellites.forEach(sat => {
                            sat.angle += sat.speed;
                            sat.mesh.position.set(Math.cos(sat.angle)*sat.dist, 0, Math.sin(sat.angle)*sat.dist);
                            // Apply Tilt
                            const x = sat.mesh.position.x;
                            sat.mesh.position.y = x * Math.sin(sat.tilt);
                            sat.mesh.position.x = x * Math.cos(sat.tilt);
                            sat.mesh.lookAt(p.mesh.position);
                        });
                    }
                });

                ufos.forEach(u => {
                    u.angle += u.speed;
                    u.mesh.position.set(Math.cos(u.angle)*u.radius, Math.sin(time*u.bobSpeed + u.yOffset)*3, Math.sin(u.angle)*u.radius);
                    u.mesh.rotation.y += 0.05; u.mesh.rotation.z = -0.2;
                    u.mesh.lookAt(0, u.mesh.position.y, 0); u.mesh.rotateY(Math.PI/2);
                });

                controls.update(); 
                renderer.render(scene, camera);
            }

            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        };
