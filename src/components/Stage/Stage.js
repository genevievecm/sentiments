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
                color: 0xbeb5f0,
                morphTargets: true,
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
            const colour = Math.random() * 0xffffff;
            const cube = this.addToScene({
                geometry: new Three.BoxGeometry( 50, 50, 50 ),
                material: new Three.MeshPhongMaterial({
                    flatShading: Three.FlatShading,
                    color: colour,
                    morphTargets: true
                })
            });
            // cube.position.x = 30;
            this.orb.add(cube);
            console.log(this.orb.children);

            this.updateOrb(nextProps.size, colour, nextProps.totalScore);

            return true;
        } else {
            // Don't re-render the component if there aren't any new props coming in!
            return false;
        }
    }

    addToScene({ geometry, material }) {
        const mesh = new Three.Mesh(geometry, material);
        this.scene.add(mesh);
        return mesh;
    }

    updateOrb(size, colour, totalScore){
        // animate orb growth over 500 milliseconds
        const scale = new TWEEN.Tween( this.orb.scale )
                        .to({x: size, y: size, z: size}, 500)
                        .start();

        const shade = new TWEEN.Tween( this.orb.material.color, 2, {
                            r: this.orb.material.color.r,
                            g: this.orb.material.color.g,
                            b: this.orb.material.color.b
                        });

        console.log(this.orb.material)


        if (totalScore > 5){
            // Set a nice colour!
            // this.orb.material.color.setHex( colour );
        }

        return ( scale, shade );
    }

    startAnimate() {
        requestAnimationFrame(this.startAnimate);

        // rotation rate for orb
        this.orb.rotation.x += 0.005;
        this.orb.rotation.x += 0.005;

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
