import React, { Component } from 'react';
import * as Three from 'three';

export default class Stage extends Component {
    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
    }

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        const scene = new Three.Scene();
        const camera = new Three.PerspectiveCamera(
          35,
          width / height,
          0.1,
          1000
        );
        let renderer = new Three.WebGLRenderer({ antialias: true, alpha: true });
        let geometry = new Three.TetrahedronGeometry(35, 2); // second param determins number of vertices
        const material = new Three.MeshPhongMaterial({
          flatShading:Three.FlatShading,
          color: 0xbeb5f0,
          morphTargets: true
        });
        const orb = new Three.Mesh(geometry, material);

        // lighting on orb
        const ambient = new Three.AmbientLight(0xfca4c5, 0.5);
        const directional = new Three.DirectionalLight(0xE9F1F7, 1);
        scene.add(ambient, directional);

        // position or orb in scene
        orb.position.set(0, 0, -1000);

        // Set clear bg
        renderer.setClearColor( 0xffffff, 0 );

        // height and width of scene
        renderer.setSize(width, height);

        // add orb to scene
        scene.add(orb);

        this.scene = scene;
        this.geometry = geometry;
        this.camera = camera;
        this.renderer = renderer;
        this.material = material;
        this.orb = orb;

        this.mount.appendChild(this.renderer.domElement);
        this.start();
    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (this.props.size !== nextProps.size) {
          // We need to pass the new props to the update function yasss
          this.updateOrb(nextProps.size, nextProps.totalScore);
          return true
        } else {
            return false;
        }
    }

    updateOrb(size, totalScore){

        // Set a new size
        this.orb.scale.set(size, size, size);

        if (totalScore > 5){
            // Set a nice colour!
            this.material.color.setHex( Math.random() * 0xffffff );
        }
        // Changes shape of tetrahedron
        console.log(this.geometry);
        //this.geometry.vertices.push(new Three.Vector3( Math.random(),1,0));
        // this.geometry.vertices[0].set(Math.random(), 0.5, 0.5);
        // this.geometry.vertices[1].set(0.5, Math.random(), -0.5);
        // this.geometry.vertices[2].set(0.5, Math.random(), 0.5);
        // this.geometry.vertices[3].set(0.5, -0.5, Math.random());
        this.geometry.verticesNeedUpdate = true;
    }

    start() {
      if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate);
      }
    }

    stop() {
      cancelAnimationFrame(this.frameId);
    }

    animate() {
      this.orb.rotation.x += 0.005;
      this.orb.rotation.y += 0.005;

      this.renderScene();
      this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        console.log(this.props.size);
        return (
        <div
            style={{ width: '100%', height: '400px' }}
            ref={(mount) => { this.mount = mount }}
         />
        );
    }
}
