import React, { Component } from 'react';
import * as Three from 'three';
import TWEEN from 'tween.js';

const randomColours = [0x51BFF2, 0xF2BF51, 0xe1f7d5, 0xffbdbd, 0xf1cbff]
const level1 = [0xE0A9D4, 0x91CCDF, 0xFBE7BA];
const level2 = [0xEA41C5, 0x04FFE9, 0xE9FF17];

export default class Stage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 50,
        }

        this.addToScene = this.addToScene.bind(this);
        this.startAnimate = this.startAnimate.bind(this);
        this.updateOrb = this.updateOrb.bind(this);
        this.resize = this.resize.bind(this);
    }

    componentDidMount() {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;

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

        //resize
        window.addEventListener('resize', this.resize, false);

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

    updateOrbByRange(size, totalScore){
        // We need to pass the new props to the update function yasss
        let colour = 0xE2B3BE;

        // Just testing what it looks like to change the colour intentionally..
        // And add in elements at certain "totalSize" breakpoints

        if (totalScore > 5 && totalScore < 10){
            this.addCube(colour, size);
        }
        if (totalScore > 10 && totalScore < 30){
            colour = randomColour(level1);
            this.addShapes(colour);
        }
        if (totalScore > 30){
            colour = randomColour(level2);
            this.addShapes(colour);
        }
        this.updateOrb(size, colour, totalScore);
    }

    updateOrbByScore(size, totalScore){
        let colour;
        switch(totalScore) {
            case 12:
                colour = randomColour(randomColours);
                this.addCube(colour, size);
                break;
            case 18:
                 colour = randomColour(randomColours);
                this.addCube(colour, size);
                break;
            case 28:
                colour = randomColour(randomColours);
                this.addCube(colour, size);
                break;
            case 34:
                colour = randomColour(randomColours);
                this.addCube(colour, size);
                break;
            default :
                colour = 0xE2B3BE;
                this.addCube(colour, size);
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.totalScore !== nextProps.totalScore) {
            this.updateOrbByRange(nextProps.size, nextProps.totalScore);
            this.updateOrbByScore(nextProps.size, nextProps.totalScore);
            return true;
        } else {
            // Don't re-render the component if there aren't any new props coming in!
            return false;
        }
    }

    resize(){
        const newSize = {
            width: window.innerWidth,
            height: window.innerHeight / 2
        }

        //reset renderer size
        this.renderer.setSize(newSize.width , newSize.height);

        this.camera.aspect = newSize.width / newSize.height;
        this.camera.updateProjectionMatrix();

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
        cube.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80
        );
        this.orb.add(cube);
    }

    addToScene({ geometry, material }) {
        const mesh = new Three.Mesh(geometry, material);
        this.scene.add(mesh);
        return mesh;
    }

    updateOrb(size, colour, totalScore){
        // Cap the size of the orb at this size ish
        if (size >= 5.5) {
            size = 5.6;
        }
        // animate orb growth over 500 milliseconds
        const scale = new TWEEN.Tween( this.orb.scale )
                        .to({x: size, y: size, z: size}, 500)
                        .start();

        this.orb.material.color.setHex( colour );

        return scale;
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

function randomColour(array){
    return array[Math.floor(Math.random() * array.length)];
}
