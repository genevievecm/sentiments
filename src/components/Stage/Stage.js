import React, { Component } from 'react';
import * as Three from 'three';
import TWEEN from 'tween.js';

export default class Stage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 50,
        }

        this.addToScene = this.addToScene.bind(this);
        this.startAnimate = this.startAnimate.bind(this);
        this.updateOrb = this.updateOrb.bind(this);
    }

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        console.log(TWEEN);

        // Set scene and camera
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(
            100,
            width / height,
            0.1,
            5000,
        );
		this.camera.position.z = 500;

        // renderer instance
        this.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height); // height and width of scene

        // lighting
        const ambient = new Three.AmbientLight(0xfca4c5, 0.5);
        const directional = new Three.DirectionalLight(0xE9F1F7, 1);
        this.scene.add(
            ambient,
            directional
        );

        // add first shape to scene a.k.a. the initial orb
        const orb = this.addToScene({
            geometry: new Three.TetrahedronGeometry(this.state.size, 1),
            material: new Three.MeshPhongMaterial({
                flatShading:Three.FlatShading,
                color: 0xBCBCBC,
                morphTargets: true
            })
        });

        // mount orb to canvas and animate!
        this.mount.appendChild(this.renderer.domElement);
        this.orb = orb;
        this.startAnimate();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.totalScore !== nextProps.totalScore) {
            // We need to pass the new props to the update function yasss
            let colour = 0xE2B3BE;

            // Just testing what it looks like to change the colour intentionally..
            // And add in elements at certain "totalSize" breakpoints

            if (nextProps.totalScore > 5 && nextProps.totalScore < 10){
                this.addCube(colour, nextProps.size);
            }
            if (nextProps.totalScore > 10 && nextProps.totalScore < 30){
                colour = 0xE0A9D4;
                this.addShapes(colour);
            }
            if (nextProps.totalScore > 30 && nextProps.totalScore < 40){
                colour = 0xB49AE5;
                this.addShapes(colour);
            }

            this.updateOrb(nextProps.size, colour, nextProps.totalScore);
            return true;

        } else {
            // Don't re-render the component if there aren't any new props coming in!
            return false;
        }
    }

    addShapes(colour){
        let shapes = new Three.Group();

        // Randomize vertices n stuff
        const geometry = new Three.TetrahedronGeometry(
            Math.floor(Math.random()*(5-1+1)+1),
            Math.floor(Math.random()*(2-1+1)+1)
        );

        // Add like 50 shapes around the orb
        for (let i = 0; i < 50; i ++) {
            const material = new Three.MeshPhongMaterial({
              color: colour,
              flatShading: Three.FlatShading
            });
            let shape = new Three.Mesh(geometry, material);
            // Hover around the orb!
            shape.position.set((Math.random() - 0.5) * 80,
                              (Math.random() - 0.5) * 80,
                              (Math.random() - 0.5) * 80);
            shapes.add(shape);
        }
        this.orb.add(shapes);
    }

    addCube(colour, size){
        const cube = this.addToScene({
            geometry: new Three.BoxGeometry( 10, 10, 10 ),
            material: new Three.MeshPhongMaterial({
                flatShading: Three.FlatShading,
                color: colour,
                morphTargets: true
            })
        });
        cube.position.set((Math.random() - 0.5) * 80,
                              (Math.random() - 0.5) * 80,
                              (Math.random() - 0.5) * 80);
        this.orb.add(cube);
    }

    addToScene({ geometry, material }) {
        const mesh = new Three.Mesh(geometry, material);
        this.scene.add(mesh);
        return mesh;
    }

    updateOrb(size, colour, totalScore){
        console.log(this.orb);
        // Cap the size of the orb at this size ish
        if (size >= 5.5) {
            size = 5.6;
        }
        // animate orb growth over 500 milliseconds
        const scale = new TWEEN.Tween( this.orb.scale )
                        .to({x: size, y: size, z: size}, 500)
                        .start();

        const shade = new TWEEN.Tween( this.orb.material.color, 2, {
                            r: this.orb.material.color.r,
                            g: this.orb.material.color.g,
                            b: this.orb.material.color.b
                        });

        this.orb.material.color.setHex( colour );
    }

    startAnimate() {
        requestAnimationFrame(this.startAnimate);

        // rotation rate for orb
        this.orb.rotation.x += 0.004;
        this.orb.rotation.x += 0.004;

        TWEEN.update();

        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
        <div
            style={{ width: '100%', height: '400px' }}
            ref={(mount) => { this.mount = mount }}
         />
        );
    }
}
