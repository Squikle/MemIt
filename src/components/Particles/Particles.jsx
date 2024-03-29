import React, { Component, ReactNode } from "react";
import { tsParticles } from "@tsparticles/engine";
import { deepCompare } from "./Utils";

const defaultId = "tsparticles";

/**
 * @param {{id?: string,width?: string,height?: string,options?: import("@tsparticles/engine").ISourceOptions,params?: import("@tsparticles/engine").ISourceOptions,style?: import("react").CSSProperties,className?: string,canvasClassName?: string,container?: RefObject<Container>}}
 */
export default class Particles extends Component {
  static defaultProps = {
    width: "100%",
    height: "100%",
    options: {},
    style: {},
    url: undefined,
    id: defaultId,
  };

  constructor(props) {
    super(props);

    this.state = {
      init: false,
      library: undefined,
    };
  }

  destroy() {
    if (!this.state.library) {
      return;
    }

    this.state.library.destroy();

    this.setState({
      library: undefined,
    });
  }

  shouldComponentUpdate(nextProps) {
    const nextOptions = nextProps.options,
      currentOptions = this.props.options;

    return (
      nextProps.url !== this.props.url ||
      nextProps.id !== this.props.id ||
      nextProps.canvasClassName !== this.props.canvasClassName ||
      nextProps.className !== this.props.className ||
      nextProps.height !== this.props.height ||
      nextProps.width !== this.props.width ||
      !deepCompare(nextProps.style, this.props.style) ||
      nextProps.particlesLoaded !== this.props.particlesLoaded ||
      !deepCompare(nextOptions, currentOptions, (key) => key.startsWith("_"))
    );
  }

  componentDidUpdate() {
    this.refresh();
  }

  forceUpdate() {
    this.refresh().then(() => {
      super.forceUpdate();
    });
  }

  componentDidMount() {
    (async () => {
      this.setState(
        {
          init: true,
        },
        async () => {
          await this.loadParticles();
        }
      );
    })();
  }

  componentWillUnmount() {
    this.destroy();
  }

  render() {
    const { width, height, className, canvasClassName, id } = this.props;

    return (
      <div className={className} id={id}>
        <canvas
          className={canvasClassName}
          style={{
            ...this.props.style,
            width,
            height,
          }}
        />
      </div>
    );
  }

  async refresh() {
    this.destroy();

    await this.loadParticles();
  }

  async loadParticles() {
    if (!this.state.init) {
      return;
    }

    const id = this.props.id ?? Particles.defaultProps.id ?? defaultId,
      container = await tsParticles.load({
        url: this.props.url,
        id,
        options: this.props.options,
      });

    this.setState({
      library: container,
    });

    if (this.props.particlesLoaded) {
      await this.props.particlesLoaded(container);
    }
  }
}
