import React, { Component } from 'react';
import * as Three from 'three';
import Form from '../Form/Form';

export default class Stage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          score: {},
          size: 25
        }

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.handleSentiment = this.handleSentiment.bind(this);
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
    const geometry = new Three.TetrahedronGeometry(this.state.size, 2); // second param determins number of vertices
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

  handleSentiment(data) {
    this.setState({score: data})
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
    <div className="stage-container">
        <div
          style={{ width: '100%', height: '400px' }}
          ref={(mount) => { this.mount = mount }}
        />
        <Form score={this.handleSentiment} />

        {/* Displaying this for now to make sure my state is working alright*/}
        <p>Current sentiment: {this.state.sentiment}</p>

        {/* Displaying these scores for now so we can see the cool datas */}
        <p>Comparative: {this.state.score.comparative}</p>
        <p>Score: {this.state.score.score}</p>

        <div>
          <p>Positive Words:</p>
          { this.state.score.positive ?
              <ul>
              {
                  this.state.score.positive.map((word) => {
                      return <li key={word}>{word}</li>;
                  })
              }
              </ul>

          : null }
          </div>
        <div>
          <p>Negative Words:</p>
          { this.state.score.negative ?
              <ul>
              {
                  this.state.score.negative.map((word) => {
                      return <li key={word}>{word}</li>;
                  })
              }
              </ul>
          : null }
        </div>
    </div>
    );
  }
}
