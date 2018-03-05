import React, { Component } from 'react';
import * as Three from 'three';

export default class Stage extends Component {
    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.initialOrb = this.initialOrb.bind(this);
        this.addCube = this.addCube.bind(this);
        this.animateCube = this.animateCube.bind(this);
    }

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        // Global scene settings
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(
          35,
          width / height,
          0.1,
          1000
        );

        this.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setClearColor( 0xffffff, 0 );
        // height and width of scene
        this.renderer.setSize(width, height);
        const ambient = new Three.AmbientLight(0xfca4c5, 0.5);
        const directional = new Three.DirectionalLight(0xE9F1F7, 1);
        this.scene.add(ambient, directional);

        // Add first orb
        this.initialOrb();

        this.mount.appendChild(this.renderer.domElement);
        this.start();
    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.size !== nextProps.size || this.props.totalScore !== nextProps.totalScore) {
          // We need to pass the new props to the update function yasss
          this.updateOrb(nextProps.size, nextProps.totalScore);
          console.log("New prop!");
          return true
        } else {
            console.log("No changes, don't update");
            // Don't re-render the component if there aren't any new props coming in!
            return false;
        }
    }

    initialOrb(){
        this.geometry = new Three.TetrahedronGeometry(35, 2); // second param determins number of vertices
        console.log(this.geometry);
        this.material = new Three.MeshPhongMaterial({
          flatShading:Three.FlatShading,
          color: 0xbeb5f0,
          morphTargets: true
        });

        this.orb1 = new Three.Mesh(this.geometry, this.material);

        // position or orb in scene
        this.orb1.position.set(0, 0, -1000);

        this.scene.add(this.orb1);
    }

    updateOrb(size, totalScore){
        // Set a new size
        this.orb1.scale.set(size, size, size);

        if (this.cube){
            this.cube.scale.set(size/1.2, size/1.2, size/1.2);
        } else {
            this.addCube();
        }

        if (totalScore > 5){
            // Set a nice colour!
            var colour = Math.random() * 0xffffff;
            this.material.color.setHex( colour );
            this.cubeMaterial.color.setHex( colour );
        }
        // Changes shape of tetrahedron
        this.geometry.verticesNeedUpdate = true;
    }

    addCube(){
        console.log('adding a cube!');
        var geometry = new Three.BoxBufferGeometry( 60, 60, 60 );
        this.cubeMaterial = new Three.MeshPhongMaterial({
          flatShading:Three.FlatShading,
          color: 0xbeb5f0,
          morphTargets: true
        });
        this.cube = new Three.Mesh( geometry, this.cubeMaterial );
        this.cube.position.set(0, 0, -1000);

        this.scene.add(this.cube);
        this.animateCube();
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
        this.orb1.rotation.x += 0.005;
        this.orb1.rotation.y += 0.005;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    animateCube(){
        this.cube.rotation.x += 0.009;
        this.cube.rotation.y += 0.003;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animateCube);
    }

    renderScene() {
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
