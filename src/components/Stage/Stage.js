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
        const renderer = new Three.WebGLRenderer({ antialias: true });
        let geometry = new Three.TetrahedronGeometry(25, 2); // second param determins number of vertices
        const material = new Three.MeshPhongMaterial({
          shading:Three.FlatShading
        });
        const orb = new Three.Mesh(geometry, material);

        // lighting on orb
        const ambient = new Three.AmbientLight(0xffffff, 0.25);
        const directional = new Three.DirectionalLight(0xE9F1F7, 1);
        scene.add(ambient, directional);

        // position or orb in scene
        orb.position.set(0, 0, -1000);

        // set background
        renderer.setClearColor('#111111');

        // height and width of scene
        renderer.setSize(width, height);

        // add orb to scene
        scene.add(orb);

        this.scene = scene;
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

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.size !== nextProps.size) {
          this.updateSize();
        }
        return true;
    }

    updateSize(){
        console.log(this.props.size);
        this.orb.scale.set(this.props.size,this.props.size,this.props.size)
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
        return (
        <div
            style={{ width: '100%', height: '400px' }}
            ref={(mount) => { this.mount = mount }}
         />
        );
    }
}
